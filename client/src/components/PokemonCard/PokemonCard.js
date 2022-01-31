import "./PokemonCard.css";
import TypeImageMap from "../Constants/TypeImageMap";
import TypeColorSchemes from "../Constants/TypeColorSchemes"

import { faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const PokemonCard = ({pokemonData, speciesData, pokedexIndex, teamIndex}) => {
  const dispatch = useDispatch()

  const addPokemon = () => {
    dispatch(allActions.teamActions.addToTeam({ "pokemonData": pokemonData, "speciesData": speciesData, "pokedexIndex": pokedexIndex }));
  }

  const removePokemon = () => {
    dispatch(allActions.teamActions.removeFromTeam(pokemonData.name));
  }

  return (
    <div className="pokemon-container flex-col" style={{backgroundColor: TypeColorSchemes[pokemonData.types[0].type.name]}}>
        <div className="pokemon-button-container flex">
          {teamIndex === undefined ?
          <button className="pokemon-button-card flex" onClick={() => addPokemon()}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faPlus}></FontAwesomeIcon>
          </button>
          :
          <button className="pokemon-button-card flex" onClick={() => removePokemon()}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faTimes}></FontAwesomeIcon>
          </button>
          }
          <Link to="/inspect" className="pokemon-button-card flex" state={{ pokemonData: pokemonData, speciesData: speciesData, pokedexIndex: pokedexIndex }}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={faSearch}></FontAwesomeIcon>
          </Link>
        </div>
        <img className="pokemon-image-card" src={pokemonData.sprites.other["official-artwork"].front_default} alt=""></img>
        <p className="pokemon-index-card">{"#" + pokedexIndex}</p>
        <p className="pokemon-name-card searchable">{pokemonData["name"]}</p>

        <div className="pokemon-type-container-card searchable flex">
          {pokemonData.types.map((type, index) => {
            return <img className="pokemon-type-card" src={TypeImageMap[type.type.name]} alt={type.type.name} key={index}></img>
          })}
        </div>
    </div>
  );
};

export default PokemonCard;

