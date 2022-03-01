import "./Hero.css";

import About from "../About/About";
import Regions from "../Regions/Regions";

import wallpaper from "../../images/wallpaper.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToRegions = () => {
      let section = document.querySelector("#Regions").offsetTop - 100;
      window.scroll({
          top: section,
          behavior: "smooth"
      });  
  }

  return (
    <section id="Hero" className="flex-col">
      <div id="Hero-wrapper" className="page-container flex-col">
        <h3 id="Hero-text">
            Welcome to Pokepedia!
            Revisit your favorite pokemon memories and adventures with us.
        </h3>
        <img alt="" src={wallpaper} id="Hero-wallpaper"></img>
        <div id="Hero-button-container" className="flex">
          <Button variant="contained" onClick={() => scrollToRegions()} style={{width: "fit-content", margin: "0px 4px"}}>Select a Region</Button>
          <Button variant="contained" component={Link} to="/dashboard" style={{width: "fit-content", margin: "0px 4px"}}>View Dashboard</Button>
        </div>
      </div>
      <About></About>
      <Regions></Regions>
    </section>
  );
};

export default Hero;
