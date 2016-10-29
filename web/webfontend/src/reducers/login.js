import request from 'request'

const login = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
          return {
            email: '',
            password: ''
          }
        case 'LOGIN_SUCCESS':
          console.log(action)
          return {
            token: action.token,
            user: action.user
          }
        case 'LOGIN_FAILED':
          return {
            errors: [
              {
                msg: 'Username or password is wrong.'
              }
            ]
          }
        case 'LOGOUT':
          return {
            
          }
        case 'LOGIN_FORGOT':
          return {
            errors: [
              {
                msg: 'Forgot a password ? Please contact an administration.'
              }
            ]
          }
        default:
            return state
    }
}

export default login