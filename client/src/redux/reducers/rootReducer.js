import { combineReducers } from 'redux';
import teamReducer from "./teamReducer";
import pokedexReducer from "./pokedexReducer";
import loadReducer from "./loadReducer";
import buildReducer from "./buildReducer";
import musicReducer from "./musicReducer";

const rootReducer = combineReducers({
    teamReducer, pokedexReducer, loadReducer, buildReducer, musicReducer
});

export default rootReducer;