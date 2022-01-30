import "./Team.css";

import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
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
        <div id="Team-page" className="flex">
            <button className="return-button pokemon-button flex" onClick={() => previousPage()}>
              <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
            </button>
            <div id="Team-wrapper" className="flex">
              {[...Array(6)].map((_, i) => {
                if (pokemonTeam[i] === undefined) { return <div className="pokemon-container flex"><FontAwesomeIcon icon={faPlus} style={{margin: "auto", fontSize: "1rem"}}></FontAwesomeIcon></div> }
                return <PokemonCard pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} pokedexIndex={pokemonTeam[i].pokedexIndex} teamIndex={i} addToTeam={addPokemon} removeFromTeam={removePokemon} key={i}></PokemonCard>
              })}
            </div>      
        </div>
    </section>
  )
};

export default Team;
