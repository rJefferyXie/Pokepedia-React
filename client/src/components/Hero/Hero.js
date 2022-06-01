import "./Hero.css";

// Components
import About from "../About/About";
import Regions from "../Regions/Regions";

// MUI and Images
import wallpaper from "../../images/wallpaper.png";
import { Button } from "@mui/material";

// Redux and React
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
          <h1 className="hero-text">Welcome to Poképedia!</h1>
          <p className="hero-text">Revisit your favorite pokémon memories and adventures with us.</p>
          <div id="Hero-button-container" className="flex">
            <Button variant="contained" className="mui-button-hero" onClick={() => scrollToRegions()}>Select a Region</Button>
            <Button variant="contained" className="mui-button-hero" component={Link} to="/dashboard">View Dashboard</Button>
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
