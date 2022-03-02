const music = (state = { closed: false }, action) => {
    switch (action.type) {
      case 'music/open': {
        return { closed: false }
      }
      case 'music/close': {
        return { closed: true }
      }
      default:
        return state;
    }
}

export default music;