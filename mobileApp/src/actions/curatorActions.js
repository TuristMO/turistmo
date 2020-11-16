import {
    POST_SIGNIN_CURATOR,
    POST_SIGNIN_CURATOR_SUCCESS,
    POST_SIGNIN_CURATOR_SUCCESS_JWT,
    POST_SIGNIN_CURATOR_ERROR,
    POST_SIGNUP_CURATOR,
    POST_SIGNUP_CURATOR_SUCCESS,
    POST_SIGNUP_CURATOR_ERROR,
    LOADING,
} from "./types";
import packageApi from "../api/packageApi";

export const postSignUpCurator = (curator) => {

    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.post('/api/turistmo/signup', curator);
            dispatch({type: POST_SIGNUP_CURATOR, payload: response.data})
            dispatch({type: POST_SIGNUP_CURATOR_SUCCESS, payload: response.data.message})
            dispatch({type: LOADING, payload: false});
        } catch (err) {
            // console.log(err.response.data)
            // console.log(err.response.data.message)
            // console.log(err.response.data.errors)
            let errM = err.response.data.message;
            if (!errM)
                errM = err.response.data.errors[0];
            errM
                ? dispatch({type: POST_SIGNUP_CURATOR_ERROR, payload: errM})
                : dispatch({
                    type: POST_SIGNUP_CURATOR_ERROR,
                    payload: 'Something went terrible wrong, please inform product owner'
                })
        }
    }
}

export const postSignInCurator = (curator) => {
    return async (dispatch) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.post('/api/turistmo/login', curator);
            dispatch({type: POST_SIGNIN_CURATOR, payload: response.data.body})
            dispatch({type: POST_SIGNIN_CURATOR_SUCCESS_JWT, payload: response.data.authorization})
            dispatch({type: LOADING, payload: false});
            return response.data.authorization.length > 0;
        } catch (err) {
            let errM = err.response.data.message
            dispatch({type: POST_SIGNIN_CURATOR_ERROR, payload: err.response.data.message})
        }
    }
}

export const setActiveCurator = (curator) => {
    return async (dispatch,getState) => {
        dispatch({type: LOADING, payload: false})
        dispatch({type: POST_SIGNIN_CURATOR, payload: curator})
    }
}

export const emptyServerMessage = () => {
    return async (dispatch, getState) => {
        dispatch({type: LOADING, payload: false})
    }
}

