import "./Pokedex.css";

import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions/allActions';

import PokemonCard from "../PokemonCard/PokemonCard";
import { Link } from "react-router-dom";

const Pokedex = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const {region_number, region_name} = location.state;
  const [speciesArray, setSpeciesArray] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);
  const pokedex = useSelector(state => state.pokedexReducer);

  useEffect(() => {
    if (pokedex.pokemonData.length > 0 && pokedex.speciesData.length > 0) {
      setSpeciesArray(pokedex.speciesData);
      setPokemonArray(pokedex.pokemonData);
    }
    else {
      retrieve_data(region_number, region_name);
    }
  }, []);

  const addPokemon = (toBeAdded) => {
    dispatch(allActions.teamActions.addToTeam(toBeAdded));
  }

  const removePokemon = (toBeRemoved) => {
    dispatch(allActions.teamActions.removeFromTeam(toBeRemoved));
  }

  const retrieve_data = async (region_number, region_name) => {
    const speciesJSON = await axios.get("/api/pokedex/pokemon/" + region_number).then(res => res.data);
    const pokemonJSON = await axios.get("/api/pokedex/species/" + region_number).then(res => res.data);
    if (pokemonJSON.length > 0 && speciesJSON.length > 0) {
      setSpeciesArray(speciesJSON[0]["pokemonData"]);
      setPokemonArray(pokemonJSON[0]["speciesData"]);
      dispatch(allActions.pokedexActions.setPokedex({"speciesData": speciesJSON[0]["pokemonData"], "pokemonData": pokemonJSON[0]["speciesData"]}))
    } 
    else {
      const pokedexData = await axios.get(`https://pokeapi.co/api/v2/pokedex/${region_number}/`).then(res => generate_pokedex(res.data))
      axios.post("/api/pokedex/pokemon/" + region_number, {"pokedexNumber": region_number, "pokemonData": pokedexData[0]});
      axios.post("/api/pokedex/species/" + region_number, {"pokedexNumber": region_number, "speciesData": pokedexData[1]});
    }
  }

  const generate_pokedex = async (data) => {
    const pokemon_data = await get_promise_array_species(data['pokemon_entries']);
    setPokemonArray(pokemon_data);
    const species_data = await get_promise_array_pokemon(pokemon_data);
    setSpeciesArray(species_data);
    return [species_data, pokemon_data];
  }

  const get_promise_array_species = async (data) => {
    let promiseArray = [];
    for (var i = 0; i < data.length; i++) {
      promiseArray.push(axios.get(data[i]["pokemon_species"]["url"]).then((response) => {
        for (var j = 0; j < response.data["flavor_text_entries"].length; j++) {
          if (response.data["flavor_text_entries"][j].language.name === "en") {
            response.data["flavor_text"] = response.data["flavor_text_entries"][j]["flavor_text"];
            delete response.data["flavor_text_entries"];
            break;
          }
        }
        for (var k = 0; k < response.data["genera"].length; k++) {
          if (response.data["genera"][k].language.name === "en") {
            response.data["genus"] = response.data["genera"][k]["genus"];
            delete response.data["genera"];
            break;
          }
        }
        delete response.data["names"];
        delete response.data["pal_park_encounters"];
        delete response.data["shape"];
        return response.data;
      }))
    }
    return Promise.all(promiseArray);
  }

  const get_promise_array_pokemon = async (data) => {
    let promiseArray = [];
    for (var m = 0; m < data.length; m++) {
      promiseArray.push(axios.get(data[m]['varieties'][0]['pokemon']['url']).then((response) => {
        for (var x = 0; x < response.data["moves"].length; x++) {
          response.data["moves"][x]["version_group_details"] = response.data["moves"][x]["version_group_details"][0];
          delete response.data["moves"][x]["version_group_details"]["version_group"];
        }
        delete response.data["game_indices"];
        delete response.data["held_items"];
        delete response.data["sprites"]["versions"];
        return response.data;
      }))
    }
    return Promise.all(promiseArray);
  }

  return (
    <section id="Pokedex-container" className="flex">
      <Link to="/team" id="View-team">View Team</Link>
      <div id="Pokedex-list" className="page-container flex">
        {
        (speciesArray.length && pokemonArray.length) 
        ? speciesArray.map((pokemon, index) => (<PokemonCard speciesData={pokemonArray[index]} pokemonData={pokemon} pokedexIndex={index + 1} addToTeam={addPokemon} removeFromTeam={removePokemon} customStyle={{display: "fixed"}} key={index}></PokemonCard>
        )) 
        : <div>Loading..</div>}

      </div>
    </section> 
  );
};

export default Pokedex;
