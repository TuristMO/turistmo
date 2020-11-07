

import {
    GET_APPLICATIONS,
    LOADING } from "../actions/types";
const initialState = {
    applications: [],
    loading: true,
    errorMessage:''
}      // []

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_APPLICATIONS:
            return { ...state,applications: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}
