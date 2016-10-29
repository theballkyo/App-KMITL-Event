const express = require('express')
const router = express.Router({mergeParams: true})
const models = require('../../../models')
const debug = require('debug')('myapp:api:event');
const auth = require('../../../middleware/auth')

const SAFE_ATTRIBUTES = ['id', 'name', 'description', 'location','start_date'
                         , 'end_date', 'contact', 'email', 'phone', 'cost', 'image', 'map']

/**
 * Get all events.
 * 
 * @return json -> all events
 */
router.get('/', auth.check(), async (req, res, next) => {
    try {
        const query = req.query
        let filter = {}

        filter.user_id = req.user.id

        // Search by name
        if (query.name)  {
            filter.name = {
                $like: query.name
            }
        }
        // Search by start date
        if (query.startdate) {
            filter.start_date = {
                $gte: query.start_date
            }
        }
        // Search by end date
        if (query.enddate) {
            filter.end_date = {
                $lte: query.end_date
            }
        }

        const events = await models.events.findAll({
            where: filter,
            attributes: SAFE_ATTRIBUTES
        })
        return res.json(events)
    } catch (e) {
        return res.status(500).json({msg: 'error'})
    }
})

/**
 * Get an event by event id
 * 
 * @return json -> an event
 */
router.get('/:event_id', async (req, res, next) => {
    try {
        const event = await models.events.findOne({
            where: {
                id: req.params.event_id
            },
            include: [{
                model: models.tags,
                as: 'tags'
            }]
        })
        return res.json(event)
    } catch(e) {
        return res.status(500).json({msg: 'error'})
    }
})

/**
 * Create an event.
 * 
 * @return json -> status of create success or fail
 */
router.post('/', auth.check(), async (req, res, next) => {
    try {
        let event = models.events.build({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            contact: req.body.contact,
            email: req.body.email,
            phone: req.body.phone,
            cost: req.body.cost,
            location: req.body.location,
            map: req.body.map,
            user_id: req.user.id
        })

        let user = await models.users.findById(1)
        let validate = await user.validate()
        // Check input validate
        if(validate) throw new Error('validate error')
        // Save an event
        await event.save()
        
        // Add tags
        if (req.body.tags) {
            // if addtags error.
            if (!await addTags(event, req.body.tags)) {
                return res.status(500).json({msg: 'Error can\'t add tags to an evnet. '})
            }
        }

        return res.json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({err: e.errors})
    }
})

/**
 * Update an event.
 * 
 * @return json -> status of update success or fail
 */
router.put('/:event_id', auth.check(), async (req, res, next) => {
    try {
        let event = await models.events.findOne({
            where: {
                id: req.params.event_id
            },
            include: [{
                model: models.tags,
                as: 'tags'
            }]
        })

        if (event === null) {
            return res.status(404).json({msg: 'event not found.'})
        }

        // Check permission user can edit event.
        if (req.user.id !== event.user_id && !req.user.is_admin()) {
            return res.json({status: 'error', code: 401})
        }

        // Check image is newer
        const image = req.body.image ? req.body.image : event.image

        event = await event.update({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            contact: req.body.contact,
            email: req.body.email,
            phone: req.body.phone,
            image,
            map: req.body.map,
            location: req.body.location,
            cost: req.body.cost
        })

        // Add tags
        if (req.body.tags) {
            // if addtags error.
            if (!await addTags(event, req.body.tags)) {
                return res.status(500).json({msg: 'Error can\'t add tags to an evnet. '})
            }
        }
        return res.json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({err: e.errors})
    }
})

/**
 * Delete an event
 * 
 * @return json -> status of delete success or fail
 */
router.delete('/:event_id', auth.check(),  async (req, res, next) => {
    try {
        let event = await models.events.findById(req.params.event_id)
        // Check is evnet not null
        if(event === null) return res.json({status: 'error', code: 404})
        // Check permission for delete an event
        if(event.user_id !== req.user.id && !req.user.is_admin()) return res.json({Error: "Not you event"})
        // Wait for delete process
        await event.destroy({hooks: false})

        return res.json({msg: 'success'})
    } catch (e) {
        debug('Error: ' + e)
        return res.status(500).json({msg: 'error'})
    }
})

router.get('*', (req, res, next) => {
    res.status(404).json({status: 'error', code: 404})
})

/**
 * Add tags to an event
 * @param event
 * @param tags
 * 
 * @returns true if successful
 */
async function addTags(event, tags) {
    // Process all tags
    let tags_model = []
    if(typeof tags === 'string') {
        tags = tags.split(',')
    }

    if (!Array.isArray(tags)) {
        return
    }

    for(let tag of tags) {
        let tag_model = await models.tags.findOrCreate({
            where: {
                name: tag
            }
        })
        tags_model.push(tag_model[0])
    }
    // Add tags to event
    try {
        await event.setTags(tags_model)
        return true
    } catch (e) {
        return false
    }
}
module.exports = router