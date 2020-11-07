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
            dispatch ({ type: LOADING, payload: true})
            const response = await packageApi.post('/api/turistmo/signup', curator);
            console.log("SIGN UP SUCCESS - curatorActions 16")
        dispatch({ type: POST_SIGNUP_CURATOR, payload: response.data.content })
        } catch (err)  {
            console.log("SIGN UP FAILURE - curatorActions 19")
            let errM = err.response.data.message;
            if(!errM)
               errM=err.response.data.errors[0];
           errM
           ? dispatch({ type: POST_SIGNUP_CURATOR_ERROR, payload: errM })
           : dispatch({ type: POST_SIGNUP_CURATOR_ERROR, payload: 'Something went terrible wrong, please inform product owner' })
        };
    }
}

export const postSignInCurator = (curator) => {
    return async (dispatch, getState) => {
        try {
            dispatch ({ type: LOADING, payload: true})
            const response = await packageApi.post('/api/turistmo/login', curator);
            dispatch({ type: POST_SIGNIN_CURATOR, payload: response.data.body })
            dispatch({ type: POST_SIGNIN_CURATOR_SUCCESS_JWT, payload: response.data.authorization})
            dispatch({ type: POST_SIGNIN_CURATOR_SUCCESS, payload: true });
        } catch (err) {
            let errM = err.response.data.message
            dispatch({ type: POST_SIGNIN_CURATOR_ERROR, payload: err.response.data.message })
            dispatch({ type: POST_SIGNIN_CURATOR_SUCCESS, payload: false })
        }
    }
}

export const isUserFound = (userFound) => {
    return async (dispatch, getState) => {
       return !!userFound;
    }
}

export const emptyErrMessage = () => {
    return async (dispatch, getState) => {
            dispatch({ type: LOADING, payload: false })
    }
}

