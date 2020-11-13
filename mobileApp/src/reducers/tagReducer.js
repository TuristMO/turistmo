

import {
    GET_TAGS,
    LOADING } from "../actions/types";
const initialState = {
    tags: [],
    loading: true,
    //errorMessage:''
}      // []

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TAGS:
            return { ...state,tags: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}
