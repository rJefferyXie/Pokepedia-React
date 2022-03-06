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
    if (pokedex.region !== region_name) { 
      dispatch(allActions.pokedexActions.setPokedex(
        {"speciesData": [], "pokemonData": [], "region": ""}));
      retrieve_data(); 
    }
  }, []);

  const retrieve_data = async () => {
    const speciesJSON = await axios.get("/api/pokedex/pokemon/" + region_number).then(res => res.data);
    const pokemonJSON = await axios.get("/api/pokedex/species/" + region_number).then(res => res.data);
    dispatch(allActions.pokedexActions.setPokedex(
      {"speciesData": speciesJSON[0]["pokemonData"], 
      "pokemonData": pokemonJSON[0]["speciesData"], 
      "region": region_name}
      ));
  }

  return (
    <section id="Pokedex-container" className="flex">
      {(loaded && (pokedex.speciesData.length && pokedex.pokemonData.length)) ? 
        <div id="Pokedex-page" className="flex-col">
          <div id="Pokedex-top" className="flex">
            <Button id="Tutorial" variant="contained" className="mui-button" style={{backgroundColor: "rgba(9, 141, 42, 0.7)"}}>Tutorial (Incomplete)</Button>
            <input id="Pokedex-search" type="text" placeholder="Search by Pokemon Name or Type..." onChange={searchPokedex}></input>
            <Button id="Show-team" variant="contained" className="mui-button" component={Link} to="/team" style={{backgroundColor: "rgba(6, 114, 177, 0.8)"}}>View Team</Button>
          </div>
          <div id="Pokedex-list" className="page-container flex">
              {pokedex.speciesData.map((pokemon, index) => 
              (<PokemonCard 
                speciesData={pokedex.pokemonData[index]} 
                pokemonData={pokemon} 
                pokedexIndex={index + 1} 
                showTeam={() => openTeam()}
                key={index}></PokemonCard>
              ))}
          </div>
          <Snackbar open={teamShow} autoHideDuration={2000} onClose={closeTeam} style={{width: "100%"}}>
            <div className="flex" style={{width: "100%"}}>
              {pokemonTeam.length <= 6 ? 
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
      : <Loading></Loading>}
    </section> 
  );
};

export default Pokedex;
