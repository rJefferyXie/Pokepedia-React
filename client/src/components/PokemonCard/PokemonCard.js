import "./PokemonCard.css";
import TypeImageMap from "../../constants/TypeImageMap";
import TypeColorSchemes from "../../constants/TypeColorSchemes"

import { faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { useInView } from 'react-intersection-observer';

import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const PokemonCard = ({pokemonData, speciesData, pokedexIndex, teamIndex, dashboard, showTeam, teamRemove}) => {
  const supportsLazyLoad = ('loading' in document.createElement('img'));
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: supportsLazyLoad !== false,
  });

  const dispatch = useDispatch()

  const addPokemon = () => {
    dispatch(allActions.teamActions.addToTeam({ "pokemonData": pokemonData, "speciesData": speciesData, "pokedexIndex": pokedexIndex }));
    if (showTeam) {
      showTeam();
    }
  }

  const removePokemon = () => {
    dispatch(allActions.teamActions.removeFromTeam(pokemonData.name));
  }

  return (
    <div ref={ref} onClick={teamRemove !== undefined ? () => teamRemove() : null} className={dashboard === undefined ? "pokemon-container flex-col" : "pokemon-container ds flex-col"} style={teamRemove !== undefined ? {backgroundColor: TypeColorSchemes[pokemonData.types[0].type.name], cursor: "pointer"} : {backgroundColor: TypeColorSchemes[pokemonData.types[0].type.name]}}>
        {dashboard === undefined ? 
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
            <Link to={"/inspect/" + pokemonData.name} className="pokemon-button-card flex" state={{ pokemonData: pokemonData, speciesData: speciesData, pokedexIndex: pokedexIndex }}>
              <FontAwesomeIcon style={{margin: "auto"}} icon={faSearch}></FontAwesomeIcon>
            </Link>
          </div> : null
        }

        {inView || supportsLazyLoad ? <img className="pokemon-image-card" src={pokemonData.sprites.other["official-artwork"].front_default} alt={pokemonData["name"]} loading="lazy"></img> : null}
        {pokedexIndex !== undefined ? <p className="pokemon-index-card">{"#" + pokedexIndex}</p>: null}
        <p className="pokemon-name-card searchable">{pokemonData["name"]}</p>

        {dashboard === undefined ? <div className="pokemon-type-container-card searchable flex">
          {pokemonData.types.map((type, index) => {
            return <img className="pokemon-type-card" src={TypeImageMap[type.type.name]} alt={type.type.name} key={index}></img>
          })}
        </div>
        : null}
    </div>
  );
};

export default PokemonCard;

