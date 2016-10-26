import React, { PropTypes } from 'react';
import Event from './Event'

const EventList = ({events, isLoading, deleteEvent}) => {
    if (isLoading) {
        return (
            <div className="">Loading...</div>
        )
    }
    
    if (events) {
        return (
            <div className="columns is-multiline">
                {events.map(event => {
                    return (
                        <div key={event.id} className="column is-6">
                            <Event event={event} deleteEvent={deleteEvent} />
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
          <div className="notification has-text-centered">
            You don't have any event
          </div>
    )
}

EventList.propTypes = {
    events: PropTypes.array
}

export default EventList