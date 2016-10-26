import React, { PropTypes } from 'react';
import Error from './Error'
import '../css/error.css'
const ErrorList = ({errors}) => {
    if (errors) {
        return (
            <div className="hero is-danger errors">
                {errors.map(err => {
                    return <Error key={err.msg} error={err.msg } />
                })}
            </div>
        )
    }
    return (
        <div></div>
    )
}

ErrorList.propTypes = {
    errors: PropTypes.array
}

export default ErrorList