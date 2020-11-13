

import { GET_PACKAGES,
  GET_PACKAGES_TRAVEL,
  GET_PACKAGES_FOOD,
  GET_PACKAGES_CULTURE,
  GET_PACKAGES_BUSINESS,
  GET_PACKAGES_SUCCESS,
  POST_PACKAGES,
  LOADING } from "../actions/types";
const initialState = {
  packages: [],
  packagesTravel: [],
  packagesFood: [],
  packagesCulture: [],
  packagesBusiness: [],
  postPackages: {},
  loading: true,
  packagesFound: false,
  errorMessage:''
}      // []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKAGES:
      return { ...state,packages: action.payload, loading: false }
    case GET_PACKAGES_SUCCESS:
      return { ...state,packagesFound: action.payload, loading: false }
    case GET_PACKAGES_TRAVEL:
      return { ...state,packagesTravel: action.payload, loading: false }
    case GET_PACKAGES_FOOD:
      return { ...state,packagesFood: action.payload, loading: false }
    case GET_PACKAGES_CULTURE:
      return { ...state,packagesCulture: action.payload, loading: false }
    case GET_PACKAGES_BUSINESS:
      return { ...state,packagesBusiness: action.payload, loading: false }
    case POST_PACKAGES:
      return { ...state,postPackages: action.payload, loading: false }
    case LOADING:
      return { ...state, loading: action.payload }
    default:
      return state;
  }
}
