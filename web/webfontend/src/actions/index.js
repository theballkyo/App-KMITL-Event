import request from 'request'
import { browserHistory } from 'react-router'

export const loginRequest = (email, password) => {
    return (dispatch) => {
      dispatch({
        type: 'LOGIN_REQUEST',
      })
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
              dispatch(loggedIn(data.token))
          } else {
              dispatch(loginFailed())
          }
      })
    }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
    browserHistory.push('/login')
  }
}

export const loggedIn  = (token) => {
  return (dispatch) => {
    browserHistory.push('/dashboard')
    localStorage.setItem("token", token);
    return {
      type: 'LOGGED_IN',
      token
    }
  }
}

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

const receiveEvents = (events) => {
  return {
    type: 'RECEIVE_EVENTS',
    events
  }
}

const loadingEvents = () => {
  return {
    type: 'LOADING_EVENTS'
  }
}

export const fetchEvents = () => {
  return (dispatch, state) => {
      dispatch(loadingEvents())
      state = state()
      let headers = new Headers({
        'Authorization': 'Bearer ' + state.login.token
      })
      fetch('http://localhost:3001/api/v1/event', { headers }).then(res => res.json()).then(res =>
        dispatch(receiveEvents(res))
      )
  }
}

export const addEvent = (params) => {
  return (dispatch, state) => {
    state = state()
    console.log(state)
    let headers = new Headers({
      'Authorization': 'Bearer ' + state.login.token,
    })
    console.log(params.image)
    let searchParams = []
    let image = ''
    let form = new FormData()
    form.append('image', params.image)
    form.append('test', 'test')
    console.log(form)
    fetch('http://localhost:3001/api/v1/image/upload', {
      method: 'POST',
      headers,
      body: form
    }).then(res => {
      return res.json()      
    }).then(res => {
      params.image = res.fileName
      searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&')
      headers.append('Content-Type', 'application/x-www-form-urlencoded')
      return fetch('http://localhost:3001/api/v1/event', {
        method: 'POST',
        headers,
        body: searchParams
      })
    }).then(res => {
      return res.json()      
    }).then(res => {
      console.log(res)
    }).catch(e => {

    })
    /*
    fetch('http://localhost:3001/api/v1/event', {
      method: 'POST',
      headers,
      body: searchParams
    }).then(res => {
      return res.json()      
    }).then(res => {
      console.log(res)
    }).catch(e => {
    
    })
    */
  }
}

export const deleteEvent = (e) => {
  return (dispatch, state) => {
    state = state()
      let headers = new Headers({
        'Authorization': 'Bearer ' + state.login.token
      })
    fetch('http://localhost:3001/api/v1/event/' + e.target.id, {
      headers,
      method: 'DELETE',
    }).then(res => res.json()).then(res => console.log(res))
  }
}