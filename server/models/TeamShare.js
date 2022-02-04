const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamShareSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    team: {
        type: [], 
        required: true 
    },
    tags: {
        type: []
    },
    time : {
        type : Date, 
        default: Date.now }
    });

module.exports = TeamShare = mongoose.model("teamShare", TeamShareSchema);