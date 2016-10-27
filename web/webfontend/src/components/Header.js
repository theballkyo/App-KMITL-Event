import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import '../css/header.css'

const Header = ({title}) => (
  <nav className="nav has-shadow">
    <div className="nav-left">
      <Link className="nav-item is-brand" to='/dashboard'>
        KMITL Eventory <i className="fa fa-twitter"> </i>
      </Link>
    </div>

    <span className="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div className="nav-right nav-menu">
    </div>
  </nav>
)

Header.propTypes = {
    title: PropTypes.string
}

export default Header