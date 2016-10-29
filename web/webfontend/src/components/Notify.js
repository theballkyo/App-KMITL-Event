import React, { PropTypes } from 'react';
import '../css/error.css'
const Notify = ({notify}) => (
    notify ?
    <div className="hero is-warning notificate">
      <span className="notify"> {notify} </span>     
    </div> : <div></div>
)

Notify.propTypes = {
    notify: PropTypes.string
}

export default Notify