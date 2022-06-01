import "./InspectPage.css";

// React and Axios
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Move from "../../components/Move/Move";

// Constants
import TypeColorSchemes from "../../constants/TypeColorSchemes";
import TypeImageMap from "../../constants/TypeImageMap";
import StatDictionary from "../../constants/StatDictionary";

// Icons
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InspectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pokemonData, speciesData, pokedexIndex } = location.state;
    const theme = TypeColorSchemes[pokemonData.types[0].type.name];

    const [evolutionData, setEvolutionData] = useState([]);
    const [moveData, setMoveData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById("Navbar").style.backgroundColor = theme;
        getEvolutionChain();
        getMoves();
    }, []);

    
    const previousPage = () => {
        document.getElementById("Navbar").style.backgroundColor = "rgba(6, 114, 177, 0.8)";
        navigate(-1);
    }

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

    const getChainInfo = async (chain, chainInfo) => {
        for (const [key, value] of Object.entries(chainInfo.evolution_details[0])) {
            if (value) {
                if (key === "trigger") {
                    chain["trigger"] = value.name;
                } 
                else if (key === "item") {
                    const itemURL = await getItemImage(value.url);
                    chain["item-image"] = itemURL;
                    chain["item-name"] = value.name;
                }
                else {
                    chain[key] = value;
                }
            }
        }
        chain["arrow"] = <FontAwesomeIcon icon={faArrowRight} alt="" className="evo-arrow"></FontAwesomeIcon>
        return chain;
    }

    const getEvolutionChain = () => {
        axios.get(speciesData['evolution_chain']['url'])
        .then(response => response.data)
        .then(async (evolutionJSON) => {
            const data = [];
            const evolutionChain = evolutionJSON.chain;
            data.push(await getPokeContainer(evolutionChain));

            for (var i = 0; i < evolutionChain.evolves_to.length; i++) {
                const newChain = evolutionChain.evolves_to[i];
                if (newChain !== undefined) {
                    const currentChain = await getChainInfo({}, newChain);
                    data.push(currentChain);
                    data.push(await getPokeContainer(newChain));
                }

                for (var j = 0; j < newChain.evolves_to.length; j++) {
                    const babyChain = newChain.evolves_to[j];
                    if (babyChain !== undefined) {
                        const fullChain = await getChainInfo({}, babyChain);
                        data.push(fullChain);
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
          }));
        }
        return Promise.all(promiseArray);
    }
    
    const getItemImage = async (data_url) => {
        return axios.get(data_url)
        .then(response => response.data['sprites']['default']);
    }

    return (
    <section id="Inspect-page" className="flex">
        <div id="Inspect-container" className="page-container flex-col">
            <button className="return-button pokemon-button flex" onClick={() => previousPage()} style={{backgroundColor: theme}}>
                <FontAwesomeIcon icon={faArrowLeft} style={{margin: "auto"}}></FontAwesomeIcon>
            </button>
            <h2 id="Pokemon-name">{pokemonData.name}</h2>
            <p className="pokemon-genera" style={{backgroundColor: theme}}>{speciesData.genus}</p>
            <div id="Pokemon-main" className="flex">
                <div id="Main-left" className="flex-col main-section">
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
                <div id="Main-right" className="flex-col main-section">
                    <div id="Stat-list" className="flex-col right">
                        <h2 id="Stats-name">Pokemon Stats</h2>
                        {pokemonData.stats.map((stat, index) => {
                            return (
                                <div className="pokemon-stat flex" key={index}>
                                    <p className="stat-name">
                                        {StatDictionary[index]}
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
                        switch (key) {
                            case "image": return <img className="pokemon-image-evolution" src={value} alt="" key={index}></img>;
                            case "item-name": return <p key={index}>{"Use " + value}</p>
                            case "item-image": return <img className="pokemon-item" src={value} alt="" key={index}></img>
                            case "name": return <p className="pokemon-genera" style={{backgroundColor: TypeColorSchemes[evolution["type"]]}} key={index}>{value}</p>
                            case "min_affection": return <p key={index}>{"Level up with " + value + "+ Affection"}</p>
                            case "min_happiness": return <p key={index}>{"Level up with " + value + "+ Happiness"}</p>
                            case "min_beauty": return <p key={index}>{"Level up with " + value + "+ Beauty"}</p>
                            case "min_level": return <p key={index}>{"Level up (" + value + "+)"}</p>
                            case "known_move": return <p key={index}>{"Level up knowing " + value.name}</p>
                            case "time_of_day": return <p key={index}>{"Evolves at " + value}</p>
                            case "held_item": return <p key={index}>{"Holding " + value.name}</p>
                            case "location": return <p key={index}>{"Level up at: " + value.name}</p> 
                            case "party_species": return <p key={index}>{"Level up with " + value.name + " in party."}</p>
                            case "arrow": return <p key={index}>{value}</p>
                            case "gender": return value === 2 ?
                                <p>{"Gender: "}<span style={{color: "#01A6EA"}} key={index}>Male</span></p> : 
                                <p>{"Gender: "}<span style={{color: "#FFB1CB"}} key={index}>Female</span></p>
                            case "trigger": case "type": return value === "trade" ? <p key={index}>{"Trade"}</p> : false;
                            default: return false;
                        }
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
                    const level = pokemonData['moves'][index]['version_group_details']['level_learned_at'];
                    const method = pokemonData['moves'][index]['version_group_details']['move_learn_method']['name'];
                    return (
                        <Move move={move} level={level} method={method} color={theme} key={index}></Move>
                    )}
                )}
                </tbody>
                <tfoot style={{backgroundColor: theme}}></tfoot>
            </table>
        </div>
    </section>
    );
};

export default InspectPage;
