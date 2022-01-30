const team = (state = { team: [] }, action) => {
    switch (action.type) {
      case 'team/add': {
        console.log("Pokemon added to team.")
        return { team: [...state.team, action.payload.pokemon] }
      }
      case 'team/remove': {
        console.log("Pokemon removed from team.")
        return { team : state.team.filter((_, filterindex) => {
          return filterindex !== action.payload.pokemon
        })}
      }
      default:
        return state;
    }
}

export default team;