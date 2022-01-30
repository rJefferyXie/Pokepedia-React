const load = (state = { loaded: false }, action) => {
    switch (action.type) {
      case 'loaded/set':
        return { loaded: true };
      default:
        return state.loaded;
    }
}

export default load;