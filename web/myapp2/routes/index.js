var express = require('express');
var router = express.Router();
import { models } from '../models/index.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
    console.log(users)
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
