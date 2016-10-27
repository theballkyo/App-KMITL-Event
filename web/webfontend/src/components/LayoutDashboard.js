import React, { Component } from 'react'
import Header from './Header'
import Menu from './Menu'
import DocumentTitle from './DocumentTitle'
import { connect } from 'react-redux'
import { checkAuth } from '../actions'

class LayoutDashboard extends Component {
  
  constructor(props) {
    super()
  }

  componentWillMount() {
    this.props.checkAuth()
  }

  componentWillUpdate() {
    this.props.checkAuth()
  }

  render() {
    return (
      <div>
        <DocumentTitle title={this.props.route.title || 'Dashboard'} />
        <Header />
        <div className="container dash-body">
          <div className="columns">
            <div className="column is-3">
              <Menu user={this.props.user} />
            </div>
            <div className="column">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      loginFailed: state === 'LOGIN_FAILED',
      errors: state.login.errors,
      validateFailed: {},
      title: state.title.text,
      token: state.login.token,
      user: JSON.parse(state.login.user)
  }
}

LayoutDashboard = connect(
  mapStateToProps,
  { checkAuth }
)(LayoutDashboard)
export default LayoutDashboard