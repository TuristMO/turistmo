import {
    GET_APPLICATIONS,
    LOADING,
} from "./types";
import packageApi from "../api/packageApi";

export const getAllApplications = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: LOADING, payload: true })
            const response = await packageApi.get('/api/v1/application',{
                params:{
                    page:0,  //TODO CHANGE DYNAMICALLY
                    size:10
                }
            });
            dispatch({ type: GET_APPLICATIONS, payload: response.data.content })
            //setFilteredData(response.data.content)
            // console.log(response.data.content)
        } catch (err) {
            console.log(err);
        }
    }
}

