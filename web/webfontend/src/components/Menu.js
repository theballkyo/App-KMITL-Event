import React, { PropTypes } from 'react';
import { Link } from 'react-router'

const Menu = ({user}) => (
  <aside className="menu">
    {user ? <p className="menu-label">
      Welcome, {user.first_name} {user.last_name}
    </p> : ''}
    <p className="menu-label">
      General
    </p>
    <ul className="menu-list">
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='/dashboard/event/create'>Create an event</Link></li>
      <li><Link to='/logout'>Logout</Link></li>
    </ul>
  </aside>
)

Menu.propTypes = {
}

export default Menu