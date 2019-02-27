import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default connect(({loginReducer: {isAuth}}) => ({isAuth}))(
 ({component: Component, isAuth, ...rest}) => (
   <>
      <ul>
        <li><Link to='/register'>to register page</Link></li>
        <li><Link to='/'>to login page</Link></li>
      </ul>

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