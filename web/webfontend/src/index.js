import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk';
import evnetoryApp from './reducers'
import App from './App';
import Login from './containers/Login'
import LayoutDashboard from './components/LayoutDashboard'
import EventCreate from './components/EventCreate'
import ShowEventList from './containers/ShowEventList'
import ShowEvent from './components/ShowEvent'
import Logout from './containers/Logout'
import './index.css';

/*
ReactDOM.render(
  <Login />,
  document.getElementById('root')
);
*/

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

let store = createStore(
  evnetoryApp,
  applyMiddleware(thunk)
  )

// store.dispatch = addPromiseSupportToDispatch(store)

if (localStorage.getItem('token')) {
  store.dispatch({
    type: 'LOGIN_SUCCESS',
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user')
  })
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login}>
      </Route>
      <Route title='Login' path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path='/dashboard' title='Dashboard' component={LayoutDashboard}>
        <IndexRoute title='Dashboard' title='Dashboard' component={ShowEventList} />
        <Route path="event/create" title='Create an event' component={EventCreate} />
        <Route path="event/:id" title='Show event' component={ShowEvent} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))