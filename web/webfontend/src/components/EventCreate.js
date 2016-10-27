import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addEvent, removeTag, addTag, onTagChange, setTag, setMap, clearError, clearNotify, clearTag } from '../actions'
import FormEvent from './FormEvent'
import LayoutDashboard from './LayoutDashboard'
import Tag from './Tag'
import Loading from './Loading'
import ErrorList from './ErrorList'
import Map from './Map'
import Notify from './Notify'
import flatpickr from 'flatpickr'

class EventCreate extends Component {

  constructor(props) {
    super()
    this.state = { name: '', cost: 0, image: '', location: '', description: ''
    , start_date: '', end_date: '', email: '', phone: '', contact: ''
    ,tag:'' }
    this.handleChange = this.handleChange.bind(this)
    this.fileHandleChange = this.fileHandleChange.bind(this)
    this.addEvent = this.addEvent.bind(this)
  }

  componentDidMount() {
    /*
    document.getElementById("start_date").flatpickr({
      "inline": true,
      "enableTime": true,
      minDate: "today",
    });
    document.getElementById("end_date").flatpickr({
      "inline": true,
      "enableTime": true,
      minDate: "today",
    });*/
  }

  handleChange(name) {
    return (e) => {
      let obj = {}
      obj[name] = e.target.value
      this.setState(obj)
    }
  }

  fileHandleChange(e) {
    this.setState({image: e.target.files[0]})
  }

  componentWillUnmount() {
    this.props.clearError()
    this.props.clearNotify()
    this.props.clearTag()
  }

  addEvent(e) {
    
    let form = new FormData()
    form.append('name', this.state.name)
    form.append('image', this.state.image)
    form.append('location', this.state.location)
    form.append('description', this.state.description)
    form.append('start_date', this.state.startAt)
    form.append('end_date', this.state.endAt)
    form.append('email', this.state.email)
    form.append('phone', this.state.phone)
    form.append('contact', this.state.contact)
    form.append('cost', 0)
    form.append('tags', '')

    const searchParams = Object.keys(this.state).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
    }).join('&');

    fetch('http://localhost:3001/api/v1/event?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MCwiaWF0IjoxNDc3NDEyNDg0LCJleHAiOjE0Nzc0MTYwODR9.mDpK580bBbNCMIWQrkfhqBqhhXVndfxFtHtqYFMrfvY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    }).then(res => {
      return res.json()      
    }).then(res => {
      console.log(res)
    }).catch(e => {

    })
  }

  render() {
    if (this.props.isProcessing) {
        return (
            <Loading type="is-warning" msg={this.props.msg} />
        )
    }
    return (
    <div className="">
      <Notify notify={this.props.notify} />
      <ErrorList errors={this.props.errors}/>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Event name</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Event name" onChange={this.handleChange('name')} />
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Poster</label>
        </div>
        <div className="control is-grouped">
          <p className="control">
            <input className="input" type="file" placeholder="Poster" onChange={this.fileHandleChange} />
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Location</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Location" onChange={this.handleChange('location')} />
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Maps</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <Map
              onClick={(e) => this.props.setMap(e.latLng.lat(), e.latLng.lng())}
              markers={this.props.markers}
            />  
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Description</label>
        </div>
        <div className="control">
          <textarea className="textarea" placeholder="Event description" onChange={this.handleChange('description')}></textarea>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Time</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input id='start_date' className="input" type="text" placeholder="Start at: 2016-01-01 16:50" onChange={this.handleChange('start_date')}/>
          </p>
          <p className="control is-expanded">
            <input id='start_date' className="input" type="text" placeholder="End at: 2016-01-01 16:50" onChange={this.handleChange('end_date')}/>
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Contact</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Email" onChange={this.handleChange('email')}/>
          </p>
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Phone" onChange={this.handleChange('phone')}/>
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Contact other</label>
        </div>
        <div className="control">
          <textarea className="textarea" placeholder="Contact..." onChange={this.handleChange('contact')}></textarea>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Cost</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Cost" onChange={this.handleChange('cost')} />
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Tags</label>
        </div>
        <div className="control is-grouped">
          <p className="control">
            {this.props.tags.map(t => <Tag data={t} onRemove={() => {this.props.removeTag(t)}} />)}
            <input className="input tag-input" value={this.props.tag} type="text" placeholder="Add tag" onChange={e => this.props.onTagChange(e.target.value)}  />
            <button className="button is-success" onClick={e => this.props.addTag() }>
              Add tag
            </button>
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label"><label className="label"></label></div>
        <div className="control">
          <button className="button is-success" onClick={e => this.props.addEvent(this.state)}>
            Create an event
          </button>
        </div>
      </div>
    </div>
    
  )
  }
}

EventCreate.propTypes = {
  addEvent: PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.login.token,
    isProcessing: state.events.isProcessing,
    msg: state.events.msg,
    errors: state.errors.errors,
    tags: state.tag.tags,
    tag: state.tag.tag,
    markers: state.map.markers,
    notify: state.notify.msg
  }
}

EventCreate = connect(
  mapStateToProps,
  { addEvent, addTag, removeTag, onTagChange, setTag, setMap, clearError, clearNotify, clearTag }
)(EventCreate)

export default EventCreate