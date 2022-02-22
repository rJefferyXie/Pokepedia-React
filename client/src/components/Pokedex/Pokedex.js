import "./Pokedex.css";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions/allActions';

import Loading from "../Loading/Loading";
import PokemonCard from "../PokemonCard/PokemonCard";
import { Link } from "react-router-dom";

import { Button, Snackbar, Alert } from "@mui/material";

const Pokedex = () => {  
  const dispatch = useDispatch()
  const location = useLocation();
  const {region_number, region_name} = location.state;
  const [speciesArray, setSpeciesArray] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [teamShow, setTeamShow] = useState(false);
  const pokedex = useSelector(state => state.pokedexReducer);
  const loaded = useSelector(state => state.loadReducer.loaded);
  const pokemonTeam = useSelector(state => state.teamReducer.team);

  const openTeam = () => {
    setTeamShow(true);
  }

  const closeTeam = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setTeamShow(false);
  }

  const searchPokedex = () => {
    let input = document.getElementById('Pokedex-search');
    let pokemonContainers = document.getElementById("Pokedex-list").getElementsByClassName("pokemon-container");
    var search = input.value.toLowerCase();

    // Loop through all list items, and hide those who don't match the search query
    for (var i = 0; i < pokemonContainers.length; i++) {
      var searchableContainers = pokemonContainers[i].getElementsByClassName("searchable");
      var pokemonName = searchableContainers[0].textContent;
      var pokemonTypes = searchableContainers[1];
      for (var j = 0; j < pokemonTypes.childElementCount; j++) {
        if (pokemonName.indexOf(search) > -1 || pokemonTypes.childNodes[j].getAttribute("alt").indexOf(search) > -1) {
            pokemonContainers[i].style.display = "";
        } 
        else {
            pokemonContainers[i].style.display = "none";
        }
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pokedex.pokemonData.length > 0 && pokedex.speciesData.length > 0) {
      setSpeciesArray(pokedex.speciesData);
      setPokemonArray(pokedex.pokemonData);
    }
    else {
      retrieve_data(region_number, region_name);
    }
  }, []);

  const retrieve_data = async (region_number, region_name) => {
    const speciesJSON = await axios.get("/api/pokedex/pokemon/" + region_number).then(res => res.data);
    const pokemonJSON = await axios.get("/api/pokedex/species/" + region_number).then(res => res.data);
    if (pokemonJSON.length > 0 && speciesJSON.length > 0) {
      setSpeciesArray(speciesJSON[0]["pokemonData"]);
      setPokemonArray(pokemonJSON[0]["speciesData"]);
      dispatch(allActions.pokedexActions.setPokedex({"speciesData": speciesJSON[0]["pokemonData"], "pokemonData": pokemonJSON[0]["speciesData"], "region": region_name}));
    } 
    else {
      const pokedexData = await axios.get(`https://pokeapi.co/api/v2/pokedex/${region_number}/`).then(res => generate_pokedex(res.data))
      axios.post("/api/pokedex/pokemon/" + region_number, {"pokedexNumber": region_number, "pokemonData": pokedexData[0]});
      axios.post("/api/pokedex/species/" + region_number, {"pokedexNumber": region_number, "speciesData": pokedexData[1]});
      dispatch(allActions.pokedexActions.setPokedex({"speciesData": speciesJSON[0]["pokemonData"], "pokemonData": pokemonJSON[0]["speciesData"], "region": region_name}));
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
      {(loaded && (speciesArray.length && pokemonArray.length)) ? 
        <div id="Pokedex-page" className="flex-col">
          <div id="Pokedex-top" className="flex">
            <Button id="Tutorial" variant="contained" color="secondary" className="pokedex-button">Tutorial (Incomplete)</Button>
            <input id="Pokedex-search" type="text" placeholder="Search by Pokemon Name or Type..." onChange={searchPokedex}></input>
            <Button id="Show-team" variant="contained" color="info" component={Link} to="/team" className="pokedex-button">View Team</Button>
          </div>
          <div id="Pokedex-list" className="page-container flex">
              {speciesArray.map((pokemon, index) => 
              (<PokemonCard 
                speciesData={pokemonArray[index]} 
                pokemonData={pokemon} 
                pokedexIndex={index + 1} 
                showTeam={() => openTeam()}
                key={index}></PokemonCard>
              ))}
          </div>
          <Snackbar open={teamShow} autoHideDuration={2000} onClose={closeTeam} style={{width: "100%"}}>
            <div className="flex" style={{width: "100%"}}>
              {pokemonTeam.length < 6 ? 
                <Alert onClose={closeTeam} severity="success" style={{width: "fit-content", textAlign: "center"}}>
                  Your Pokemon was added to your team!
                  <div className="flex team-wrapper">
                    {[...Array(6)].map((_, i) => {
                      if (pokemonTeam[i] === undefined) { return <div className="ds flex" key={i} style={{backgroundColor: "white"}}><FontAwesomeIcon icon={faPlus} style={{margin: "auto", fontSize: "1rem"}}></FontAwesomeIcon></div> }
                      return <PokemonCard pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} key={i} dashboard={true}></PokemonCard>
                    })}
                  </div> 
                </Alert> :
                <Alert onClose={closeTeam} severity="error" style={{width: "fit-content", textAlign: "center"}}>
                  Your team already has six pokemon!
                  <div className="flex team-wrapper">
                    {[...Array(6)].map((_, i) => {
                      return <PokemonCard pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} key={i} dashboard={true}></PokemonCard>
                    })}
                  </div> 
                </Alert>
              }
            </div>
          </Snackbar>
        </div>
      : <Loading speciesArray={speciesArray} pokemonArray={pokemonArray}></Loading>}
    </section> 
  );
};

export default Pokedex;
