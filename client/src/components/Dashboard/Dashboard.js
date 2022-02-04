import "./Dashboard.css";

import React, { useEffect, useState } from 'react';
import axios from "axios";

import PokemonCard from "../PokemonCard/PokemonCard";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/api/teams/all").then(response => setPosts(response.data));
    }, []);

  return (
    <section id="Dashboard-container" className="flex">
      {posts.map((post, index) => {
      return <div className="team-post flex-col" key={index}>
        <div className="team-titles flex">
          <h3>{post.username}</h3>
          <h3 style={{textTransform: "capitalize"}}>{post.region}</h3>
        </div>
        <div className="team-wrapper flex">
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
    </section>
  );
};

export default Dashboard;
