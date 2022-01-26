import "./PokemonCard.css";
import TypeImageMap from "../Constants/TypeImageMap";
import TypeColorSchemes from "../Constants/TypeColorSchemes"

import { faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InspectPage from "../../components/InspectPage/InspectPage";

import React, { useState } from "react";

const PokemonCard = ({pokemonData, speciesData, pokedexIndex, addToTeam, removeFromTeam, teamIndex, customStyle}) => {
  const [inspecting, setInspecting] = useState(false);

  const inspectPokemon = () => {
    setInspecting(true);
  }

  const add = () => {
    addToTeam([pokemonData, speciesData, pokedexIndex]);
  }

  const remove = () => {
    removeFromTeam(teamIndex);
  }

  const exitInspect = () => {
    setInspecting(false);
  }

  return (
    inspecting === false ?
    <div className="pokemon-container flex-col" style={{backgroundColor: TypeColorSchemes[pokemonData.types[0].type.name]}}>
        <div className="pokemon-button-container flex">
          {teamIndex === undefined ?
          <button className="pokemon-button-card flex" onClick={() => add()}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faPlus}></FontAwesomeIcon>
          </button>
          :
          <button className="pokemon-button-card flex" onClick={() => remove()}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faTimes}></FontAwesomeIcon>
          </button>
          }
          <button className="pokemon-button-card flex" onClick={inspectPokemon}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
        <img className="pokemon-image-card" src={pokemonData.sprites.other["official-artwork"].front_default} alt=""></img>
        <p className="pokemon-index-card">{"#" + pokedexIndex}</p>
        <p className="pokemon-name-card">{pokemonData["name"]}</p>

        <div className="pokemon-type-container-card flex">
          {pokemonData.types.map((type, index) => {
            return <img className="pokemon-type-card" src={TypeImageMap[type.type.name]} alt={type.type.name} key={index}></img>
          })}
        </div>
    </div>
    :
    <InspectPage pokemonData={pokemonData} speciesData={speciesData} pokedexIndex={pokedexIndex} exit={exitInspect} customStyle={customStyle}></InspectPage>
  );
};

export default PokemonCard;

