import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginRequest, loginFailed, receiveEvents, fetchEvents, deleteEventRequest, 
    deleteEventClick, deleteEventConfirm, deleteEventCancel,
clearError, clearNotify, clearTag } from '../actions'
import { browserHistory } from 'react-router'
import EventList from '../components/EventList'
import request from 'request'
import Notify from '../components/Notify'
class ShowEventList extends Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  componentWillUnmount() {
    this.props.clearError()
    this.props.clearNotify()
    this.props.clearTag()
  }

  render() {
    return (
        <div>
            <Notify notify={this.props.notify} />
            <EventList {...this.props} />
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      events: state.events.events,
      isProcessing: state.events.isProcessing,
      msg: state.events.msg,
        notify: state.notify.msg
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
    { fetchEvents, deleteEventRequest, deleteEventClick, deleteEventConfirm, deleteEventCancel,
        clearError, clearNotify, clearTag }
)(ShowEventList)

export default ShowEventList