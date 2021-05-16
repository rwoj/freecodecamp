import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
// import registerServiceWorker from './registerServiceWorker';

import rootReducer from "./rootReducer";
import App from './App';
import {userLoggedIn} from "./actions/users"

const store = createStore(
  rootReducer,
  // applyMiddleware(thunk)
  composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.bookjump){
  const lst= JSON.parse(localStorage.bookjump);
  const user = {
    email: lst.email,
    username: lst.username,
    userId: lst.userId
  }
  store.dispatch(userLoggedIn(user))
}
// const App=()=>{
//   return <div>Heja</div>
// }

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
// registerServiceWorker();
