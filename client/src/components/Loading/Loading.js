import "./Loading.css"

import React, { useState, useEffect } from 'react';


const Loading = ({ pokemonArray, speciesArray, setFinished }) => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        let facts = require("../../pokemonFacts");
        setFact(facts[Math.floor(Math.random() * Object.keys(facts).length)]);
    }, [])

    return (
        <section id="Loading-screen" className="flex-col">
            <div id="Loading-container" className="flex-col">
                <p className="loading-text">Loading...</p>
                <p id="Fact" className="loading-text">{fact}</p>
                {(speciesArray.length && pokemonArray.length) ? <button className="text-button" onClick={() => setFinished(true)}>Continue</button> : <div></div>}
            </div>
        </section>
    )
};

export default Loading;
