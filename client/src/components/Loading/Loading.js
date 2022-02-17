import "./Loading.css"
import loadingImage from "../../images/loader.png";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const Loading = ({ pokemonArray, speciesArray }) => {
    const dispatch = useDispatch()
    const [fact, setFact] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        let facts = require("../../pokemonFacts");
        setFact(facts[Math.floor(Math.random() * Object.keys(facts).length)]);
    }, []);

    const setFinished = () => {
        dispatch(allActions.loadActions.setLoaded());
    }

    return (
        <section id="Loading-screen" className="flex-col">
            <div id="Loading-container" className="flex-col">
                <h1 style={{margin: "auto", fontSize: "1.8rem"}}>Random Pokémon Fact</h1>
                <p id="Fact">{fact}</p>
                {(speciesArray.length && pokemonArray.length) 
                ? <button id="Loading-button" className="text-button" onClick={() => setFinished()}>Continue</button> 
                : <div style={{margin: "auto"}}>
                    <img id="Loading-image" src={loadingImage} alt=""></img>
                    <p className="loading-text">Loading...</p>
                </div>}
            </div>
        </section>
    )
};

export default Loading;
