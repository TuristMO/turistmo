import { combineReducers } from "redux";


import packageReducer from "./packageReducer";
import curatorReducer from "./curatorReducer";

export default combineReducers({
  packages: packageReducer,
  rCurator: curatorReducer
})
