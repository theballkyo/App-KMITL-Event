import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginRequest, loginFailed, receiveEvents, fetchEvents, deleteEvent } from '../actions'
import { browserHistory } from 'react-router'
import EventList from '../components/EventList'
import request from 'request'

class ShowEventList extends Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    return <EventList {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      events: state.events.events,
      isLoading: state.events.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvents,
        onClick: (event, email, password) => {
            event.preventDefault()
            dispatch(loginRequest(email, password))
            request.post({url: 'http://localhost:3001/user/login', form:
            {
              email: email,
              password: password
            }}, (err, res, body) => {
                if (err) {
                    dispatch(loginFailed())
                }
                const data = JSON.parse(body)
                if (data.token !== undefined) {
                    browserHistory.push('/')
                } else {
                    dispatch(loginFailed())
                }
            })
        },
        onDeleteEvent: (event) => {
            alert(event.target.id)
        }
    }
}

ShowEventList = connect(
    mapStateToProps,
    { fetchEvents, deleteEvent }
)(ShowEventList)

export default ShowEventList