import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment'
import  * as actions  from '../actions'

const toDate = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
    //return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

let Event = ({event, deleteEventRequest, deleteEventClick, deleteEventConfirm, deleteEventCancel}) => (
    <div className="card is-fullwidth">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={"http://localhost:3001/" + event.image} alt="" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{event.name}</p>
          </div>
        </div>

        <div className="content">
          {event.description}
          <br />
          Date <small>{toDate(event.start_date)} - {toDate(event.end_date)}</small>
        </div>
      </div>
        {event.isClickDelete ? 
            <footer className="card-footer">
             <a onClick={e => deleteEventRequest(event.id)} id={event.id} className="button is-danger card-footer-item">Confirm to delete</a>
             <a onClick={e => deleteEventCancel(event.id)} id={event.id} className="button is-primary card-footer-item">Cancel</a>
            </footer>
            :
            <footer className="card-footer">
              <Link to={'/dashboard/event/' + event.id} className="button is-primary card-footer-item">Edit</Link>
              <a onClick={e => deleteEventClick(event.id)} id={event.id} className="button is-danger card-footer-item">Delete</a>
            </footer>
        }
    </div>
)

Event.propTypes = {
    event: PropTypes.object
}

export default Event