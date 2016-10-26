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

const events = (state = [], action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      return {
        events: [
          ...state
        ],
        isLoading: state.isLoading
      }
    case 'LOADING_EVENTS':
      return {
        events: [],
        isLoading: true
        
      }
    case 'RECEIVE_EVENTS':
      return {
        events: action.events,
        isLoading: false
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