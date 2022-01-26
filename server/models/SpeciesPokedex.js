const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeciesPokedexSchema = new Schema({
    pokedexNumber: {
        type: Number,
        required: true
    },
    speciesData: {
        type: [], 
        required: true
    }
});

module.exports = SpeciesPokedex = mongoose.model("speciesPokedex", SpeciesPokedexSchema);