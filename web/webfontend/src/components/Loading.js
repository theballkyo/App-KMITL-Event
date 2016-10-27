import React from 'react'

const Loading = ({type, msg}) => (
  <div className={"has-text-centered hero notificate " + type}>{msg || 'Loading...'}
    <a className={"button is-loading " + type}>Loading</a>
  </div>
)

export default Loading