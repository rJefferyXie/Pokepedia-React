import "./Team.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonCard from "../../components/PokemonCard/PokemonCard";

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Team = () => {
  const location = useLocation();
  const {team} = location.state;

  const navigate = useNavigate();
  const previousPage = () => navigate(-1);

  const [pokemonTeam, setPokemonTeam] = useState([]);

  useEffect(() => {
    setPokemonTeam(team);
  }, []);

  const addPokemon = (toBeAdded) => {
    if (pokemonTeam.length >= 6) { return; }

    if (pokemonTeam) {
      setPokemonTeam([...pokemonTeam, toBeAdded])
    } else {
      setPokemonTeam([toBeAdded]);
    }
  }

  const removePokemon = (index) => {
    setPokemonTeam(pokemonTeam.filter((_, filterindex) => {
      return filterindex !== index;
    }));
  }

  return <section id="Team-container" className="flex">
      <div id="Team-page" className="flex">
            <button className="return-button pokemon-button flex" onClick={() => previousPage()}>
                <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
            </button>
            <div id="Team-wrapper" className="flex">
              {team.map((pokemon, index) => {
                if (pokemon === undefined) return false;
                return <PokemonCard pokemonData={pokemon[0]} speciesData={pokemon[1]} pokedexIndex={pokemon[2]} teamIndex={index} addToTeam={addPokemon} removeFromTeam={removePokemon} key={index}></PokemonCard>
              })}
            </div>      
        </div>
  </section>;
};

export default Team;
