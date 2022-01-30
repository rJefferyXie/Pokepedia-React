const setPokedex = ({ pokemonData, speciesData }) => {
    return {
        type: "pokedex/set", 
        payload: { pokemonData, speciesData }
    }
}

export default {
    setPokedex
}