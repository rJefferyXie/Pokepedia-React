import "./Team.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonCard from "../../components/PokemonCard/PokemonCard";

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const Team = () => {
  const pokemonTeam = useSelector(state => state.teamReducer.team);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const previousPage = () => navigate(-1);

  const addPokemon = (toBeAdded) => {
    dispatch(allActions.teamActions.addToTeam(toBeAdded));
  }

  const removePokemon = (toBeRemoved) => {
    dispatch(allActions.teamActions.removeFromTeam(toBeRemoved));
  }

  return (
    <section id="Team-container" className="flex">
        <button className="return-button pokemon-button flex" onClick={() => previousPage()}>
          <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
        </button>
        <div id="Team-page" className="flex">
              <div id="Team-wrapper" className="flex">
                {pokemonTeam.map((pokemon, index) => {
                  if (pokemon === undefined) return false;
                  return <PokemonCard pokemonData={pokemon.pokemonData} speciesData={pokemon.speciesData} pokedexIndex={pokemon.pokedexIndex} teamIndex={index} addToTeam={addPokemon} removeFromTeam={removePokemon} key={index}></PokemonCard>
                })}
              </div>      
          </div>
    </section>
  )
};

export default Team;
