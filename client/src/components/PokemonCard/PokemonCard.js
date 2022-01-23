import "./PokemonCard.css";
import TypeImageMap from "../Constants/TypeImageMap";
import TypeColorSchemes from "../Constants/TypeColorSchemes"

import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InspectPage from "../../components/InspectPage/InspectPage";

import React, { useEffect, useState } from "react";

const PokemonCard = (props) => {
  const [inspecting, setInspecting] = useState(false);

  const inspectPokemon = () => {
    setInspecting(true);
  }

  const addToTeam = () => {
    console.log("team")
  }

  const exitInspect = () => {
    console.log("dwaniuawhfiuahf")
    setInspecting(false);
  }

  return (
    inspecting === false ?
    <div className="pokemon-container flex-col" style={{backgroundColor: TypeColorSchemes[props.pokemonData.types[0].type.name]}}>
        <div className="pokemon-button-container flex">
          <button className="pokemon-button-card flex" onClick={addToTeam}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faPlus}></FontAwesomeIcon>
          </button>
          <button className="pokemon-button-card flex" onClick={inspectPokemon}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
        <img className="pokemon-image-card" src={props.pokemonData.sprites.other["official-artwork"].front_default} alt=""></img>
        <p className="pokemon-index-card">{"#" + props.pokedexIndex}</p>
        <p className="pokemon-name-card">{props.pokemonData["name"]}</p>

        <div className="pokemon-type-container-card flex">
          {props.pokemonData.types.map(type => {
            return <img className="pokemon-type-card" src={TypeImageMap[type.type.name]} alt={type.type.name}></img>
          })}
        </div>
    </div>
    :
    <InspectPage data={props} exit={exitInspect}></InspectPage>
  );
};

export default PokemonCard;

