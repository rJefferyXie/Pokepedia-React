const build = (state = { legendary: false, mythic: false, types: false, duplicates: false }, action) => {
    switch (action.type) {
      case 'build/legendary':
        return { legendary: !state.legendary, mythic: state.mythic, types: state.types, duplicates: state.duplicates };
    case 'build/mythic':
        return { legendary: state.legendary, mythic: !state.mythic, types: state.types, duplicates: state.duplicates };
    case 'build/types':
        return { legendary: state.legendary, mythic: state.mythic, types: !state.types, duplicates: state.duplicates };
    case 'build/duplicates':
        return { legendary: state.legendary, mythic: state.mythic, types: state.types, duplicates: !state.duplicates };
      default:
        return state;
    }
}

export default build;