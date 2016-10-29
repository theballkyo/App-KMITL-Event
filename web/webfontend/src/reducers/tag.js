const tag = (state = {tags: []}, action) => {
  switch (action.type) {
    case "SET_TAG":
      return {
        tags: [
          ...action.tags
        ]
      }
    case "ADD_TAG":
    console.log(state.tags.indexOf(state.tag))
      if (state.tags.indexOf(state.tag) >= 0) return state
      return {
        tags: [
          ...state.tags,
          state.tag
        ],
        tag: '',
      }
    case "CLEAR_TAG":
      return {
        tags: []
      }
    case "REMOVE_TAG":
      return {
        tags: state.tags.filter(t => t !== action.tag)
      }
    case "TAG_CHANGE":
      return {
        ...state,
        tag: action.tag,
      }
    default:
      return state
  }
}

export default tag