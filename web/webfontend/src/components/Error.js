import React, { PropTypes } from 'react';
import '../css/error.css'
const Error = ({error}) => (
    <span className="error"> {error} </span>
)

Error.propTypes = {
    error: PropTypes.string
}

export default Error