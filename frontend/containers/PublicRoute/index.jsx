import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {PageHeader} from '../../components/PageHeader';
const headerItems = [
  {url: '/register', text: 'to register page'},
  {url: '/', text: 'to login page'}
];

export default connect(({loginReducer: {isAuth}}) => ({isAuth}))(
 ({component: Component, isAuth, ...rest}) => (
   <>
      <PageHeader items={headerItems} />
      <Route {...rest}
        render={props => (
          !isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to={{pathname: '/home', state: {from: props.location}}} />
        )
      )} />
    </>
 ) 
);