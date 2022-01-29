import "./App.css";

import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Pokedex from "./components/Pokedex/Pokedex";
import InspectPage from "./components/InspectPage/InspectPage";
import Team from "./components/Team/Team";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route exact path="/" element={<Hero></Hero>}></Route>
          <Route path="/pokedex" element={<Pokedex></Pokedex>}></Route>
          <Route path="/inspect" element={<InspectPage></InspectPage>}></Route>
          <Route path="/team" element={<Team></Team>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
