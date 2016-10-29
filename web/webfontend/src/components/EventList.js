import React, { PropTypes } from 'react';
import Event from './Event'
import Loading from './Loading'

const EventList = ({events, isProcessing, deleteEventRequest, deleteEventClick, 
    deleteEventConfirm, deleteEventCancel, msg}) => {
    if (isProcessing) {
        return (
            <Loading type="is-warning" msg={msg} />
        )
    }
    console.log(events)
    if (events) {
        return (
            <div className="columns is-multiline">
                {events.map(event => {
                    return (
                        <div key={event.id} className="column is-6">
                            <Event 
                            event={event}
                            deleteEventRequest={deleteEventRequest}
                            deleteEventClick={deleteEventClick}
                            deleteEventConfirm={deleteEventConfirm}
                            deleteEventCancel={deleteEventCancel}
                             />
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