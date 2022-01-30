const load = (state = { loaded: false }, action) => {
    switch (action.type) {
      case 'loaded':
        return { loaded: true };
      default:
        return state;
    }
}

export default load;