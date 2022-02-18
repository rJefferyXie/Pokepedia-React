import "./Hero.css";

import About from "../About/About";
import Regions from "../Regions/Regions";

import wallpaper from "../../images/wallpaper.png";

const Hero = () => {
  return (
    <section id="Hero" className="flex-col">
      <div id="Hero-wrapper" className="page-container flex-col">
        <h3 id="Hero-text">
            Welcome to Pokepedia!
            Revisit your favorite pokemon memories and adventures with us.
        </h3>
        <img alt="" src={wallpaper} id="Hero-wallpaper"></img>
      </div>
      <About></About>
      <Regions></Regions>
    </section>
  );
};

export default Hero;
