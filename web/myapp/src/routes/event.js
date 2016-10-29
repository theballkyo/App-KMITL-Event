let express = require('express')
let router = express.Router()
let models = require('../models')

const debug = require('debug')('myapp:event_view');
const Promise = require("bluebird")

// require("babel-polyfill");
/*
router.use((req, res, next) => {
    if(!req.user)
        return res.redirect('/user/login')
    next()
})
*/
router.get('/', (req, res, next) => {
    models.events.findAll({
        where: {
            user_id: req.user.id
        }
    }).then((events_data) => {
        res.render('event/home', {events: events_data})
    })
})

router.get('/:event_id', async (req, res, next) => {
    let event = await models.events.findOne({
        where: {id: req.params.event_id },
    })

    res.json(event)
})

router.get('/create', (req, res, next) => {
    res.render('event/create')
})

module.exports = router;