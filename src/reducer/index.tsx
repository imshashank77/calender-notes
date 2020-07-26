import { combineReducers } from "redux";
import {homePageReducer} from "../screens/homePage/reducer"
import {editReducer} from "../screens/homePage/reducer"

/**
 * combine all reducer into single root reducer
 */
const rootReducer = combineReducers({
  homePageReducer,
  editReducer
});

export default rootReducer;
