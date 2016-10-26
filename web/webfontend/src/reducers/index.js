import { combineReducers } from 'redux'
import login from './login'
import events from './events'
import title from './title'

const eventoryApp = combineReducers({
  login,
  events,
  title
})

export default eventoryApp