const team = (state = { team: [] }, action) => {
    switch (action.type) {
      case 'team/add': {
        return { team: [...state.team, action.payload.pokemon] }
      }
      case 'team/remove': {
        return { team : state.team.filter((_, filterindex) => {
          return filterindex !== action.payload.pokemon
        })}
      }
      default:
        return state;
    }
}

export default team;