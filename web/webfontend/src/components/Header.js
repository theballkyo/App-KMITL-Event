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
      <a className="nav-item" href="#">
        Home
      </a>
      <a className="nav-item" href="#">
        Documentation
      </a>
      <a className="nav-item" href="#">
        Blog
      </a>

      <span className="nav-item">
        <a className="button" >
          <span className="icon">
            <i className="fa fa-twitter"></i>
          </span>
          <span>Tweet</span>
        </a>
        <a className="button is-primary" href="#">
          <span className="icon">
            <i className="fa fa-download"></i>
          </span>
          <span>Download</span>
        </a>
      </span>
    </div>
  </nav>
)

Header.propTypes = {
    title: PropTypes.string
}

export default Header