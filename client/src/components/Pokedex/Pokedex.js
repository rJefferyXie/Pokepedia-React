import "./Pokedex.css";

// React and Redux
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions/allActions';

// MUI Components & Icons
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Button, Snackbar, Alert, IconButton, Tooltip } from "@mui/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Loading from "../Loading/Loading";
import PokemonCard from "../PokemonCard/PokemonCard";
import Tutorial from "../Tutorial/Tutorial";

const Pokedex = () => {  
  const dispatch = useDispatch()

  const [teamShow, setTeamShow] = useState(false);
  const [fullTeamShow, setFullTeamShow] = useState(false);
  const [tutorialShow, setTutorialShow] = useState(false);

  const pokedex = useSelector(state => state.pokedexReducer);
  const loaded = useSelector(state => state.loadReducer.loaded);
  const pokemonTeam = useSelector(state => state.teamReducer.team);

  const closeTeam = (_, reason) => {
    if (reason === "clickaway") return;
    setTeamShow(false);
  }

  const closeFullTeam  = (_, reason) => {
    if (reason === "clickaway") return;
    setFullTeamShow(false);
  }

  const searchPokedex = () => {
    const input = document.getElementById('Pokedex-search');
    const pokemonContainers = document.getElementById("Pokedex-list").getElementsByClassName("pokemon-container");
    const search = input.value.toLowerCase();

    // Loop through all list items, and hide those who don't match the search query
    for (var i = 0; i < pokemonContainers.length; i++) {
      const searchableContainers = pokemonContainers[i].getElementsByClassName("searchable");
      const pokemonName = searchableContainers[0].textContent;
      const pokemonTypes = searchableContainers[1];
      for (var j = 0; j < pokemonTypes.childElementCount; j++) {
        if (pokemonName.indexOf(search) > -1 || pokemonTypes.childNodes[j].getAttribute("alt").indexOf(search) > -1) {
            pokemonContainers[i].style.display = "";
        } 
        else {
            pokemonContainers[i].style.display = "none";
        }
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    let region = window.location.pathname.replace("/pokedex/", "");
    if (pokedex.region !== region || pokedex.speciesData.length === 0) {
      dispatch(allActions.pokedexActions.setPokedex({"speciesData": [], "pokemonData": [], "region": ""}));
      retrieve_data(region); 
    }
  }, []);

  const retrieve_data = async (region) => {
    let regionNumber;

    switch (region) {
      case "kanto": 
        regionNumber = '2';
        break;
      case "johto": 
        regionNumber = '7';
        break;
      case "hoenn": 
        regionNumber = '4';
        break;
      case "sinnoh":
        regionNumber = '6';
        break;
      case "unova":
        regionNumber = '9';
        break;
      case "kalos":
        regionNumber = '12';
        break;
      case "alola":
        regionNumber = '16';
        break;
      default:
        return;
    }

    const speciesJSON = await axios.get("/api/pokedex/pokemon/" + regionNumber).then(res => res.data);
    const pokemonJSON = await axios.get("/api/pokedex/species/" + regionNumber).then(res => res.data);
    dispatch(allActions.pokedexActions.setPokedex(
      {"speciesData": speciesJSON[0]["pokemonData"], 
      "pokemonData": pokemonJSON[0]["speciesData"], 
      "region": region}
      )
    );
  }

  return (
    <section id="Pokedex-container" className="flex">
      {(loaded && (pokedex.speciesData.length && pokedex.pokemonData.length)) ? null : <Loading></Loading>}
      {tutorialShow === true ? <Tutorial onClickAway={() => setTutorialShow(false)}></Tutorial> : null}
        <div id="Pokedex-page" className="flex-col">
          <div id="Pokedex-top" className="flex">
            <Button id="Tutorial" variant="contained" className="mui-button" onClick={() => setTutorialShow(true)} style={{backgroundColor: "rgba(9, 141, 42, 0.7)"}}>Tutorial</Button>
            <input id="Pokedex-search" type="text" placeholder="Search by Pokemon Name or Type..." onChange={searchPokedex}></input>
            <Button id="View-team" variant="contained" className="mui-button" component={Link} to="/team" style={{backgroundColor: "rgba(6, 114, 177, 0.8)"}}>View Team</Button>
          </div>
          <div id="Pokedex-list" className="page-container flex">
              {pokedex.speciesData.map((pokemon, index) => 
              (<PokemonCard 
                speciesData={pokedex.pokemonData[index]} 
                pokemonData={pokemon} 
                pokedexIndex={index + 1} 
                showTeam={() => { fullTeamShow === false ? setTeamShow(true) : setTeamShow(false) }}
                key={index}></PokemonCard>
              ))}
          </div>
          {teamShow === false ? 
          <Tooltip title="View Your Team" placement="top" arrow>
            <IconButton onClick={() => { setFullTeamShow(true); setTeamShow(false); } } style={{position: "fixed", bottom: "3%", left: "3%", backgroundColor: "white", boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"}}>
              <CatchingPokemonIcon style={{padding: "0px 0px 0px 0px", width: "16px", height: "16px", color: "red"}}></CatchingPokemonIcon>
            </IconButton>
          </Tooltip> : null}
          <Snackbar open={teamShow} autoHideDuration={2000} onClose={closeTeam} style={{width: "100%"}}>
            <div className="flex" style={{width: "100%"}}>
              <Alert onClose={closeTeam} severity={pokemonTeam.length < 6 ? "success" : "error"} style={{width: "min(560px, 100vw)", textAlign: "center"}}>
                {pokemonTeam.length < 6 ? "Your pokemon was added to your team!" : "Your team already has six pokemon!"}
                <div className="flex team-wrapper" style={{margin: "4px auto auto auto"}}>
                  {[...Array(6)].map((_, i) => {
                    if (pokemonTeam[i] === undefined) { return <div className="ds flex" key={i} style={{backgroundColor: "white"}}><FontAwesomeIcon icon={faPlus} style={{margin: "auto", fontSize: "1rem"}}></FontAwesomeIcon></div> }
                    return <PokemonCard teamRemove={() => dispatch(allActions.teamActions.removeFromTeam(pokemonTeam[i].pokemonData.name))} pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} key={i} dashboard={true}></PokemonCard>
                  })}
                </div> 
              </Alert>
            </div>
          </Snackbar>
          <Snackbar open={fullTeamShow} onClose={closeFullTeam} style={{width: "100%"}}>
            <div className="flex" style={{width: "100%"}}>
              <Alert onClose={closeFullTeam} severity="info" style={{width: "min(560px, 100vw)", textAlign: "center"}}>
                This is your pokemon team. Click on a pokemon to remove it.
                <div className="flex team-wrapper" style={{margin: "4px auto auto auto"}}>
                  {[...Array(6)].map((_, i) => {
                    if (pokemonTeam[i] === undefined) { return <div className="ds flex" key={i} style={{backgroundColor: "white"}}><FontAwesomeIcon icon={faPlus} style={{margin: "auto", fontSize: "1rem"}}></FontAwesomeIcon></div> }
                    return <PokemonCard teamRemove={() => dispatch(allActions.teamActions.removeFromTeam(pokemonTeam[i].pokemonData.name))} pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} key={i} dashboard={true}></PokemonCard>
                  })}
                </div> 
              </Alert>
            </div>
          </Snackbar>
        </div>
    </section> 
  );
};

export default Pokedex;
