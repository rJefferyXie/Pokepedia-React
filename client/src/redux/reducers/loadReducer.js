const load = (state = { loaded: false }, action) => {
    switch (action.type) {
      case 'loaded':
        return { loaded: action.payload.loaded };
      default:
        return state;
    }
}

export default load;