import React from 'react'
import ShowEventList from '../containers/ShowEventList'
import LayoutDashboard from './LayoutDashboard'
import DocumentTitle from './DocumentTitle'
const Dashboard = () => {
  return (
    <DocumentTitle title="Dashboard">
      <ShowEventList />
    </DocumentTitle>
  )
}

export default Dashboard