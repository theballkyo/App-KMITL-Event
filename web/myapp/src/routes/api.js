const express = require('express')
const router = express.Router()
const v1 = express.Router()

router.use('*', (req, res, next) => {
  res.append('Access-Control-Allow-Headers', 'authorization, cache-control')
  setTimeout(() => next(), 1)
  
})

v1.use('/event', require('./api/v1/event'))
v1.use('/user', require('./api/v1/user'))
v1.use('/image', require('./api/v1/image'))


router.use('/v1', v1)

router.use(function(req, res, next) {
  res.json({error: 'API not found.', code: 404})
});

module.exports = router
