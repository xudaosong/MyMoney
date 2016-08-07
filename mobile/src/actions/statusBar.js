'use strict';

import * as types from './actionTypes';


export function statusBarShow() {
    return {
        type: types.STATUS_BAR_SHOW,
        show: true,
    }
}
export function statusBarHidden() {
    return {
        type: types.STATUS_BAR_HIDDEN,
        show: false,
    }
}