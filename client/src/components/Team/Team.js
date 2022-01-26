import "./Team.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonCard from "../../components/PokemonCard/PokemonCard";

const Team = ({team, exit, addToTeam, removeFromTeam}) => {
  return <section id="Team-container" className="flex">
      <div id="Team-page" className="flex">
            <button className="return-button pokemon-button flex" onClick={() => exit()}>
                <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
            </button>
            <div id="Team-wrapper" className="flex">
              {team.map((pokemon, index) => {
                if (pokemon === undefined) return false;
                return <PokemonCard pokemonData={pokemon[0]} speciesData={pokemon[1]} pokedexIndex={pokemon[2]} teamIndex={index} addToTeam={addToTeam} removeFromTeam={removeFromTeam} key={index}></PokemonCard>
              })}
            </div>      
        </div>
  </section>;
};

export default Team;
