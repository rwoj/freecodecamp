import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import requests from "./reducers/requests"

export default combineReducers({
  user,
  books,
  requests
});
