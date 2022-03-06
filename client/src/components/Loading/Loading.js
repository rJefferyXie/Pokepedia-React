import "./Loading.css"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions/allActions';

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

    return (
        <section id="Loading-screen" className="flex-col">
            <div id="Loading-container" className="flex-col">
                <Card variant="outlined" className="flex-col" style={{margin: "8px auto", padding: "8px"}}>
                    <h1 style={{margin: "0px 8px"}}>Random Pokémon Fact</h1>
                    <p style={{padding: "2px 8px"}}>{fact}</p>
                </Card>
                {(pokedex.speciesData.length && pokedex.pokemonData.length) 
                ? <Button className="mui-button" variant="contained" onClick={() => dispatch(allActions.loadActions.setLoaded(true))} style={{width: "fit-content", margin: "auto", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Continue</Button> 
                : <div className="flex-col">
                    <LinearProgress></LinearProgress>
                    <p style={{margin: "4px auto", fontSize: "1rem"}}>Loading Pokédex...</p>
                </div>}
            </div>
        </section>
    )
};

export default Loading;
