import "./Hero.css";

import About from "../About/About";
import Regions from "../Regions/Regions";

import wallpaper from "../../images/wallpaper.png";

const Hero = () => {
  return (
    <section id="Hero" className="flex-col">
      <div id="Hero-wrapper" className="page-container">
        <img alt="" src={wallpaper} id="Hero-wallpaper"></img>
        <p id="Hero-text">
            Welcome to Pokepedia!
            Revisit your favorite pokemon memories and adventures with us.
        </p>
      </div>
      <About></About>
      <Regions></Regions>
    </section>
  );
};

export default Hero;
