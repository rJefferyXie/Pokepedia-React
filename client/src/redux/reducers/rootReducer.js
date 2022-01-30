import { combineReducers } from 'redux';
import teamReducer from "./teamReducer";
import pokedexReducer from "./pokedexReducer";
import loadReducer from "./loadReducer";

const rootReducer = combineReducers({
    teamReducer, pokedexReducer, loadReducer
});

export default rootReducer;