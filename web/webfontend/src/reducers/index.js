import { combineReducers } from 'redux'
import login from './login'
import events from './events'
import title from './title'
import notify from './notify'
import errors from './errors'
import tag from './tag'
import map from './map'
const eventoryApp = combineReducers({
  login,
  events,
  title,
  notify,
  errors,
  tag,
  map
})

export default eventoryApp