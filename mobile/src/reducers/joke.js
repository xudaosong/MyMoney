'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    isRefreshing: false,
    loading: true,
    isLoadMore: false,
    noMore: false,
    jokeList: []
};

export default function getJokeList(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_JOKE_LIST:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                loading: action.loading,
                isLoadMore: action.isLoadMore,
            });
        case types.RECEIVE_JOKE_LIST:
            return Object.assign({}, state, {
                jokeList: combine(state, action),
                noMore: action.jokeList.length === 0,
                loading: state.jokeList.length === 0,
                isRefreshing: false,
                isLoadMore: false,
            });
        default:
            return state;
    }
}

function combine(state, action) {
    if (state.isLoadMore) {
        state.jokeList = state.jokeList.concat(action.jokeList);
    } else {
        state.jokeList = action.jokeList;
    }
    //console.warn('combine',state.jokeList);
    return state.jokeList;
}

