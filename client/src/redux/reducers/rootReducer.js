import { combineReducers } from 'redux';
import teamReducer from "./teamReducer";
import pokedexReducer from "./pokedexReducer";
import loadReducer from "./loadReducer";
import buildReducer from "./buildReducer";

const rootReducer = combineReducers({
    teamReducer, pokedexReducer, loadReducer, buildReducer
});

export default rootReducer;