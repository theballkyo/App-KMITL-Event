const title = (state = {}, action) => {
  switch (action.type) {
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