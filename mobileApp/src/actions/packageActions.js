import {
    GET_PACKAGES,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_BUSINESS,
    GET_PACKAGES_CULTURE,
    GET_PACKAGES_FOOD,
    GET_PACKAGES_TRAVEL,
    POST_PACKAGES,
    LOADING, POST_PACKAGES_SUCCESS, POST_PACKAGES_ERROR, POST_SIGNIN_CURATOR_ERROR,
} from "./types";
import packageApi from "../api/packageApi";

export const getAllPackages = (searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.get('/api/v1/package', {
                params: {
                    page: 0,  //TODO CHANGE DYNAMICALLY
                    size: 10,
                    search: searchText
                }
            });
            dispatch({type: GET_PACKAGES, payload: response.data.content})
            dispatch({type: GET_PACKAGES_SUCCESS, payload: false})
            dispatch({type: LOADING, payload: false})
            if (response.data.content.length > 0)
                dispatch({type: GET_PACKAGES_SUCCESS, payload: true})
        } catch (err) {
            console.log(err);
        }
    }
}

export const getAllPackagesTravel = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.get('/api/v1/package', {
                params: {
                    page: 0,  //TODO CHANGE DYNAMICALLY
                    size: 10,
                    search: 'Travel'
                }
            });

            dispatch({type: GET_PACKAGES_TRAVEL, payload: response.data.content})
        } catch (err) {
            console.log(err);
        }
    }
}

export const getAllPackagesFood = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.get('/api/v1/package', {
                params: {
                    page: 0,  //TODO CHANGE DYNAMICALLY
                    size: 10,
                    search: 'Food'
                }

            });

            dispatch({type: GET_PACKAGES_FOOD, payload: response.data.content})
        } catch (err) {
            console.log(err);
        }
    }
}
export const getAllPackagesCulture = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.get('/api/v1/package', {
                params: {
                    page: 0,  //TODO CHANGE DYNAMICALLY
                    size: 10,
                    search: 'Culture'
                }
            });

            dispatch({type: GET_PACKAGES_CULTURE, payload: response.data.content})
        } catch (err) {
            console.log(err);
        }
    }
}

export const getAllPackagesBusiness = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.get('/api/v1/package', {
                params: {
                    page: 0,  //TODO CHANGE DYNAMICALLY
                    size: 10,
                    search: 'Business'
                }
            });

            dispatch({type: GET_PACKAGES_BUSINESS, payload: response.data.content})
        } catch (err) {
            console.log(err);
        }
    }
}

export const postSavePackage = (packages, jwt, callback) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOADING, payload: true})
            const response = await packageApi.post('/api/v1/curator/save', packages,
                {
                    headers: {
                        'Authorization': jwt
                    }
                });
            console.log("PACKAGE SAVED")
            dispatch({type: POST_PACKAGES, payload: response.data.curator})
            dispatch({type: POST_PACKAGES_SUCCESS, payload: response.data.message})
            callback();
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({type: POST_PACKAGES_ERROR, payload: error.response.data.errors})
            callback();
        }
    }
}


