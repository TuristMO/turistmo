import { combineReducers } from "redux";


import packageReducer from "./packageReducer";

export default combineReducers({
  packages: packageReducer
})
