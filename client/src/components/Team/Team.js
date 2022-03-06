import "./Team.css";

import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonCard from "../../components/PokemonCard/PokemonCard";
import ShareForm from "../ShareForm/ShareForm";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

import { Button } from "@mui/material";

const Team = () => {
  const pokemonTeam = useSelector(state => state.teamReducer.team);
  const pokedex = useSelector(state => state.pokedexReducer);
  const build = useSelector(state => state.buildReducer);

  const [sharing, setSharing] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const previousPage = () => navigate(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const generateTeam = () => {
    let slotsLeft = 6 - pokemonTeam.length;
    let myInterval = setInterval(() => {
      if (slotsLeft > 0) {
        let index = Math.floor(Math.random() * pokedex.speciesData.length);
        let pokemon = pokedex.speciesData[index];
        let species = pokedex.pokemonData[index];

        // Get Fully Evolved Versions of Pokemon
        if (pokedex.pokemonData[index + 1]) {
          if (pokedex.pokemonData[index + 1].evolves_from_species) {
            if (pokedex.pokemonData[index + 1].evolves_from_species.name === pokemon.name) {
              index += 1;
              pokemon = pokedex.speciesData[index];
              species = pokedex.pokemonData[index];
            }
          }
        }

        if (pokedex.pokemonData[index + 1]) {
          if (pokedex.pokemonData[index + 1].evolves_from_species) {
            if (pokedex.pokemonData[index + 1].evolves_from_species.name === pokemon.name) {
              index += 1;
              pokemon = pokedex.speciesData[index];
              species = pokedex.pokemonData[index];
            }
          }
        }

        dispatch(allActions.teamActions.addToTeam({ "pokemonData": pokemon, "speciesData": species, "pokedexIndex": index + 1 }));

        if (build.legendary) {
          if (species.is_legendary) {
            dispatch(allActions.teamActions.removeFromTeam(pokemon.name));
            return;
          }
        }

        if (build.mythic) {
          if (species.is_mythic) {
            dispatch(allActions.teamActions.removeFromTeam(pokemon.name));
            return;
          }
        }

        slotsLeft -= 1;
      } else {
        clearInterval(myInterval);
      }
    }, 200);
  }

  const clearTeam = () => {
    dispatch(allActions.teamActions.clearTeam());
  }

  const toggleLegendary = () => {
    dispatch(allActions.buildActions.toggleLegendary());
  }

  const toggleMythic = () => {
    dispatch(allActions.buildActions.toggleMythic());
  }

  return (
    <section id="Team-container" className="flex">
      {sharing === false ? null : <ShareForm cancel={() => setSharing(false)}></ShareForm>}
      <button className="return-button pokemon-button flex" onClick={() => previousPage()}>
        <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
      </button>
      <div id="Team-left" className="flex-col">
        <h2 id="Team-header">Team Builder</h2>
        <div id="Team-button-container" className="button-container flex">
          <Button variant="contained" className="mui-button" onClick={() => clearTeam()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(177, 6, 6, 0.7)"}}>Clear Team</Button>
          <Button variant="contained" className="mui-button" onClick={() => generateTeam()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(9, 141, 42, 0.8)"}}>Generate</Button>
          <Button variant="contained" className="mui-button" onClick={() => setSharing(true)} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Share Team</Button>   
        </div>
        <div id="Team-settings-container" className="flex-col">
          <h3 id="Team-header">Build Settings</h3>
          <div id="Settings-container" className="flex-col">
            <label className="settings-label"><input type="checkbox" defaultChecked={build.legendary} onClick={() => toggleLegendary()}></input> No Legendary Pokemon</label>
            <label className="settings-label"><input type="checkbox" defaultChecked={build.mythic} onClick={() => toggleMythic()}></input> No Mythical Pokemon</label>
          </div>
        </div>
      </div>
      <div id="Team-right" className="flex-col">
        <div className="flex team-wrapper">
          {[...Array(6)].map((_, i) => {
            if (pokemonTeam[i] === undefined) { return <div className="pokemon-container flex" key={i}><FontAwesomeIcon icon={faPlus} style={{margin: "auto", fontSize: "1rem"}}></FontAwesomeIcon></div> }
            return <PokemonCard pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} pokedexIndex={pokemonTeam[i].pokedexIndex} share={true} teamIndex={i} key={i}></PokemonCard>
          })}
        </div>   
      </div>
    </section> 
  )
};

export default Team;
