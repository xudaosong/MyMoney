'use strict';

import * as types from './actionTypes';
import {request} from '../utils/RequestUtils';
import {ToastShort} from '../utils/ToastUtils';


export function fetchJokeList(isRefreshing, loading, isLoadMore, page) {
    if (page === undefined) {
        page = 1;
    }
    return dispatch => {
        dispatch(fetchJoke(isRefreshing, loading, isLoadMore));
        return request('showapi_open_bus/showapi_joke/joke_text?page=' + page, 'get')
            .then((jokeList)=> {
                dispatch(receiveJoke(jokeList.showapi_res_body.contentlist))
            })
            .catch((error)=> {
                dispatch(receiveJoke([]));
                ToastShort(error.message);
            });
    }
}

function fetchJoke(isRefreshing, loading, isLoadMore) {
    //console.warn(isRefreshing,loading,isLoadMore);
    if(isLoadMore === undefined){
        isLoadMore = false;
    }
    return {
        type: types.FETCH_JOKE_LIST,
        isRefreshing: isRefreshing,
        loading: loading,
        isLoadMore: isLoadMore,
    }
}

function receiveJoke(jokeList) {
    //console.warn('receiveJoke',jokeList);
    return {
        type: types.RECEIVE_JOKE_LIST,
        jokeList: jokeList
    }
}

