const title = (state = {}, action) => {
  switch (state.type) {
    case 'CHANGE_TITLE':
      return {
        text: action.text
      }
    default:
      return {
        text: 'Test'
      }
  }
}

export default title