import { GET_PACKAGES, LOADING } from "../actions/types";

const initialState = {
  packages: [],
  loading: true,
  errorMessage:''
}      // []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKAGES:
      return { ...state,packages: action.payload, loading: false }
    case LOADING:
      return { ...state, loading: action.payload }
    default:
      return state;
  }
}
