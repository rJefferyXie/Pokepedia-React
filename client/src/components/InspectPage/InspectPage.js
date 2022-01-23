import "./InspectPage.css";
import TypeColorSchemes from "../Constants/TypeColorSchemes";
import TypeImageMap from "../Constants/TypeImageMap";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InspectPage = (props) => {
    document.getElementById("Navbar").style.backgroundColor = TypeColorSchemes[props.data.pokemonData.types[0].type.name];

    const statDictionary = {
        0: "HP",
        1: "Attack",
        2: "Defense",
        3: "Sp. Attack",
        4: "Sp. Defense",
        5: "Speed"
    };

    const [evolutions, setEvolutions] = useState([]);

    const getEvolutionChain = () => {
        axios.get(props.data.speciesData['evolution_chain']['url'])
        .then(response => setEvolutions(response.data));
    }

    useEffect(() => {
        getEvolutionChain();
    }, []);

    useEffect(() => {
        var evolutionChain = evolutions.chain;
        const evolutionData = [];
        while (evolutionChain !== undefined) {
            evolutionChain = evolutionChain.evolves_to[0];  // will ned to fix for eevee gallade
            if (evolutionChain !== undefined) {
                for (const [key, value] of Object.entries(evolutionChain.evolution_details[0])) {
                    if (value) {
                        if (key === "trigger") {
                            console.log(key, value.name);
                        } else {
                            console.log(key, value);
                        }
                    }
                }
            }
        }
    }, [evolutions]);
    
    async function get_evolution_chain(data) {
        fill_evolution_container(data['chain']['evolves_to']);
    
        if (data['chain']['evolves_to'].length > 0) {
            fill_evolution_container(data['chain']['evolves_to'][0]['evolves_to']);
        }
    } 
    
    async function fill_evolution_container(data) {
        for (var i = 0; i < data.length; i++) {
            if (document.getElementById(data[i]['species']['name']) === null) {
                continue;
            }
    
            let trigger = document.createElement('div');
            trigger.className = "evolution-trigger flex";
            trigger.textContent = data[i]['evolution_details'][0]['trigger']['name'];
            if (data[i]['evolution_details'][0]['trigger']['name'] === "level-up") {
                if (data[i]['evolution_details'][0]['min_level']) {
                    trigger.textContent += ": " + data[i]['evolution_details'][0]['min_level'];
                }
                else if (data[i]['evolution_details'][0]['location']) {
                    trigger.textContent += ": " + data[i]['evolution_details'][0]['location']['name'];
                }
                else if (data[i]['evolution_details'][0]['time_of_day']) {
                    trigger.textContent += ": " + data[i]['evolution_details'][0]['time_of_day'];
                }
                else if (data[i]['evolution_details'][0]['min_affection']) {
                    trigger.textContent += ": " + data[i]['evolution_details'][0]['min_affection'];
                }
            }
    
            if (data[i]['evolution_details'][0]['trigger']['name'] === "use-item") {
                get_item_image(data[i]['evolution_details'][0]['item']['url'], trigger);
                trigger.textContent += ": " + data[i]['evolution_details'][0]['item']['name'];
            }
            // evolution_chain.appendChild(trigger);       
            // create_evolution_container(data[i]['species']['name']);
        }
    }
    
    async function get_item_image(data_url, trigger) {
        fetch(data_url)
        .then(response => response.json())
        .then(function (data) {
            let item_image = document.createElement('img');
            item_image.className = "item-image";
            item_image.src = data['sprites']['default'];
            trigger.appendChild(item_image);
        });
    }

  return (
    <div id="Inspect-page">
        <button id="Return-button" className="pokemon-button flex" onClick={() => props.exit()} style={{backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>
            <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
        </button>
        <h2 className="pokemon-name">{props.data.pokemonData.name}</h2>
        <p className="pokemon-genera" style={{backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>{props.data.speciesData.genus}</p>
        <div id="Pokemon-main" className="flex">
            <div className="flex-col main-section">
                <p className="pokemon-index left">{"Pokedex Entry #" + props.data.pokedexIndex}</p>
                <p className="pokemon-height left">{"Height " + props.data.pokemonData.height * 10 + "cm ( " + (props.data.pokemonData.height / 2.54 / 12).toFixed(0) + '" ' + (props.data.pokemonData.height / 2.54 % 12).toFixed(0) + "' )"}</p>
                <p className="pokemon-weight left">{"Weight " + props.data.pokemonData.weight / 10 + "kg ( " + (props.data.pokemonData.weight / 4.536).toFixed(1) + "lbs )"}</p>
                <div className="pokemon-type-container flex left">
                    <p className="pokemon-types">Types</p>
                    {props.data.pokemonData.types.map(type => {
                        return <img className="pokemon-type" src={TypeImageMap[type.type.name]} alt={type.type.name}></img>
                    })}
                </div>
                <div id="Ability-list" className="flex-col left">
                    <p className="pokemon-abilities">Abilities</p>
                    <div id="Ability-container" className="flex">
                        {props.data.pokemonData.abilities.map(ability => {
                            return (
                                <p className="pokemon-ability" style={{backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>{ability.ability.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <img className="pokemon-image" src={props.data.pokemonData.sprites.other["official-artwork"].front_default} alt=""></img>
            <div className="flex-col main-section">
                <div id="Stat-list" className="flex-col right">
                    {props.data.pokemonData.stats.map((stat, index) => {
                        return (
                            <div className="pokemon-stat flex">
                                <p className="stat-name">
                                    {statDictionary[index]}
                                </p>
                                <div className="stat-bar-wrapper">
                                    <div className="stat-bar flex" style={{width: stat.base_stat / 1.5 + "%", backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>
                                        <p className="stat-value">{stat.base_stat}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <p id="Pokemon-description" style={{backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>
            {props.data.speciesData.flavor_text}
        </p>
        <h2>Evolution Tree</h2>
        <div id="Evolution-chain">
            {/* {evolutions.map(evolution => {
                return <div>{evolution}</div>
            })} */}
        </div>
        <div id="Move-list" className="flex-col">
            {props.data.pokemonData.moves.map(move => {
                return (
                    <div style={{backgroundColor: TypeColorSchemes[props.data.pokemonData.types[0].type.name]}}>
                        <p>{move.move.name}</p>
                    </div>
                )
            })}
        </div>

        {props.data.name}
    </div>
    );
};

export default InspectPage;
