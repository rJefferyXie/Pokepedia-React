const express = require("express");
const router = express.Router();

const TeamShare = require("../../models/TeamShare");

// @route GET api/teams/all
// @desc Get the pokemon pokedex for id
// @access Public
router.get("/all", (req, res) => {
    TeamShare.find().sort({ "time": -1 }).exec((err, data) => {
        console.log(data)
        res.json(data);
    }) 
});

// @route POST api/teams/create
// @desc Create a new team
// @access Public
router.post("/create", (req, res) => {
    let newTeam = new TeamShare({
        username: req.body.username,
        region: req.body.region,
        team: req.body.team,
        tags: req.body.tags,
    });
    newTeam.save((err, res) => {
        if (err) { throw err }
    });
});

module.exports = router;