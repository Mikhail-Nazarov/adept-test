import { combineReducers } from "@reduxjs/toolkit";
import companies from "./slices/companies.slice";

export const rootReducer = combineReducers({
  companies,
});
