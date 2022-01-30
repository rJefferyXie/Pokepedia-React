import { combineReducers } from 'redux';
import teamReducer from "./teamReducer";
import pokedexReducer from "./pokedexReducer";

const rootReducer = combineReducers({
    teamReducer, pokedexReducer
});

export default rootReducer;