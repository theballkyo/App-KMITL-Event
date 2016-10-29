var express = require('express');
var router = express.Router();
let auth = require('../middleware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/user/login')
});

router.get('/test', auth.guard('user.read'), (req, res) => {
  res.send('ok')
})

module.exports = router;
