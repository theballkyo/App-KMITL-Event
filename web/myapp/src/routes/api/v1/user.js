const express = require('express')
const router = express.Router({mergeParams: true})
const models = require('../../../models')
const debug = require('debug')('myapp:api:user');

module.exports = router