// Redux State Management
import { persistStore, persistReducer } from 'redux-persist'
import { createStore } from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
    key: 'root', 
    storage,
    blacklist: ['teamReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

