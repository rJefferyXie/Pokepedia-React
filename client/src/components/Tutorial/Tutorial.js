import './Tutorial.css';

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import pokedex1 from "../../images/tutorial/pokedex1.png";
import inspect1 from "../../images/tutorial/inspect1.png";
import team1 from "../../images/tutorial/team1.png";

import { useState } from 'react';

const Tutorial = ({ onClickAway }) => {
    const [selected, setSelected] = useState(0);

    const Pokedex = () => {
        return (
            <div className="tut-section flex">
                <p className="tut-desc">Click on the <FontAwesomeIcon icon={faPlus} onClick={() => setSelected(2)} style={{cursor: "pointer"}}></FontAwesomeIcon> to add the pokémon to your team.</p>
                <img className="tut-image" src={pokedex1} alt=""></img>
                <p className="tut-desc">Click on the <FontAwesomeIcon icon={faSearch} onClick={() => setSelected(1)} style={{cursor: "pointer"}}></FontAwesomeIcon> to learn more about the pokémon.</p>
            </div>
        )
    }

    const Teams = () => {
        return (
            <div className="tut-section flex-col">
                <img className="tut-image" src={team1} alt=""></img>
                <p className="tut-desc" style={{width: "100%"}}>Click CLEAR TEAM to reset your team.</p>
                <p className="tut-desc" style={{width: "100%"}}>Click GENERATE to create a new team.</p>
                <p className="tut-desc" style={{width: "100%"}}>Click SHARE TEAM to share your team.</p>
            </div>
        )
    }

    const Inspect = () => {
        return (
            <div className="tut-section flex-col">
                <img className="tut-image" src={inspect1} alt=""></img>
                <p className="tut-desc" style={{width: "95%"}}>In the inspect screen you can learn about the pokemon's stats, abilities, moves, and evolution chain.</p>
            </div>
        )
    }

    return (
        <div className="overlay">
            <ClickAwayListener onClickAway={() => onClickAway()}>
                <Card id="Tutorial-page" className="flex-col" variant="contained">
                    {selected === 0 ? Pokedex() : selected === 1 ? Inspect() : Teams()}
                    <div className="flex" style={{width: "100%", position: "absolute", bottom: "0px"}}>
                        <Button className="mui-button tut-button" variant="contained" onClick={() => setSelected(0)} style={selected === 0 ? {borderRadius: "0px", backgroundColor: "rgba(32, 138, 199, 0.8)"} : {borderRadius: "0px", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Pokedex</Button>
                        <Button className="mui-button tut-button" variant="contained" onClick={() => setSelected(1)} style={selected === 1 ? {borderRadius: "0px", backgroundColor: "rgba(32, 138, 199, 0.8)"} : {borderRadius: "0px", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Inspect</Button>
                        <Button className="mui-button tut-button" variant="contained" onClick={() => setSelected(2)} style={selected === 2 ? {borderRadius: "0px", backgroundColor: "rgba(32, 138, 199, 0.8)"} : {borderRadius: "0px", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Teams</Button>
                    </div>
                </Card>
            </ClickAwayListener>
        </div>
    )
}

export default Tutorial;