import "./Regions.css";

import { Link } from "react-router-dom";

// Kanto
import venusaur from "../../images/kanto/venusaur.png";
import charizard from "../../images/kanto/charizard.png";
import blastoise from "../../images/kanto/blastoise.png";
import articuno from "../../images/kanto/articuno.png";
import zapdos from "../../images/kanto/zapdos.png";
import moltres from "../../images/kanto/moltres.png";
import kanto from "../../images/kanto/kanto.png";

// Johto
import meganium from "../../images/johto/meganium.png";
import typhlosion from "../../images/johto/typhlosion.png";
import feraligatr from "../../images/johto/feraligatr.png";
import hooh from "../../images/johto/ho-oh.png";
import lugia from "../../images/johto/lugia.png";
import celibi from "../../images/johto/celibi.png";
import johto from "../../images/johto/johto.png";

// Hoenn
import sceptile from "../../images/hoenn/sceptile.png";
import blaziken from "../../images/hoenn/blaziken.png";
import swampert from "../../images/hoenn/swampert.png";
import groudon from "../../images/hoenn/groudon.png";
import kyogre from "../../images/hoenn/kyogre.png";
import rayquaza from "../../images/hoenn/rayquaza.png";
import hoenn from "../../images/hoenn/hoenn.png";

// Sinnoh
import torterra from "../../images/sinnoh/torterra.png";
import infernape from "../../images/sinnoh/infernape.png";
import empoleon from "../../images/sinnoh/empoleon.png";
import dialga from "../../images/sinnoh/dialga.png";
import palkia from "../../images/sinnoh/palkia.png";
import giratina from "../../images/sinnoh/giratina.png";
import sinnoh from "../../images/sinnoh/sinnoh.png";

// Unova
import serperior from "../../images/unova/serperior.png";
import emboar from "../../images/unova/emboar.png";
import samurott from "../../images/unova/samurott.png";
import reshiram from "../../images/unova/reshiram.png";
import zekrom from "../../images/unova/zekrom.png";
import kyurem from "../../images/unova/kyurem.png";
import unova from "../../images/unova/unova.png";

// Kalos
import chesnaught from "../../images/kalos/chesnaught.png";
import delphox from "../../images/kalos/delphox.png";
import greninja from "../../images/kalos/greninja.png";
import xerneas from "../../images/kalos/xerneas.png";
import yveltal from "../../images/kalos/yveltal.png";
import zygarde from "../../images/kalos/zygarde.png";
import kalos from "../../images/kalos/kalos.png";

// Alola
import decidueye from "../../images/alola/decidueye.png";
import incineroar from "../../images/alola/incineroar.png";
import primarina from "../../images/alola/primarina.png";
import lunala from "../../images/alola/lunala.png";
import solgaleo from "../../images/alola/solgaleo.png";
import necrozma from "../../images/alola/necrozma.png";
import alola from "../../images/alola/alola.png";

const Regions = () => {
  return (
    <section id="Regions" className="flex">
        <Link to="/pokedex/kanto" state={{ region_number: '2', region_name: "kanto" }} id="Kanto" className="region-container flex-col">
            <h1 className="region-name">KANTO</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={kanto} className="region-wallpaper" style={{objectPosition: "left"}}></img>
            <img alt="" src={venusaur} className="region-image i1"></img>
            <img alt="" src={charizard} className="region-image i2"></img>
            <img alt="" src={blastoise} className="region-image i3"></img>
            <img alt="" src={articuno} className="region-image i4"></img>
            <img alt="" src={zapdos} className="region-image i5"></img>
            <img alt="" src={moltres} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/johto" state={{ region_number: '7', region_name: "johto" }} id="Johto" className="region-container flex-col">
            <h1 className="region-name">JOHTO</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={johto} className="region-wallpaper"></img>
            <img alt="" src={meganium} className="region-image i1"></img>
            <img alt="" src={typhlosion} className="region-image i2"></img>
            <img alt="" src={feraligatr} className="region-image i3"></img>
            <img alt="" src={hooh} className="region-image i4"></img>
            <img alt="" src={lugia} className="region-image i5"></img>
            <img alt="" src={celibi} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/hoenn" state={{ region_number: '4', region_name: "hoenn" }} id="Hoenn" className="region-container flex-col">
            <h1 className="region-name">HOENN</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={hoenn} className="region-wallpaper"></img>
            <img alt="" src={sceptile} className="region-image i1"></img>
            <img alt="" src={blaziken} className="region-image i2"></img>
            <img alt="" src={swampert} className="region-image i3"></img>
            <img alt="" src={groudon} className="region-image i4"></img>
            <img alt="" src={kyogre} className="region-image i5"></img>
            <img alt="" src={rayquaza} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/sinnoh" state={{ region_number: '6', region_name: "sinnoh" }} id="Sinnoh" className="region-container flex-col">
            <h1 className="region-name">SINNOH</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={sinnoh} className="region-wallpaper" style={{objectPosition: "right"}}></img>
            <img alt="" src={torterra} className="region-image i1"></img>
            <img alt="" src={infernape} className="region-image i2"></img>
            <img alt="" src={empoleon} className="region-image i3"></img>
            <img alt="" src={dialga} className="region-image i4"></img>
            <img alt="" src={palkia} className="region-image i5"></img>
            <img alt="" src={giratina} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/unova" state={{ region_number: '9', region_name: "unova" }} id="Unova" className="region-container flex-col">
            <h1 className="region-name">UNOVA</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={unova} className="region-wallpaper"></img>
            <img alt="" src={serperior} className="region-image i1"></img>
            <img alt="" src={emboar} className="region-image i2"></img>
            <img alt="" src={samurott} className="region-image i3"></img>
            <img alt="" src={reshiram} className="region-image i4"></img>
            <img alt="" src={zekrom} className="region-image i5"></img>
            <img alt="" src={kyurem} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/kalos" state={{ region_number: '14', region_name: "kalos" }} id="Kalos" className="region-container flex-col">
            <h1 className="region-name">KALOS</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={kalos} className="region-wallpaper"></img>
            <img alt="" src={chesnaught} className="region-image i1"></img>
            <img alt="" src={delphox} className="region-image i2"></img>
            <img alt="" src={greninja} className="region-image i3"></img>
            <img alt="" src={xerneas} className="region-image i4"></img>
            <img alt="" src={yveltal} className="region-image i5"></img>
            <img alt="" src={zygarde} className="region-image i6"></img>
        </Link>
        <Link to="/pokedex/alola" state={{ region_number: '16', region_name: "alola" }} id="Alola" className="region-container flex-col">
            <h1 className="region-name">ALOLA</h1>
            <h1 className="region-name-hover">VISIT</h1>
            <img alt="" src={alola} className="region-wallpaper"></img>
            <img alt="" src={decidueye} className="region-image i1"></img>
            <img alt="" src={incineroar} className="region-image i2"></img>
            <img alt="" src={primarina} className="region-image i3"></img>
            <img alt="" src={lunala} className="region-image i4"></img>
            <img alt="" src={solgaleo} className="region-image i5"></img>
            <img alt="" src={necrozma} className="region-image i6"></img>
        </Link>
    </section>
  );
};

export default Regions;
