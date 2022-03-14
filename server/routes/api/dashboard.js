const express = require("express");
const router = express.Router();

const DashboardStats = require("../../models/DashboardStats");

// @route GET api/dashboard/summary
// @desc Get all dashboard stats
// @access Public
router.get("/stats", (req, res) => {
    DashboardStats.find({}, (err, data) => {
        res.json(data);
        console.log(data);
    });
});

// @route POST api/dashboard/stats
// @desc Update dashboard entries
// @access Public
router.post("/stats", (req, res) => {
    DashboardStats.findOne({}, (err, data) => {
        let users = data.users;
        let regions = data.regions;
        let pokemon = data.pokemon;
        let types = data.types;

        // updating users
        if (users.hasOwnProperty(req.body.username)) {
            users[req.body.username] += 1;
        } else {
            users[req.body.username] = 1;
        }

        // updating regions
        if (users.hasOwnProperty(req.body.region)) {
            regions[req.body.region] += 1;
        } else {
            regions[req.body.region] = 1;
        }

        for (var i = 0; i < req.body.team.length; i++) {
            let pkmn = req.body.team[i].pokemonData;

            // updating pokemon
            if (pokemon.hasOwnProperty(pkmn.name)) {
                pokemon[pkmn.name] += 1;
            } else {
                pokemon[pkmn.name] = 1;
            }

            // updating types
            for (var j = 0; j < pkmn.types.length; j++) {
                if (types.hasOwnProperty(pkmn.types[j]["type"]["name"])) {
                    types[pkmn.types[j]["type"]["name"]] += 1;
                } else {
                    types[pkmn.types[j]["type"]["name"]] = 1;
                }
            }
        }

        DashboardStats.findOneAndUpdate({}, {
            $set: {
                "users": users, 
                "regions": regions, 
                "pokemon": pokemon, 
                "types": types}
            }, (err, succ) => {
            if (err) throw err;
        });
    });
});

module.exports = router;