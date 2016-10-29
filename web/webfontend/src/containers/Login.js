import { connect } from 'react-redux'
import { loginRequest, loginForgot, loggedIn } from '../actions'
import { browserHistory } from 'react-router'
import LoginComponents from '../components/Login'
import request from 'request'

const mapStateToProps = (state, ownProps) => {
  return {
      loginFailed: state === 'LOGIN_FAILED',
      errors: state.login.errors,
      validateFailed: {},
      title: state.title.text,
      token: state.login.token
  }
}
const Login = connect(
    mapStateToProps,
    { loginRequest, loginForgot, loggedIn }
)(LoginComponents)

export default Login