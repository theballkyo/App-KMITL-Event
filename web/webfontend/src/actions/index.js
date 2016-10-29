import request from 'request'
import { browserHistory } from 'react-router'


export const loginFailed = () => {
    return {
        type: 'LOGIN_FAILED'
    }
}

export const loginForgot = () => {
  return {
        type: 'LOGIN_FORGOT'
    }
}

export const findEventById = (id) => {
  return {
    type: 'FIND_BYID',
    id
  }
}


export const loggedIn  = (token, user) => {
  return (dispatch) => {
    user = JSON.stringify(user)
    localStorage.setItem("token", token);
    localStorage.setItem("user", user)
    console.log('LoggedIn')
    dispatch({
      type: 'LOGIN_SUCCESS',
      token,
      user
    })
    browserHistory.push('/dashboard')
  }
}


const receiveEvents = (events) => {
  return {
    type: 'RECEIVE_EVENTS',
    events
  }
}

const loadingEvents = () => {
  return {
    type: 'EVENT_PROCESSING',
    msg: 'Loading an events.'
  }
}

const creatingEvent = () => {
  return {
    type: 'EVENT_PROCESSING',
    msg: 'Creating an event.'
  }
}

const updatingEvent = () => {
  return {
    type: 'EVENT_PROCESSING',
    msg: 'Updating an event.'
  }
}

const setNotify = (text) => {
  return {
    type: 'SET_NOTIFY',
    text
  }
}

