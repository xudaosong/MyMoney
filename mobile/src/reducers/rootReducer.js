'use strict';

import {combineReducers} from 'redux';
import getJokeList from './joke';
import statusBar from './statusBar';

const rootReducer = combineReducers({
    getJokeList,
    statusBar
});

export default rootReducer;
