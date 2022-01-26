const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonPokedexSchema = new Schema({
    pokedexNumber: {
        type: Number,
        required: true
    },
    pokemonData: {
        type: [], 
        required: true 
    }
});

module.exports = PokemonPokedex = mongoose.model("pokemonPokedex", PokemonPokedexSchema);