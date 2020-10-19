import { GET_PACKAGES, LOADING } from "./types";
import packageApi from "../api/packageApi";

export const getAllPackages = (searchText) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await packageApi.get('/api/v1/package',{
        params:{
          page:0,  //TODO CHANGE DYNAMICALLY
          size:10,
          search: searchText
        }
      });
      dispatch({ type: GET_PACKAGES, payload: response.data.content })
      //setFilteredData(response.data.content)
      console.log(response.data.content)
    } catch (err) {
      console.log(err);
    }
  }
}
