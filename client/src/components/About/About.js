import "./About.css";

import lookup from "../../images/undraw/lookup.svg";
import teambuilder from "../../images/undraw/teambuilder.svg";

const About = () => {
  return (        
    <section id="About" className="flex-col">
        <div className="flex-col">
            <div className="flex about-wrapper">
                <img alt="" src={lookup} className="about-image"></img>
                <div className="flex-col about-info">
                    <h2>Pokemon Lookup</h2>
                    <p>
                        With our pokedex containing every pokemon from your selected region, you can find information on any pokemon. 
                        Learn about each pokemon's characteristics, stats, moveset, and evolution chain with ease.
                    </p>
                </div>
            </div>
            <div id="About-wrapper-2" className="flex about-wrapper">
                <div className="flex-col about-info">
                    <h2>Team Generation</h2>
                    <p>
                        Automatically generate a full team, or choose your favorites and let the generator do the rest. 
                        Customize your team with options such as banning legendary pokemon, duplicate pokemon types, and more.
                    </p>
                </div>
                <img alt="" src={teambuilder} className="about-image"></img>
            </div>
        </div>
    </section>
  );
};

export default About;
