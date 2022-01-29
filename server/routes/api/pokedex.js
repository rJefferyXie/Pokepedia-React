const express = require("express");
const router = express.Router();

const PokemonPokedex = require("../../models/PokemonPokedex");
const SpeciesPokedex = require("../../models/SpeciesPokedex");

const ObjectId = require("mongodb").ObjectId;

// @route GET api/pokedex/pokemon/:id
// @desc Get the pokemon pokedex for id
// @access Public
router.get("/pokemon/:id", (req, res) => {
    PokemonPokedex.find({"pokedexNumber": req.params.id}, async (err, posts) => {
        if (err) console.log(err);
        else {
          res.json(posts);
          console.log(`Pokemon Pokedex accessed for ${req.params.id}.`);
        }
    });
});

// @route GET api/pokedex/species/:id
// @desc Get the species pokedex for id
// @access Public
router.get("/species/:id", (req, res) => {
    SpeciesPokedex.find({"pokedexNumber": req.params.id}, async (err, posts) => {
      if (err) console.log(err);
      else { 
        res.json(posts);
        console.log(`Species Pokedex accessed for ${req.params.id}.`);
      }
  });
});

// @route POST api/pokemon/:id
// @desc Create the pokemon pokedex for id
// @access Public
router.post("/pokemon/:id", (req, res) => {
  let newPokemonPokedex = new PokemonPokedex({
    pokedexNumber: req.body.pokedexNumber,
    pokemonData: req.body.pokemonData,
  });
  newPokemonPokedex.save((err, res) => {
    if (err) { throw err }
    console.log("Pokemon Pokedex filled for version " + req.body.pokedexNumber);
  });
});

// @route POST api/species/:id
// @desc Create the species pokedex for id
// @access Public
router.post("/species/:id", (req, res) => {
  let newSpeciesPokedex = new SpeciesPokedex({
    pokedexNumber: req.body.pokedexNumber,
    speciesData: req.body.speciesData,
  });
  newSpeciesPokedex.save((err, res) => {
    if (err) { throw err }
    console.log("Species Pokedex filled for version " + req.body.pokedexNumber);
  });
});

module.exports = router;