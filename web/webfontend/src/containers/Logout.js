import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
Logout = connect(
    mapStateToProps,
    { logout }
)(Logout)

export default Logout