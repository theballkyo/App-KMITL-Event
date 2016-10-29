const errors = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return {
        errors: action.errors
      }

    case 'CLEAR_ERROR':
      return {
      }

    default:
      return state
  }
}

export default errors