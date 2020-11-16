import {
    POST_SIGNUP_CURATOR,
    POST_SIGNUP_CURATOR_SUCCESS,
    POST_SIGNUP_CURATOR_ERROR,
    POST_SIGNIN_CURATOR,
    POST_SIGNIN_CURATOR_SUCCESS,
    POST_SIGNIN_CURATOR_SUCCESS_JWT,
    POST_SIGNIN_CURATOR_ERROR,
    LOADING
} from "../actions/types";

const initialState = {
    curator:{}, //Använda den här tillsammans med token vid inloggad
    jwt: '', //tänk på att testa både med asynstorage och reducern
    errorMessageLogin: '',
    errorMessageSignUp: '',
    successMessageSignUp: '',
    userFound: false,
    loading: true,
}

export default (state= initialState, action) => {
    switch(action.type){
        case POST_SIGNUP_CURATOR:
            return { ...state, curator: action.payload, loading: false}
        case POST_SIGNUP_CURATOR_ERROR:
            return { ...state, errorMessageSignUp: action.payload, loading: false}
        case POST_SIGNUP_CURATOR_SUCCESS:
            return { ...state, successMessageSignUp: action.payload, loading: false}
        case POST_SIGNIN_CURATOR:
            return { ...state, curator: action.payload, loading: false}
        case POST_SIGNIN_CURATOR_SUCCESS_JWT:
            return { ...state, jwt: action.payload, loading: false}
        case POST_SIGNIN_CURATOR_SUCCESS:
            return { ...state, userFound: action.payload, loading: false}
        case POST_SIGNIN_CURATOR_ERROR:
            return { ...state, errorMessageLogin: action.payload, loading: false}
        case LOADING:
            return { ...state, loading: action.payload,errorMessageSignUp: "",successMessageSignUp: ''}
        default:
            return state;
    }
}
