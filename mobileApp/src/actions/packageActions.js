import {
    GET_PACKAGES,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_BUSINESS,
    GET_PACKAGES_CULTURE,
    GET_PACKAGES_FOOD,
    GET_PACKAGES_TRAVEL,
    POST_PACKAGES,
    LOADING,
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
            console.log("TRAVEL")
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
            console.log("FOOD CALLED")
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
            console.log("CULTURE CALLED")
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
            console.log("BUSINESS CALLED")
            dispatch({type: GET_PACKAGES_BUSINESS, payload: response.data.content})
        } catch (err) {
            console.log(err);
        }
    }
}

export const postSavePackage = (packages, jwt) => {

//  let newStr = jwt.substr(7,jwt.length)
    console.log(jwt)
    console.log(packages)
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
            dispatch({type: POST_PACKAGES, payload: response.data.body})
        } catch (err) {
            console.log(err)
        }
    }
}

