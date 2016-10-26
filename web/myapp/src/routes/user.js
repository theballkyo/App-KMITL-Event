var express = require('express')
var router = express.Router();
let models = require("../models")
let bcrypt = require('bcrypt-nodejs')
let jwt    = require('jsonwebtoken');
const debug = require('debug')('myapp:route:event');

router.get('/login', (req, res, next) => {
  res.render('user/login.pug');
})

/**
 * Login an user
 * 
 * @param req
 * @param res
 * @param next
 * 
 * @return Token or error
 */
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  models.users.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (user === null) {
      return res.status(403).json({status: 'email or password not valid.'})
    }
    bcrypt.compare(password, user.password, (err, res_) => {
      if (err || !res_) {
        return res.status(403).json({status: 'email or password not valid.'})
      }

      let data = {
        id: user.id,
        role: user.role,
      }

      let token = jwt.sign(data, req.app.get('jwtKey'), {
        expiresIn: '1h'
      });
      return res.json({token: token})
    })
  })

});

router.get('/register', (req, res, next) => {

});

router.post('/register', (req, res, next) => {

});

module.exports = router;