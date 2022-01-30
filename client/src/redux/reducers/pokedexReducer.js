const pokedex = (state = { pokemonData: [], speciesData: [] }, action) => {
    switch (action.type) {
      case 'pokedex/set': {
        console.log("Pokedex set: ", action.payload)
        return {
            pokemonData: action.payload.pokemonData,
            speciesData: action.payload.speciesData
        }
      }
      default:
        console.log("Pokedex retrieved: ", state)
        return state;
    }
}

export default pokedex;