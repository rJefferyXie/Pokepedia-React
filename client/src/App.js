import "./App.css";

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Pokedex from "./components/Pokedex/Pokedex";
import InspectPage from "./components/InspectPage/InspectPage";
import Team from "./components/Team/Team";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Navbar></Navbar>
            <MusicPlayer region={Math.floor(Math.random() * 7)} track={Math.floor(Math.random() * 7)}></MusicPlayer>
            <Routes>
              <Route exact path="/" element={<Hero></Hero>}></Route>
              <Route path="/pokedex/:id" element={<Pokedex></Pokedex>}></Route>
              <Route path="/inspect/:id" element={<InspectPage></InspectPage>}></Route>
              <Route path="/team" element={<Team></Team>}></Route>
              <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            </Routes>
          </Router>
          <Footer></Footer>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