export const clearNotify = () => {
  return {
    type: 'CLEAR_NOTIFY'
  }
}
const setErrors = (errors) => {
  return {
    type: 'SET_ERRORS',
    errors
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export const addTag = () => {
  return {
    type: 'ADD_TAG',
  }
}

export const removeTag = (tag) => {
    return {
      type: 'REMOVE_TAG',
      tag
    }
}

export const onTagChange = (tag) => {
  return {
    type: 'TAG_CHANGE',
    tag
  }
}

export const setTag = (tags) => {
  return {
    type: "SET_TAG",
    tags
  }
}

export const clearTag = () => {
  return {
    type: 'CLEAR_TAG'
  }
}

export const setMap = (lat, lng) => {
  return {
    type: 'SET_MAP',
    lat,
    lng
  }
}

export const forceLogout = () => {

}

export const checkAuth = () => {
  return (dispatch, state) => {
    state = state()
    if (!state.login.token) {
      dispatch(logout())
    }
  }
}

export const loginRequest = (email, password) => {
    return (dispatch) => {
      request.post({url: 'http://localhost:3001/user/login', form:
      {
        email: email,
        password: password
      }}, (err, res, body) => {
          if (err) {
              dispatch(loginFailed())
          }
          const data = JSON.parse(body)
          if (data.token !== undefined) {
              dispatch(loggedIn(data.token, data.user))
          } else {
              dispatch(loginFailed())
          }
      })
    }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
    browserHistory.push('/login')
  }
}

export const deleteEventClick = (id) => {
  return {
    type: 'DELETE_EVENT_CLICK',
    id: parseInt(id)
  }
}

export const deleteEventConfirm = (id) => {
  return {
    type: 'DELETE_EVENT_CONFIRM',
    id: parseInt(id)
  }
}

export const deleteEventCancel = (id) => {
  return {
    type: 'DELETE_EVENT_CANCEL',
    id: parseInt(id)
  }
}

export const deleteEventById = (id) => {
  return {
    type: 'DELETE_EVENT_BY_ID',
    id
  }
}

export const eventProcessed = () => {
  return {
    type: 'EVENT_PROCESSED'
  }
}

export const deletingEvent = () => {
  return {
    type: 'EVENT_PROCESSING',
    msg: 'Deleting an event. Please wait...'
  }
}


export const fetchEvents = () => {
  return (dispatch, state) => {
      dispatch(loadingEvents())
      state = state()
      let headers = new Headers({
        'Authorization': 'Bearer ' + state.login.token,
        'Cache-Control': 'no-cache'
      })
      fetch('http://localhost:3001/api/v1/event', { headers })
      .then(res => res.json())
      .then(res => {
        if (res.status === 403) {
          return dispatch(logout())
        }
        dispatch(receiveEvents(res))
        dispatch(eventProcessed())
      })
  }
}

export const addEvent = (params) => {
  return (dispatch, state) => {
    dispatch(clearError())
    dispatch(clearNotify())
    dispatch(creatingEvent())
    state = state()
    let headers = new Headers({
      'Authorization': 'Bearer ' + state.login.token,
    })
    let searchParams = []
    let form = new FormData()
    form.append('image', params.image)
    fetch('http://localhost:3001/api/v1/image/upload', {
      method: 'POST',
      headers,
      body: form
    }).then(res => {
      return res.json()
    }).then(res => {
      params.map = state.map.markers[0].position.lat + ',' + state.map.markers[0].position.lng
      searchParams = Object.keys(params).map((key) => {
        if (key === 'image' || key === 'tags') {
          return encodeURIComponent(key) + '=' + encodeURIComponent(res.fileName)
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&')
      searchParams += '&tags=' + state.tag.tags.join(',')
      headers.append('Content-Type', 'application/x-www-form-urlencoded')
      return fetch('http://localhost:3001/api/v1/event', {
        method: 'POST',
        headers,
        body: searchParams
      })
    }).then(res => {
      return res.json()      
    }).then(res => {
      if (res.err) {
        console.log(res.err)
        dispatch(setNotify('Error while adding an event.'))
        dispatch(setErrors(res.err))
      } else if (res.msg === 'success') {
        dispatch(setNotify('Added an event.'))
      }
      dispatch(eventProcessed())
    }).catch(e => {
      dispatch(eventProcessed())
    })
  }
}

export const updateEvent = (id, params) => {
  return (dispatch, state) => {
    dispatch(clearError())
    dispatch(clearNotify())
    dispatch(creatingEvent())
    state = state()
    console.log(state.map.markers[0].position)
    let headers = new Headers({
      'Authorization': 'Bearer ' + state.login.token,
    })
    let searchParams = []

    // Check image
    if (typeof params.image === "object") {
      let form = new FormData()
      form.append('image', params.image)
      fetch('http://localhost:3001/api/v1/image/upload', {
        method: 'POST',
        headers,
        body: form
      }).then(res => {
      return res.json()
      }).then(res => {
        searchParams = Object.keys(params).map((key) => {
          if (key === 'image') {
            return encodeURIComponent(key) + '=' + encodeURIComponent(res.fileName)
          }
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&')
        headers.append('Content-Type', 'application/x-www-form-urlencoded')
        return fetch('http://localhost:3001/api/v1/event/' + id, {
          method: 'PUT',
          headers,
          body: searchParams
        })
      }).then(res => {
        return res.json()      
      }).then(res => {
        if (res.err) {
          console.log(res.err)
          dispatch(setNotify('Error while adding an event.'))
          dispatch(setErrors(res.err))
        } else if (res.msg === 'success') {
          dispatch(setNotify('Updated an event.'))
        }
        dispatch(eventProcessed())
      }).catch(e => {
        dispatch(eventProcessed())
      })
    } else {
      params.map = state.map.markers[0].position.lat + ',' + state.map.markers[0].position.lng
      searchParams = Object.keys(params).map((key) => {
        if (key === 'image' || key === 'tags') {
          return ''
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&')
      searchParams += '&tags=' + state.tag.tags.join(',')
      headers.append('Content-Type', 'application/x-www-form-urlencoded')
      fetch('http://localhost:3001/api/v1/event/' + id, {
        method: 'PUT',
        headers,
        body: searchParams
      }).then(res => {
        return res.json()      
      }).then(res => {
        if (res.err) {
          console.log(res.err)
          dispatch(setNotify('Error while adding an event.'))
          dispatch(setErrors(res.err))
        } else if (res.msg === 'success') {
          dispatch(setNotify('Updated an event.'))
        }
        dispatch(eventProcessed())
      }).catch(e => {
        dispatch(eventProcessed())
      })
    }
  }
}

export const deleteEventRequest = (id) => {
  return (dispatch, state) => {
    dispatch(clearError())
    dispatch(clearNotify())
    dispatch(deleteEventConfirm())
    dispatch(deletingEvent())
    state = state()
    let headers = new Headers({
      'Authorization': 'Bearer ' + state.login.token
    })
    fetch('http://localhost:3001/api/v1/event/' + id, {
      headers,
      method: 'DELETE',
    }).then(res => res.json()).then(res => {
      dispatch(deleteEventById(parseInt(id)))
      console.log(res)
      dispatch(setNotify('Deleted an event.'))
      dispatch(eventProcessed())
    })
  }
}
