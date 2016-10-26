import React from 'react'
import Header from './Header'
import Menu from './Menu'

const LayoutDashboard = ({Body, children}) => (
  <div>
    <Header />
    <div className="container dash-body">
      <div className="columns">
        <div className="column is-3">
          <Menu />
        </div>
        <div className="column">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default LayoutDashboard