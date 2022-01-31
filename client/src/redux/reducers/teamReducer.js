const team = (state = { team: [] }, action) => {
    switch (action.type) {
      case 'team/add': {
        return { team: [...state.team, action.payload.pokemon] }
      }
      case 'team/remove': {
        return { team: state.team.filter(pokemon => {
          return pokemon.pokemonData.name !== action.payload.pokemon
        })}
      }
      case 'team/clear': {
        return { team: [] }
      }
      default:
        return state;
    }
}

export default team;