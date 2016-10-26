import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import ErrorList from './ErrorList'
import DocumentTitle from './DocumentTitle'
import request from 'request'
import '../bulma.css';
import '../css/font-awesome.css'
import '../css/login.css'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: 'test@localhost',
      password: '1234'
    }
    this.emailChange = this.emailChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.loggedIn(this.props.token)
    }
  }

  emailChange(e) {
    this.setState({email: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <DocumentTitle title="Login">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="content column is-half is-offset-one-quarter">
                <h2>Login to system</h2>
                <ErrorList errors={this.props.errors} />
                <p className="control has-icon">
                  <input className="input" value={this.state.email} type="email" name="email" placeholder="Email" onChange={this.emailChange} />
                  <i className="fa fa-envelope"></i>
                </p>
                <p className="control has-icon">
                  <input className="input" value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.passwordChange} />
                  <i className="fa fa-lock"></i>
                </p>
                <p className="control">
                  <button onClick={e => { 
                      this.props.loginRequest(this.state.email, this.state.password)
                    }} 
                    className="button is-success">
                      Login
                  </button>
                  <a onClick={this.props.loginForgot}><span className="is-pulled-right">Forgot your password ?</span></a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </DocumentTitle>
    )
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loginForgot: PropTypes.func.isRequired
}
export default Login;
