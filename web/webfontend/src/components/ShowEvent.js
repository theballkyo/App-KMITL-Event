import React, { Component } from 'react'
import FormEvent from './FormEvent'
import { connect } from 'react-redux'
import { updateEvent, removeTag, addTag, onTagChange, setTag, setMap, clearError, clearNotify, clearTag } from '../actions'
import LayoutDashboard from './LayoutDashboard'
import Loading from './Loading'
import moment from 'moment'
import ErrorList from './ErrorList'
import Tag from './Tag'
import Map from './Map'
import Notify from './Notify'
import flatpickr from 'flatpickr'

class ShowEvent extends Component {

  constructor(props) {
    super()
    this.state = {name: '', cost: 0, image: '', location: '', description: ''
    , start_date: '', end_date: '', email: '', phone: '', contact: ''
    , isLoading: true, tags:'' }
    this.handleChange = this.handleChange.bind(this)
    this.fileHandleChange = this.fileHandleChange.bind(this)
    this.addEvent = this.addEvent.bind(this)
  }
 
  componentDidMount() {
    console.log(this.props)
    
    fetch('http://localhost:3001/api/v1/event/' + this.props.params.id).then(res => res.json()).then(res => {
      
      res.start_date = this.toDate(res.start_date)
      res.end_date = this.toDate(res.end_date)
      res.isLoading = false
      this.setState(res)
      console.log(res)
      this.props.setTag(res.tags.map(e => e.name))
      let pos = res.map.split(',')
      console.log(parseFloat(pos[0]), '--',parseFloat(pos[1]))  
      this.props.setMap(parseFloat(pos[0]), parseFloat(pos[1]))
      /*
      document.getElementById("start_date").flatpickr({
        "inline": true,
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
        "defaultDate": this.state.start_date
      });
      document.getElementById("end_date").flatpickr({
        "inline": true,
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
        "defaultDate": this.state.end_date
      });*/
    })
  }

  componentWillUnmount() {
    this.props.clearError()
    this.props.clearNotify()
    this.props.clearTag()
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
    console.log(typeof e.target.files[0])
  }

  toDate(date) {
    console.log(date)
    return moment(date).format("YYYY-MM-DD HH:mm")
    //return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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
          <label className="label">Event details</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" value={this.state.name} type="text" placeholder="Event name" onChange={this.handleChange('name')} />
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
            <input className="input" value={this.state.location} type="text" placeholder="Location" onChange={this.handleChange('location')} />
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
          <textarea className="textarea" value={this.state.description} placeholder="Event description" onChange={this.handleChange('description')}></textarea>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Time</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input id='start_date' className="input" value={this.state.start_date} type="text" placeholder="startAt" onChange={this.handleChange('start_date')}/>
          </p>
          <p className="control is-expanded">
            <input id='end_date' className="input" value={this.state.end_date} type="text" placeholder="endAt" onChange={this.handleChange('end_date')}/>
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Contact</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange('email')}/>
          </p>
          <p className="control is-expanded">
            <input className="input" type="text" value={this.state.phone} placeholder="Phone" onChange={this.handleChange('phone')}/>
          </p>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Contact other</label>
        </div>
        <div className="control">
          <textarea className="textarea" value={this.state.contact} placeholder="Contact..." onChange={this.handleChange('contact')}></textarea>
        </div>
      </div>
      <div className="control is-horizontal">
        <div className="control-label">
          <label className="label">Cost</label>
        </div>
        <div className="control is-grouped">
          <p className="control is-expanded">
            <input className="input" value={this.state.cost} type="text" placeholder="Cost" onChange={this.handleChange('cost')} />
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
          <button className="button is-success" onClick={e => this.props.updateEvent(this.props.params.id, this.state)}>
            Edit an event
          </button>
        </div>
      </div>
    </div>
    
  )
  }
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

ShowEvent = connect(
  mapStateToProps,
  { updateEvent, addTag, removeTag, onTagChange, setTag, setMap, clearError, clearNotify, clearTag }
)(ShowEvent)

export default ShowEvent