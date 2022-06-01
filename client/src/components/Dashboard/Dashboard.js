import "./Dashboard.css";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '@mui/material/Pagination';

import PokemonCard from "../PokemonCard/PokemonCard";

import Loading from "../Loading/Loading";

import { Card } from "@mui/material";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [postsToday, setPostsToday] = useState(0);
    const [stats, setStats] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const [topUser, setTopUser] = useState("");
    const [topRegion, setTopRegion] = useState("");
    const [topPokemon, setTopPokemon] = useState("");
    const [topType, setTopType] = useState("");

    const handlePageChange = (event, value) => {
      setPageNumber(value);
    }

    const getPostsToday = (date, day, month, year) => {
      let postDay = date.getDate();
      let postMonth = date.getMonth();
      let postYear = date.getFullYear();

      if (day === postDay && month === postMonth && year === postYear) {
        setPostsToday(postsToday => postsToday + 1);
      }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/api/teams/all").then(response => setPosts(response.data));
        axios.get("/api/dashboard/stats").then(response => setStats(response.data[0]));
    }, []);

    useEffect(() => {
      if (posts.length === 0) return;

      let start = new Date();
      let day = start.getDate();
      let month = start.getMonth();
      let year = start.getFullYear();

      for (var i = 0; i < posts.length; i++) { 
        getPostsToday(new Date(posts[i]["time"]), day, month, year); 
      }
      
    }, [posts]);

    useEffect(() => {
      if (stats.length === 0) return;
      setTopUser(Object.keys(stats.users).reduce((a, b) => stats.users[a] > stats.users[b] ? a : b));
      setTopRegion(Object.keys(stats.regions).reduce((a, b) => stats.regions[a] > stats.regions[b] ? a : b));
      setTopPokemon(Object.keys(stats.pokemon).reduce((a, b) => stats.pokemon[a] > stats.pokemon[b] ? a : b));
      setTopType(Object.keys(stats.types).reduce((a, b) => stats.types[a] > stats.types[b] ? a : b));
    }, [stats])

  return (
    <section id="Dashboard-container" className="flex-col">
      {posts.length ? null : <Loading></Loading>}
      <div id="Dashboard-left" className="flex">
        <Card id="Dashboard-intro" variant="outlined" className="flex-col">
          <h1 className="card-header">Dashboard</h1>
          <p className="card-intro-text">Welcome to the community dashboard! In the dashboard you can take a look at teams that other users have created.</p>
        </Card>

        <div id="Dashboard-stats" className="flex">
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Total Teams Shared</h2>
            <strong className="card-text">{posts.length}</strong>
          </Card>
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Teams Shared Today</h2>
            <strong className="card-text">{postsToday}</strong>
          </Card>
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Most Teams Shared</h2>
            <strong className="card-text">{topUser}</strong>
          </Card>
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Most Popular Region</h2>
            <strong className="card-text">{topRegion}</strong>
          </Card>
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Most Popular Pokemon</h2>
            <strong className="card-text">{topPokemon}</strong>
          </Card>
          <Card variant="outlined" className="flex-col fun-stat">
            <h2 className="card-header">Most Popular Type</h2>
            <strong className="card-text">{topType}</strong>
          </Card>
        </div>
      </div>
      <div id="Dashboard-right" className="flex-col">
        <div id="Posts" className="flex">
          {posts.filter((_, index) => ((pageNumber - 1) * 8) <= index && index < (pageNumber * 8)).map((post, index) => {
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
              Tags: {post.tags.map((tag, tagIndex) => {
                return <p className="team-tag" key={tagIndex}>{tag}</p>
              })}
            </div>
          </div>
          })}
        </div>
        <Pagination onChange={handlePageChange} count={Math.ceil(posts.length / 8)} page={pageNumber} variant="outlined" color="primary" style={{margin: "4px auto"}}></Pagination>
      </div>
    </section>
  );
};

export default Dashboard;
