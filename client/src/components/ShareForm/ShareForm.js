import "./ShareForm.css";

// React and Redux
import axios from "axios";
import { useState } from "react";
import { useSelector } from 'react-redux';

// Components
import PokemonCard from "../PokemonCard/PokemonCard";

// MUI Components
import { ClickAwayListener, Button } from "@mui/material";


const ShareForm = ({cancel}) => {
    const pokemonTeam = useSelector(state => state.teamReducer.team);
    const pokedex = useSelector(state => state.pokedexReducer);
    const [tags, setTags] = useState([]);

    const setSelected = (buttonID) => {
        const tag = document.getElementById(buttonID);
        if (tag.classList.contains('selected')) {
            tag.classList.toggle("selected");
            setTags(tags.filter(selectedTag => selectedTag !== tag.textContent));
        }
        else {
            if (document.getElementsByClassName("selected").length < 2) {
                tag.classList.toggle("selected");
                setTags([...tags, tag.textContent]);
            }
        }
    }

    const shareTeam = () => {
        let name = document.getElementById("Username");
        if (name.value === "" || pokemonTeam.length < 6) {
            alert("Please make sure your team has six pokemon and you entered a name!");
        } else {
            axios.post("/api/teams/create", {username: name.value, region: pokedex.region, tags: tags, team: pokemonTeam});
            axios.post("/api/dashboard/stats", {username: name.value, region: pokedex.region, team: pokemonTeam});
            cancel();
            alert("You have successfully shared your team!");
        }
    }

    return (
        <div className="overlay">
            <ClickAwayListener onClickAway={() => cancel()}>
                <div id="Share-form" className="flex-col">
                    <input id="Username" type="text" placeholder="Enter a name..." maxLength="20"></input>
                    <div id="Share-team" className="flex team-wrapper">
                    {[...Array(6)].map((_, i) => {
                        if (pokemonTeam[i] === undefined) { return <div className="pokemon-container ds flex" key={i}></div> }
                        return <PokemonCard pokemonData={pokemonTeam[i].pokemonData} speciesData={pokemonTeam[i].speciesData} dashboard={true} key={i}></PokemonCard>
                    })}
                    </div>   
                    <div id="Share-tags" className="flex-col">
                        <h3 style={{margin: "4px auto"}}>Select up to 2 tags.</h3>
                        <div className="team-tags flex">
                            <button id="tag1" className="team-tag" onClick={() => setSelected("tag1")}>Try to beat me!</button>
                            <button id="tag2" className="team-tag" onClick={() => setSelected("tag2")}>So cool!</button>
                            <button id="tag3" className="team-tag" onClick={() => setSelected("tag3")}>Get your game on!</button>
                            <button id="tag4" className="team-tag" onClick={() => setSelected("tag4")}>The best!</button>
                            <button id="tag5" className="team-tag" onClick={() => setSelected("tag5")}>Best Team!</button>
                            <button id="tag6" className="team-tag" onClick={() => setSelected("tag6")}>Badge Collector!</button>
                            <button id="tag7" className="team-tag" onClick={() => setSelected("tag7")}>Never Give Up!</button>
                            <button id="tag8" className="team-tag" onClick={() => setSelected("tag8")}>Super Team!</button>
                            <button id="tag9" className="team-tag" onClick={() => setSelected("tag9")}>Legendary!</button>
                        </div>
                    </div>
                    <div className="button-container flex">
                        <Button variant="contained" className="mui-button" onClick={() => cancel()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(177, 6, 6, 0.7)"}}>Cancel</Button>
                        <Button variant="contained" className="mui-button" onClick={() => shareTeam()} style={{margin: "auto 4px", width: "fit-content", backgroundColor: "rgba(9, 141, 42, 0.8)"}}>Share</Button>
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default ShareForm;
