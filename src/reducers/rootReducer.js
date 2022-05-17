import { combineReducers } from "redux";
import manageFavorite from "./manageFavorite";
import manageArticles from "./manageArticles";
import manageComments from "./manageComments";

const rootReducer = combineReducers({
  manageFavorite,
  manageArticles,
  manageComments,
});

export default rootReducer;
