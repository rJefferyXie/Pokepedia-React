import "./Loading.css"

// React and Redux
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions/allActions';

// MUI
import { LinearProgress, Card, Button } from "@mui/material";

const Loading = () => {
    const dispatch = useDispatch()
    const [fact, setFact] = useState("");
    const pokedex = useSelector(state => state.pokedexReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
        let facts = require("../../pokemonFacts");
        setFact(facts[Math.floor(Math.random() * Object.keys(facts).length)]);
    }, []);

    const setLoaded = () => {
        dispatch(allActions.loadActions.setLoaded(true));
    }

    return (
        <section id="Loading-screen" className="flex-col">
            <div id="Loading-container" className="flex-col">
                <Card id="Fact-card" variant="outlined" className="flex-col">
                    <h1 className="fact-header">Random Pokémon Fact</h1>
                    <p className="fact-text">{fact}</p>
                </Card>
                {(pokedex.speciesData.length && pokedex.pokemonData.length) ? 
                <Button id="Loading-button" className="mui-button" variant="contained" onClick={setLoaded}>Continue</Button> : 
                <div className="flex-col">
                    <LinearProgress></LinearProgress>
                    <p className="loading-text">Loading Pokédex...</p>
                </div>}
            </div>
        </section>
    )
};

export default Loading;
