import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StartPage from '../StartPage';
import RegisterPage from '../RegisterPage';
import {Home as HomePage} from '../HomePage';
import PrivateRoute from '../../containers/PrivateRoute';
import PublicRoute from '../../containers/PublicRoute';
import CreateArticle from '../../containers/CreateArticle';
import {withAuthCheck} from '../../containers/AuthChecker';

const NoMatch = () => <h1>NoMatch</h1>

const MainPage = () => (
  <Switch>
    <PublicRoute exact path='/' component={StartPage} />
    <PublicRoute exact path='/register' component={RegisterPage} />
    <PrivateRoute path='/home' component={HomePage} />
    <PrivateRoute path='/create-article' component={CreateArticle} />
    <Route component={NoMatch} />
  </Switch>
);

export default withAuthCheck(MainPage);