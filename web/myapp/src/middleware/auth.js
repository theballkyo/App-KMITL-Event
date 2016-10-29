let jwt = require('jsonwebtoken');
let models = require('../models')
const debug = require('debug')('myapp:middlewar:auth')

const authenticate = async (token, secretKey) => {
  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      let decoded = jwt.verify(token, secretKey)
      let user = await models.users.findById(decoded.id)
      return {error: false, msg: decoded, user: user}
    } catch (e) {
      return {error: true, status: 403, msg: e.name}
    }
  } else {
    return {error:true, status: 403, msg: 'No token provided.'}
  }

}

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return req.params.token || req.query.token || req.body.token
}

const getSecretKey = (req) => {
  return req.app.get('jwtKey')
}

const check = () => {
  return async (req, res, next) => {
    
    let auth_ = await authenticate(getToken(req), getSecretKey(req))
    if (auth_.error) {
      return res.status(auth_.status).json(auth_)
    }
    req.user = auth_.user
    return next()
  }
}

const guard = (permission) => {
  return async (req, res, next) => {
    let auth_ = await authenticate(getToken(req), getSecretKey(req))
    if (auth_.error) {
      return res.status(auth_.status).json(auth_)
    }
    req.user = auth_.user
    if (!req.user) {
      return res.status(403).json({status: 'User failed.'})
    }

    if (!req.user.permission) {
      return res.status(403).json({status: 'No permission'})
    }

    if (!req.user.permission[permission]) {
      return res.status(403).json({status: 'No permission'})
    }

    return next()
  }
}

module.exports.check = check

module.exports.guard = guard