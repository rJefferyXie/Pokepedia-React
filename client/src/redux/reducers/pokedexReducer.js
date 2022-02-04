const pokedex = (state = { pokemonData: [], speciesData: [], region: "" }, action) => {
    switch (action.type) {
      case 'pokedex/set': {
        return {
            pokemonData: action.payload.pokemonData,
            speciesData: action.payload.speciesData,
            region: action.payload.region
        }
      }
      default:
        return state;
    }
}

export default pokedex;