import React from 'react'

const Tag = ({onRemove, data}) => (
  
  <span onClick={e => onRemove()} className="tag is-info is-small">
    {data}
    <button className="delete is-small"></button>
  </span>
)

export default Tag