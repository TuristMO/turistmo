import {
  GET_PACKAGES,
  GET_PACKAGES_BUSINESS,
  GET_PACKAGES_CULTURE,
  GET_PACKAGES_FOOD,
  GET_PACKAGES_TRAVEL,
  GET_CITY_FROM_GEO_LOCATION,
  LOADING,
} from "./types";
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
      // console.log(response.data.content)
    } catch (err) {
      console.log(err);
    }
  }
}

//JOAKIM WAS HERE
export const getAllPackagesTravel = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await packageApi.get('/api/v1/package',{
        params:{
          page:0,  //TODO CHANGE DYNAMICALLY
          size:10,
          search: 'Travel'
        }

      });
      console.log("TRAVEL")
      dispatch({ type: GET_PACKAGES_TRAVEL, payload: response.data.content })
    } catch (err) {
      console.log(err);
    }
  }
}
export const getAllPackagesFood = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await packageApi.get('/api/v1/package',{
        params:{
          page:0,  //TODO CHANGE DYNAMICALLY
          size:10,
          search: 'Food'
        }

      });
      console.log("FOOD CALLED")
      dispatch({ type: GET_PACKAGES_FOOD, payload: response.data.content })
    } catch (err) {
      console.log(err);
    }
  }
}
export const getAllPackagesCulture = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await packageApi.get('/api/v1/package',{
        params:{
          page:0,  //TODO CHANGE DYNAMICALLY
          size:10,
          search: 'Culture'
        }
      });
      console.log("CULTURE CALLED")
      dispatch({ type: GET_PACKAGES_CULTURE, payload: response.data.content })
    } catch (err) {
      console.log(err);
    }
  }
}

export const getAllPackagesBusiness = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await packageApi.get('/api/v1/package',{
        params:{
          page:0,  //TODO CHANGE DYNAMICALLY
          size:10,
          search: 'Business'
        }
      });
      console.log("BUSINESS CALLED")
      dispatch({ type: GET_PACKAGES_BUSINESS, payload: response.data.content })
    } catch (err) {
      console.log(err);
    }
  }
}



//import { GET_PACKAGES, LOADING } from "./types";
//
// import packageApi from "../api/packageApi";
//
// export const getAllPackages = (searchText) => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch({ type: LOADING, payload: true })
//       const response = await packageApi.get('/api/v1/package',{
//         params:{
//           page:0,  //TODO CHANGE DYNAMICALLY
//           size:10,
//           search: searchText
//         }
//       });
//       dispatch({ type: GET_PACKAGES, payload: response.data.content })
//       //setFilteredData(response.data.content)
//       console.log(response.data.content)
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
