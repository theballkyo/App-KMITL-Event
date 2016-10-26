import React, { Component } from 'react'
import FormEvent from './FormEvent'
import LayoutDashboard from './LayoutDashboard'

class ShowEvent extends Component {

  constructor(props) {
    super()
    this.state = {name: '', cost: 0, image: '', location: '', description: '', start_date: '', end_date: '', email: '', phone: '', contact: ''}
    this.handleChange = this.handleChange.bind(this)
    this.fileHandleChange = this.fileHandleChange.bind(this)
    this.addEvent = this.addEvent.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    fetch('http://localhost:3001/api/v1/event/' + this.props.params.id).then(res => res.json()).then(res => {
      this.setState(res)
    })
  }

  handleChange(name) {
    return (e) => {
      let obj = {}
      obj[name] = e.target.value
      this.setState(obj)
    }
  }

  fileHandleChange(e) {
    let form = new FormData()
    form.append('image', e.target.files[0])
    fetch('http://localhost:3001/api/v1/image/upload?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MCwiaWF0IjoxNDc3NDEyNDg0LCJleHAiOjE0Nzc0MTYwODR9.mDpK580bBbNCMIWQrkfhqBqhhXVndfxFtHtqYFMrfvY', {
      method: 'POST',
      body: form
    }).then(res => {
      return res.json()      
    }).then(res => {
      this.setState({image: res.fileName})
    }).catch(e => {

    })

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
    return (
    <div className="">
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
            <input className="input" value={this.state.start_date} type="text" placeholder="startAt" onChange={this.handleChange('start_date')}/>
          </p>
          <p className="control is-expanded">
            <input className="input" value={this.state.end_date} type="text" placeholder="endAt" onChange={this.handleChange('end_date')}/>
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
        <div className="control-label"><label className="label"></label></div>
        <div className="control">
          <button className="button is-success" onClick={this.addEvent}>
            Create an event
          </button>
        </div>
      </div>
    </div>
    
  )
  }
}

export default ShowEvent