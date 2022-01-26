import "./InspectPage.css";
import TypeColorSchemes from "../Constants/TypeColorSchemes";
import TypeImageMap from "../Constants/TypeImageMap";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Move from "../../components/Move/Move";

import React, { useEffect, useState } from "react";
import axios from "axios";

const InspectPage = ({pokemonData, speciesData, pokedexIndex, customStyle, exit}) => {
    const theme = TypeColorSchemes[pokemonData.types[0].type.name];
    document.getElementById("Navbar").style.backgroundColor = theme;

    const statDictionary = {
        0: "HP",
        1: "Attack",
        2: "Defense",
        3: "Sp. Attack",
        4: "Sp. Defense",
        5: "Speed"
    };

    const [evolutionData, setEvolutionData] = useState([]);
    const [moveData, setMoveData] = useState([]);
    // const [loadedMoves, setLoadedMoves] = useState(false);

    const getPokeContainer = async (evolutionChain) => {
        return axios.get(evolutionChain.species.url.replace("-species", ""))
        .then(response => response.data)
        .then(info => {
            return {
                "name": info.name,
                "image": info.sprites.other["official-artwork"].front_default,
                "type": info.types[0].type.name
            };
        });
    }

    const getEvolutionChain = () => {
        axios.get(speciesData['evolution_chain']['url'])
        .then(response => response.data)
        .then(async (evolutionJSON) => {
            var evolutionChain = evolutionJSON.chain;
            const data = [];
            data.push(await getPokeContainer(evolutionChain));
            for (var i = 0; i < evolutionChain.evolves_to.length; i++) {
                var newChain = evolutionChain.evolves_to[i];

                var currentChain = {};
                if (newChain !== undefined) {
                    for (const [key, value] of Object.entries(newChain.evolution_details[0])) {
                        if (value) {
                            if (key === "trigger") {
                                currentChain["trigger"] = value.name;
                            } 
                            else if (key === "item") {
                                const itemURL = await getItemImage(value.url);
                                currentChain["item-image"] = itemURL;
                                currentChain["item-name"] = value.name;
                            }
                            else {
                                currentChain[key] = value;
                            }
                        }
                    }
                    currentChain["arrow"] = <FontAwesomeIcon icon={faArrowRight} alt=""></FontAwesomeIcon>
                    data.push(currentChain);
                    data.push(await getPokeContainer(newChain));
                }

                for (var j = 0; j < newChain.evolves_to.length; j++) {
                    var babyChain = newChain.evolves_to[j];  // will ned to fix for eevee gallade
                    currentChain = {};
                    if (babyChain !== undefined) {
                        for (const [key, value] of Object.entries(babyChain.evolution_details[0])) {
                            if (value) {
                                if (key === "trigger") {
                                    currentChain["trigger"] = value.name;
                                } 
                                else if (key === "item") {
                                    const itemURL = await getItemImage(value.url);
                                    currentChain["item-image"] = itemURL;
                                    currentChain["item-name"] = value.name;
                                }
                                else {
                                    currentChain[key] = value;
                                }
                            }
                        }
                        currentChain["arrow"] = <FontAwesomeIcon icon={faArrowRight} alt=""></FontAwesomeIcon>
                        data.push(currentChain);
                        data.push(await getPokeContainer(babyChain));
                    }
                }
            }
            setEvolutionData(data);
        });
    }

    const getMoves = async () => {
        const moveData = await getMovePromiseArray(pokemonData.moves);
        setMoveData(moveData);
    }

    const getMovePromiseArray = async (data) => {
        let promiseArray = [];
        for (var i = 0; i < data.length; i++) {
          promiseArray.push(axios.get(data[i]['move']['url']).then((response) => {
            return response.data;
          }))
        }
        return Promise.all(promiseArray);
      }

    useEffect(() => {
        getEvolutionChain();
        getMoves();
    }, []);

    useEffect(() => {
    }, [evolutionData])
    
    async function getItemImage(data_url) {
        return axios.get(data_url)
        .then(response => response.data['sprites']['default'])
    }

    return (
    <section id="Inspect-page">
        <button className="return-button pokemon-button flex" onClick={() => exit()} style={{backgroundColor: theme}}>
            <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
        </button>
        <h2 id="Pokemon-name">{pokemonData.name}</h2>
        <p className="pokemon-genera" style={{backgroundColor: theme}}>{speciesData.genus}</p>
        <div id="Pokemon-main" className="flex">
            <div className="flex-col main-section">
                <p className="pokemon-index left">{"Pokedex Entry #" + pokedexIndex}</p>
                <p className="pokemon-height left">{"Height " + pokemonData.height * 10 + "cm (" + (pokemonData.height / 2.54 / 12).toFixed(1) + "ft. "  + (pokemonData.height / 2.54 % 12).toFixed(1) + 'in.)'}</p>
                <p className="pokemon-weight left">{"Weight " + pokemonData.weight / 10 + "kg (" + (pokemonData.weight / 4.536).toFixed(1) + "lbs)"}</p>
                <div className="pokemon-type-container flex left">
                    <p className="pokemon-types">Types</p>
                    {pokemonData.types.map((type, index) => {
                        return <img className="pokemon-type" src={TypeImageMap[type.type.name]} alt={type.type.name} key={index}></img>
                    })}
                </div>
                <div id="Ability-list" className="flex-col left">
                    <p className="pokemon-abilities">Abilities</p>
                    <div id="Ability-container" className="flex">
                        {pokemonData.abilities.map((ability, index) => {
                            return (
                                <p className="pokemon-ability" style={{backgroundColor: theme}} key={index}>{ability.ability.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <img className="pokemon-image" src={pokemonData.sprites.other["official-artwork"].front_default} alt=""></img>
            <div className="flex-col main-section">
                <div id="Stat-list" className="flex-col right">
                    <h2 id="Stats-name">Pokemon Stats</h2>
                    {pokemonData.stats.map((stat, index) => {
                        return (
                            <div className="pokemon-stat flex" key={index}>
                                <p className="stat-name">
                                    {statDictionary[index]}
                                </p>
                                <div className="stat-bar-wrapper">
                                    <div className="stat-bar flex" style={{width: stat.base_stat / 1.5 + "%", backgroundColor: theme}}>
                                        <p className="stat-value">{stat.base_stat}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <p id="Pokemon-description">
            {speciesData.flavor_text}
        </p>
        <h2 id="Evolution-header" style={{backgroundColor: theme}}>Evolution Tree</h2>
        <div id="Evolution-chain" className="flex">
            {evolutionData.map((evolution, index) => {
                const evolutionCondition = Object.entries(evolution).map(([key, value], index) => {
                    if (key === "type" || value === "level-up" || value === "use-item" || key ==="known_move_type") { return false; }
                    if (key === "image") { return <img className="pokemon-image-evolution" src={value} alt="" key={index}></img> }
                    if (key === "item-name") { return <p key={index}>{"Use " + value}</p> }
                    if (key === "item-image") { return <img className="pokemon-item" src={value} alt="" key={index}></img> }
                    if (key === "name") { return <p className="pokemon-genera" style={{backgroundColor: TypeColorSchemes[evolution["type"]]}} key={index}>{value}</p> }
                    if (key === "min_affection") { return <p key={index}>{"Level up with " + value + "+ Affection"}</p> }
                    if (key === "min_happiness") { return <p key={index}>{"Level up with " + value + "+ Happiness"}</p> }
                    if (key === "min_beauty") { return <p key={index}>{"Level up with " + value + "+ Beauty"}</p> }
                    if (key === "min_level") { return <p key={index}>{"Level up (" + value + "+)"}</p> }
                    if (key === "known_move") { return <p key={index}>{"Level up knowing " + value.name}</p> }
                    if (key === "time_of_day") { return <p key={index}>{"Evolves at " + value}</p> }
                    if (key === "gender") {
                        if (value === 2) { return <p>{"Gender: "}<span style={{color: "#01A6EA"}} key={index}>Male</span></p> }
                        else { return <p>{"Gender: "}<span style={{color: "#FFB1CB"}} key={index}>Female</span></p> }
                    }
                    if (key === "held_item") {
                        return (
                            <div className="pokemon-item-container flex-col" key={index}>
                                {/* <img src={value.url} alt=""></img> */}
                                <p>{"Holding " + value.name}</p>
                            </div>
                        )
                    }
                    if (key === "location") { return <p key={index}>{"Level up at: " + value.name}</p> }
                    return <p className="evolution-condition" key={index}>{value}</p>
                  });
                return <div className="flex-col evolution-condition" key={index}>{evolutionCondition}</div>;
            })}
        </div>
        <h2 id="Move-header" style={{backgroundColor: theme}}>Moveset</h2>
        <table id="Move-table">
            <thead style={{backgroundColor: theme}}>
            <tr className="th-level">
                <th>Level</th>
                <th>Move</th>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>PP</th>
                <th>Accuracy</th>
                <th>Method</th>
            </tr>
            </thead>
            <tbody>
            {moveData.map((move, index) => {
                return (
                    <Move move={move} level={pokemonData['moves'][index]['version_group_details']['level_learned_at']} method={pokemonData['moves'][index]['version_group_details']['move_learn_method']['name']} color={theme} key={index}></Move>
                )}
            )}
            </tbody>
            <tfoot style={{backgroundColor: theme}}></tfoot>
        </table>
        <div id="Spacer">

        </div>
    </section>
    );
};

export default InspectPage;
