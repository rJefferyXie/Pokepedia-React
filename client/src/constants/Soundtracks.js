import kanto1 from "../soundtrack/kanto/Cerulean City.mp3";
import kanto2 from "../soundtrack/kanto/Hiwada Town.mp3";
import kanto3 from "../soundtrack/kanto/Pokémon Gym.mp3";
import kanto4 from "../soundtrack/kanto/Pokémon League.mp3";
import kanto5 from "../soundtrack/kanto/Route 1.mp3";
import kanto6 from "../soundtrack/kanto/Tanba City.mp3";
import kanto7 from "../soundtrack/kanto/Title.mp3";

import johto1 from "../soundtrack/johto/Enju City.mp3";
import johto2 from "../soundtrack/johto/New Bark Town.mp3";
import johto3 from "../soundtrack/johto/Hall Of Fame.mp3";
import johto4 from "../soundtrack/johto/Indigo Plateau.mp3";
import johto5 from "../soundtrack/johto/New Bark Town.mp3";
import johto6 from "../soundtrack/johto/Pokemon Center.mp3";
import johto7 from "../soundtrack/johto/Rocket Hideout.mp3";

import hoenn1 from "../soundtrack/hoenn/Kanazumi City.mp3";
import hoenn2 from "../soundtrack/hoenn/Minamo City.mp3";
import hoenn3 from "../soundtrack/hoenn/Mt. Chimney.mp3";
import hoenn4 from "../soundtrack/hoenn/Route 101.mp3";
import hoenn5 from "../soundtrack/hoenn/Route 110.mp3";
import hoenn6 from "../soundtrack/hoenn/Shidake Town.mp3";
import hoenn7 from "../soundtrack/hoenn/Touka City.mp3";

import sinnoh1 from "../soundtrack/sinnoh/Kotobuki City (Night).mp3";
import sinnoh2 from "../soundtrack/sinnoh/Kurogane City (Day).mp3";
import sinnoh3 from "../soundtrack/sinnoh/Lake.mp3";
import sinnoh4 from "../soundtrack/sinnoh/Nagisa City (Night).mp3";
import sinnoh5 from "../soundtrack/sinnoh/Route 201 (Day).mp3";
import sinnoh6 from "../soundtrack/sinnoh/Route 205 (Day).mp3";
import sinnoh7 from "../soundtrack/sinnoh/Route 206 (Night).mp3";

import unova1 from "../soundtrack/unova/Accumula Town.mp3";
import unova2 from "../soundtrack/unova/Castelia City.mp3";
import unova3 from "../soundtrack/unova/Nimbasa City.mp3";
import unova4 from "../soundtrack/unova/Route 19 (Spring & Summer).mp3";
import unova5 from "../soundtrack/unova/Skyarrow Bridge.mp3";
import unova6 from "../soundtrack/unova/Team Plasma Plots.mp3";
import unova7 from "../soundtrack/unova/The Pokémon League.mp3";

import kalos1 from "../soundtrack/kalos/Aquacorde Town.mp3";
import kalos2 from "../soundtrack/kalos/Cyllage City.mp3";
import kalos3 from "../soundtrack/kalos/Kalos.mp3";
import kalos4 from "../soundtrack/kalos/Parfum Palace.mp3";
import kalos5 from "../soundtrack/kalos/Route 1 - Vaniville Pathway.mp3";
import kalos6 from "../soundtrack/kalos/Santalune City.mp3";
import kalos7 from "../soundtrack/kalos/Victory Road.mp3";

import alola1 from "../soundtrack/alola/Festival Plaza (Day).mp3";
import alola2 from "../soundtrack/alola/Hau'oli City (Night).mp3";
import alola3 from "../soundtrack/alola/Heahea City (Day).mp3";
import alola4 from "../soundtrack/alola/Malie City (Day).mp3";
import alola5 from "../soundtrack/alola/Paniola Town (Day).mp3";
import alola6 from "../soundtrack/alola/Route 2 on Melemele Island.mp3";
import alola7 from "../soundtrack/alola/The Pokémon League.mp3";

const Soundtracks = {
    "kanto": {
        0: {name: "Cerulean City", file_path: kanto1},
        1: {name: "Hiwada Town", file_path: kanto2},
        2: {name: "Pokémon Gym", file_path: kanto3},
        3: {name: "Pokémon League", file_path: kanto4},
        4: {name: "Route 1", file_path: kanto5},
        5: {name: "Tanba City", file_path: kanto6},
        6: {name: "Title (HeartGold & SoulSilver)", file_path: kanto7}
    },
    "johto": {
        0: {name: "Enju City", file_path: johto1},
        1: {name: "Friendly Shop", file_path: johto2},
        2: {name: "Hall Of Fame", file_path: johto3},
        3: {name: "Indigo Plateau", file_path: johto4},
        4: {name: "New Bark Town", file_path: johto5},
        5: {name: "Pokemon Center", file_path: johto6},
        6: {name: "Rocket Hideout", file_path: johto7}
    },
    "hoenn": {
        0: {name: "Kanazumi City", file_path: hoenn1},
        1: {name: "Minamo City", file_path: hoenn2},
        2: {name: "Mt. Chimney", file_path: hoenn3},
        3: {name: "Route 101", file_path: hoenn4},
        4: {name: "Route 110", file_path: hoenn5},
        5: {name: "Shidake Town", file_path: hoenn6},
        6: {name: "Touka City", file_path: hoenn7}
    },
    "sinnoh": {
        0: {name: "Kotobuki City (Night)", file_path: sinnoh1},
        1: {name: "Kurogane City (Day)", file_path: sinnoh2},
        2: {name: "Lake", file_path: sinnoh3},
        3: {name: "Nagisa City (Night)", file_path: sinnoh4},
        4: {name: "Route 201 (Day)", file_path: sinnoh5},
        5: {name: "Route 205 (Day)", file_path: sinnoh6},
        6: {name: "Route 206 (Night)", file_path: sinnoh7}
    },
    "unova": {
        0: {name: "Accumula Town", file_path: unova1},
        1: {name: "Castelia City", file_path: unova2},
        2: {name: "Nimbasa City", file_path: unova3},
        3: {name: "Route 19 (Spring/Summer)", file_path: unova4},
        4: {name: "Skyarrow Bridge", file_path: unova5},
        5: {name: "Team Plasma Plots", file_path: unova6},
        6: {name: "The Pokémon League", file_path: unova7}
    },
    "kalos": {
        0: {name: "Aquacorde Town", file_path: kalos1},
        1: {name: "Cyllage City", file_path: kalos2},
        2: {name: "Kalos", file_path: kalos3},
        3: {name: "Parfum Palace", file_path: kalos4},
        4: {name: "Route 1 - Vaniville Pathway", file_path: kalos5},
        5: {name: "Santalune City", file_path: kalos6},
        6: {name: "Victory Road", file_path: kalos7}
    },
    "alola": {
        0: {name: "Festival Plaza (Day)", file_path: alola1},
        1: {name: "Hau'oli City (Night)", file_path: alola2},
        2: {name: "Heahea City (Day)", file_path: alola3},
        3: {name: "Malie City (Day)", file_path: alola4},
        4: {name: "Paniola Town (Day)", file_path: alola5},
        5: {name: "Route 2 on Melemele Island", file_path: alola6},
        6: {name: "The Pokémon League", file_path: alola7}
    }
}

export default Soundtracks;