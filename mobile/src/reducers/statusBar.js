'use strict';

import * as types from '../actions/actionTypes';

export default function statusBar(state = false, action) {
    switch (action.type) {
        case types.STATUS_BAR_SHOW:
            return true;
        case types.STATUS_BAR_HIDDEN:
            return false;
        default:
            return state;
    }
}