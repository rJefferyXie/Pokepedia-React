import "./Dashboard.css";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '@mui/material/Pagination';

import PokemonCard from "../PokemonCard/PokemonCard";

import { Button, Card } from "@mui/material";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/api/teams/all").then(response => setPosts(response.data));
    }, []);

  return (
    <section id="Dashboard-container" className="flex">
      <div id="Dashboard-left" className="flex">
        <Card variant="outlined" style={{width: "200px", height: "120px", margin: "4px", textAlign: "center"}}>
          <p style={{fontSize: "initial"}}>Teams Shared All Time</p>
          <p>{posts.length}</p>
        </Card>
        <Card variant="outlined" style={{width: "200px", height: "120px", margin: "4px", textAlign: "center"}}>Most Teams Shared</Card>
        <Card variant="outlined" style={{width: "200px", height: "120px", margin: "4px", textAlign: "center"}}>Most Popular Region</Card>
        <Card variant="outlined" style={{width: "200px", height: "120px", margin: "4px", textAlign: "center"}}>Most Popular Pokemon</Card>
      </div>
      <div id="Dashboard-right" className="flex-col">
        <div id="Region-filter" className="flex">
          <Button variant="contained" color="info" style={{margin: "4px"}}>Kanto</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Johto</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Hoenn</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Sinnoh</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Kalos</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Unova</Button>
          <Button variant="contained" color="info" style={{margin: "4px"}}>Alola</Button>
        </div>
        <div id="Posts" className="flex">
          {posts.map((post, index) => {
          return <div className="team-post flex-col" key={index}>
            <div className="team-titles flex">
              <h3>{post.username}</h3>
              <h3 style={{textTransform: "capitalize"}}>{post.region}</h3>
            </div>
            <div className="ds-team-wrapper flex">
              {post.team.map((pokemon, teamIndex) => {
                return <PokemonCard pokemonData={pokemon.pokemonData} speciesData={pokemon.speciesData} dashboard={true} key={teamIndex}></PokemonCard>
              })}
            </div>
            <div className="team-tags flex">
              Tags: 
              {post.tags.map((tag, tagIndex) => {
                return <p className="team-tag" key={tagIndex}>{tag}</p>
              })}
            </div>
          </div>
          })}
        </div>
        <Pagination count={10} variant="outlined" color="primary" style={{margin: "4px auto"}}></Pagination>
      </div>
    </section>
  );
};

export default Dashboard;
