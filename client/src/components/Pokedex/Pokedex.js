import "./Pokedex.css";

import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PokemonCard from "../PokemonCard/PokemonCard";

const NodeCache = require( "node-cache" );
const pokemonCache = new NodeCache();

const Pokedex = () => {
  const location = useLocation();
  const {region_number, region_name} = location.state;

  const [pokedex, setPokedex] = useState([]);
  const [speciesArray, setSpeciesArray] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);

  useEffect(() => {
    retrieve_data(region_number, region_name);
  }, []);

  const retrieve_data = (region_number, region_name) => {
    axios.get(`https://pokeapi.co/api/v2/pokedex/${region_number}/`)
    .then(res => generate_pokedex(res.data))
  }

  const generate_pokedex = async (data) => {
    // const localPokemonData = pokemonCache.get(region_name + "_pokemon");
    // const localSpeciesData = pokemonCache.get(region_name + "_species");

    // if (localPokemonData && localSpeciesData) {
    //   setPokemonArray(localPokemonData);
    //   setSpeciesArray(localSpeciesData);
    // } else {
      const species_data = await get_promise_array_species(data['pokemon_entries']);
      setSpeciesArray(species_data);
      const pokemon_data = await get_promise_array_pokemon(species_data);
      setPokemonArray(pokemon_data);
      // pokemonCache.set(region_name + "_pokemon", pokemon_data, 10000);
      // pokemonCache.set(region_name + "_species", species_data, 10000);
    
  }

  const get_promise_array_species = async (data) => {
    let promiseArray = [];
    for (var i = 0; i < 10; i++) {
      promiseArray.push(axios.get(data[i]["pokemon_species"]["url"]).then((response) => {
        // delete response.data["color"];
        // delete response.data["egg_groups"];
        // delete response.data["genera"];
        // delete response.data["shape"];
        // delete response.data["pal_park_encounters"];
        // delete response.data["pokedex_numbers"];
        // delete response.data["names"];
        for (var i = 0; i < response.data["flavor_text_entries"].length; i++) {
          if (response.data["flavor_text_entries"][i].language.name === "en") {
            response.data["flavor_text"] = response.data["flavor_text_entries"][i]["flavor_text"];
            delete response.data["flavor_text_entries"];
            break;
          }
        }
        for (var j = 0; j < response.data["genera"].length; j++) {
          if (response.data["genera"][j].language.name === "en") {
            response.data["genus"] = response.data["genera"][j]["genus"];
            delete response.data["genera"];
            break;
          }
        }
        return response.data;
      }))
    }
    return Promise.all(promiseArray);
  }

  const get_promise_array_pokemon = async (data) => {
    let promiseArray = [];
    for (var i = 0; i < 10; i++) {
      promiseArray.push(axios.get(data[i]['varieties'][0]['pokemon']['url']).then((response) => {
        // delete response.data["game_indices"];
        // delete response.data["held_items"];
        return response.data;
      }))
    }
    return Promise.all(promiseArray);
  }

  return (
    <section id="Pokedex-container" className="flex">
      <div id="Pokedex-list" className="page-container flex">
        {
        (speciesArray.length && pokemonArray.length) 
        ? speciesArray.map((pokemon, index) => (<PokemonCard pokemonData={pokemonArray[index]} speciesData={pokemon} pokedexIndex={index + 1} key={pokemon["name"]}></PokemonCard>
        )) 
        : <div></div>}

      </div>
    </section>
  );
};

export default Pokedex;
