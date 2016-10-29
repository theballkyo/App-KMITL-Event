const event = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      return {
        id: action.id,
        name: action.name
      }

    default:
      return state
  }
}

const events = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      return {
        events: [
          ...state.events
        ],
        isProcessing: state.isProcessing
      }

    case 'LOADING_EVENTS':
      return {
        events: [],
        isProcessing: true,
        msg: ''

      }

    case 'RECEIVE_EVENTS':
      return {
        ...state,
        events: action.events,
        isProcessing: false
      }

    case 'EVENT_PROCESSING':
      return {
        ...state,
        isProcessing: true,
        msg: action.msg
      }

    case 'EVENT_PROCESSED':
      return {
        ...state,
        isProcessing: false
      }

    case 'DELETE_EVENT_BY_ID':
      return {
        ...state,
        events: state.events.filter(e => {
          console.log(e.id, ':', action.id)
          return e.id !== action.id
        })
      }

    case 'DELETE_EVENT_CLICK':
      return {
        ...state,
        events: state.events.map(e => {
          if (e.id === action.id) {
            e.isClickDelete = true
          }
          return e
        })
      }

    case 'DELETE_EVENT_CONFIRM':
      return {
        ...state,
        events: state.events.map(e => {
          if (e.id === action.id) {
            e.isClickDelete = false
          }
          return e
        })
      }

    case 'DELETE_EVENT_CANCEL':
      return {
        ...state,
        events: state.events.map(e => {
          if (e.id === action.id) {
            e.isClickDelete = false
          }
          return e
        })
      }

    case 'FIND_BYID':
      return {
        event: state.events.filter(event => event.id === action.id)[0]
      }
    default:
      return state
  }
}

export default events