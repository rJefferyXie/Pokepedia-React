import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import Adapter from 'enzyme-adapter-react-16';

import { shallow, configure } from 'enzyme';
import rootReducer from "../../redux/reducers/rootReducer";

import MusicPlayer from "./MusicPlayer";

configure({ adapter: new Adapter() });

describe("MusicPlayer", () => {
    it("Should load in the dom.", () => {
        const store = createStore(rootReducer);
        const music = shallow(
            <Provider store={store}>
                <MusicPlayer region={0} track={0}></MusicPlayer>
            </Provider>
        );
        expect(music).toMatchSnapshot();
    })
})