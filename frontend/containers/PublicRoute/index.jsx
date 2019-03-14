import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {PageHeader, PublicHeader} from '../../components/PageHeader';

export default connect(({loginReducer: {isAuth}}) => ({isAuth}))(
 ({component: Component, isAuth, ...rest}) => (
   <>
      <PageHeader>
        <PublicHeader />
      </PageHeader>
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