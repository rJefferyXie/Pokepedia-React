import "./Hero.css";

import About from "../About/About";
import Regions from "../Regions/Regions";

import wallpaper from "../../images/wallpaper.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';


const Hero = () => {
  const dispatch = useDispatch()

  const scrollToRegions = () => {
      let section = document.querySelector("#Regions").offsetTop - 100;
      window.scroll({
          top: section,
          behavior: "smooth"
      });  
  }

  useEffect(() => {
    dispatch(allActions.loadActions.setLoaded(false));
    dispatch(allActions.teamActions.clearTeam());
    axios.get("/api/pokedex/start/").then(res => res.data);
  }, []);

  return (
    <section id="Hero" className="flex-col">
      <div id="Hero-wrapper" className="page-container flex">
        <div id="Left-hero-wrapper" className="flex-col">
          <h1 style={{margin: "auto", width: "100%", textAlign: "center"}}>Welcome to Poképedia!</h1>
          <p style={{margin: "0px auto 20px", width: "100%", textAlign: "center"}}>Revisit your favorite pokémon memories and adventures with us.</p>
          <div id="Hero-button-container" className="flex">
            <Button variant="contained" className="mui-button" onClick={() => scrollToRegions()} style={{width: "fit-content", margin: "0px 4px", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>Select a Region</Button>
            <Button variant="contained" className="mui-button" component={Link} to="/dashboard" style={{width: "fit-content", margin: "0px 4px", backgroundColor: "rgba(6, 114, 177, 0.8)"}}>View Dashboard</Button>
          </div>
        </div>
        <img alt="All eevee evolutions." src={wallpaper} id="Hero-wallpaper"></img>
      </div>
      <About></About>
      <Regions></Regions>
    </section>
  );
};

export default Hero;
