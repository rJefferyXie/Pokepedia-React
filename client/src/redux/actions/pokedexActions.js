const setPokedex = ({ pokemonData, speciesData, region }) => {
    return {
        type: "pokedex/set", 
        payload: { pokemonData, speciesData, region }
    }
}

export default {
    setPokedex
}