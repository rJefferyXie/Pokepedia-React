import "./Team.css";

// React and Redux
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

// Components
import PokemonCard from "../PokemonCard/PokemonCard";
import ShareForm from "../ShareForm/ShareForm";

// MUI and Icons
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

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
    let pokemonNames = [];
    let pokemonTypes = new Set();

    // initializing all pokemon and types that already exist.
    for (var i = 0; i < pokemonTeam.length; i++) {
      let pokemon = pokemonTeam[i].pokemonData;
      pokemonNames.push(pokemon.name);
      let types = pokemon.types;
      for (var j = 0; j < types.length; j++) {
        pokemonTypes.add(types[j].type.name);
      }
    }

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

        if (build.duplicates) {
          if (pokemonNames.includes(pokemon.name)) {
            return;
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

        if (build.types) {
          for (var k = 0; k < pokemon.types.length; k++) {
            if (pokemonTypes.has(pokemon.types[k].type.name)) {
              dispatch(allActions.teamActions.removeFromTeam(pokemon.name));
              return;
            }
          }
        }

        // Update pokemon names that are being used
        pokemonNames.push(pokemon.name);

        // Update types that are being used
        for (var l = 0; l < pokemon.types.length; l++) {
          pokemonTypes.add(pokemon.types[l].type.name)
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

  const toggleTypes = () => {
    dispatch(allActions.buildActions.toggleTypes());
  }

  const toggleDuplicates = () => {
    dispatch(allActions.buildActions.toggleDuplicates());
  }

  return (
    <section id="Team-container" className="flex">
      {sharing === false ? null : <ShareForm cancel={() => setSharing(false)}></ShareForm>}
      <button className="return-button pokemon-button flex" onClick={() => previousPage()}>
        <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
      </button>
      <div id="Team-left" className="flex-col">
        <div id="Team-description" className="flex-col">
          <h2 className="Team-header">Team Page</h2>
          <p id="Description-p">{`Create a team with pokemon randomly selected from ${pokedex.region} with the click of a button! You can also share your team to the dashboard for others to see, or take a look at teams that others have made.`}</p>
        </div>
        <div id="Team-settings-container" className="flex-col">
          <h2 className="Team-header">Team Builder</h2>
          <div id="Settings-container" className="flex-col">
            <label className="settings-label"><input type="checkbox" defaultChecked={build.legendary} onClick={() => toggleLegendary()}></input> No Legendary Pokemon</label>
            <label className="settings-label"><input type="checkbox" defaultChecked={build.mythic} onClick={() => toggleMythic()}></input> No Mythical Pokemon</label>
            <label className="settings-label"><input type="checkbox" defaultChecked={build.types} onClick={() => toggleTypes()}></input> No Duplicate Types</label>
            <label className="settings-label"><input type="checkbox" defaultChecked={build.duplicates} onClick={() => toggleDuplicates()}></input> No Duplicate Pokemon</label>
          </div>
          <div id="Team-button-container" className="button-container flex">
            <Button variant="contained" className="mui-button" onClick={() => clearTeam()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(177, 6, 6, 0.7)"}}>Clear Team</Button>
            <Button variant="contained" className="mui-button" onClick={() => generateTeam()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(9, 141, 42, 0.8)"}}>Generate</Button>
            <Button variant="contained" className="mui-button" onClick={() => setSharing(true)} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Share</Button>   
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
