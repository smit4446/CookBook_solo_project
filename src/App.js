import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import Home from './components/Home/Home';
import Cookbook from './components/Cookbook/Cookbook';
import Category from './components/Category/Category';
import Recipe from './components/Recipe/Recipe';
import Footer from './components/Footer/Footer';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="CookBook" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/main" />
        <Route
          exact path="/home"
          component={LoginPage}
        />
        <Route
          exact path="/register"
          component={RegisterPage}
        />
        <Route
          exact path="/user"
          component={UserPage}
        />
        <Route
          exact path="/info"
          component={InfoPage}
        />
        <Route
          exact path="/main"
          component={Home}
        />
        <Route
          exact path="/cookbook"
          component={Cookbook}
        />
        <Route
          exact path="/category"
          component={Category}
        />
        <Route
          exact path="/recipe"
          component={Recipe}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
    <Footer title="Lauren Smith"/>
  </div>
);

export default App;