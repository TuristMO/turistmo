import {
    GET_TAGS,
    LOADING,
} from "./types";
import packageApi from "../api/packageApi";

export const getAllTags = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: LOADING, payload: true })
            const response = await packageApi.get('/api/v1/tag',{
                params:{
                    page:0,  //TODO CHANGE DYNAMICALLY
                    size:10
                }
            });
            dispatch({ type: GET_TAGS, payload: response.data.content })
        } catch (err) {
            console.log("TAG ERROR : " + err);
        }
    }
}

