import React from 'react';
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import TopNavigation from './components/pages/TopNavigation'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUpPage'
import ProfilePage from './components/pages/ProfilePage'
import MyBooksPage from './components/pages/MyBooksPage'
import AllBooksPage from './components/pages/AllBooksPage'
import FooterInfo from './components/messages/FooterInfo'
// import { Container, Menu, Button} from "semantic-ui-react";

const App = ({location})=>
 (
   <div>
     <TopNavigation />
     <Route location={location} path="/" exact component={HomePage} />
     <Route location={location} path="/login" exact component={LoginPage} />
     <Route location={location} path="/signup" exact component={SignUpPage} />
     <Route location={location} path="/profile" exact component={ProfilePage} />
     <Route location={location} path="/mybooks" exact component={MyBooksPage} />
     <Route location={location} path="/allbooks" exact component={AllBooksPage} />
     <FooterInfo />
   </div>
);
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}
export default App;
