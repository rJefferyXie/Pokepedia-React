const pokedex = (state = { pokemonData: [], speciesData: [] }, action) => {
    switch (action.type) {
      case 'pokedex/set': {
        return {
            pokemonData: action.payload.pokemonData,
            speciesData: action.payload.speciesData
        }
      }
      default:
        return state;
    }
}

export default pokedex;