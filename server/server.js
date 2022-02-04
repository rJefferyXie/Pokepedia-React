require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const pokedex = require("./routes/api/pokedex.js");
const teams = require("./routes/api/teamforum.js");

const db = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Mongoose connected to the server."))
  .catch(err => console.log(err))

app.use("/api/pokedex", pokedex);
app.use("/api/teams", teams);

app.listen(port, () => console.log(`Server is running on port: ${port}`));