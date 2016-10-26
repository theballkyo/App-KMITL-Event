import React, { PropTypes } from 'react';
import { Link } from 'react-router'

const Event = ({event, deleteEvent}) => (
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
          <small>{event.start_date}</small>
        </div>
      </div>
      <footer className="card-footer">
        <Link to={'/dashboard/event/' + event.id} className="card-footer-item">Edit</Link>
        <a onClick={deleteEvent} id={event.id} className="card-footer-item">Delete</a>
      </footer>
    </div>
)

Event.propTypes = {
    event: PropTypes.object
}

export default Event