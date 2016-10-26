import React, { PropTypes } from 'react';
import { Link } from 'react-router'

const Menu = () => (
  <aside className="menu">
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