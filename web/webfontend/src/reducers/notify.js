const notify = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFY':
      return {
        msg: action.text
      }
    case 'CLEAR_NOTIFY':
      return {

      }
    default:
      return state
  }
}

export default notify