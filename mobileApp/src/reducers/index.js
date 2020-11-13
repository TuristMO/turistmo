import { combineReducers } from "redux";


import packageReducer from "./packageReducer";
import curatorReducer from "./curatorReducer";
import applicationReducer from "./applicationReducer";
import tagReducer from "./tagReducer";

export default combineReducers({
  packages: packageReducer,
  rCurator: curatorReducer,
  rApplications: applicationReducer,
  rTags: tagReducer
})
