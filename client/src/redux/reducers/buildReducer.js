const build = (state = { legendary: false, mythic: false, types: false }, action) => {
    switch (action.type) {
      case 'build/legendary':
        return { legendary: !state.legendary, mythic: state.mythic, types: state.types };
    case 'build/mythic':
        return { legendary: state.legendary, mythic: !state.mythic, types: state.types };
    // case 'build/types':
    //     return { legendary: state.legendary, mythic: state.mythic, types: !state.types };
      default:
        return state;
    }
}

export default build;