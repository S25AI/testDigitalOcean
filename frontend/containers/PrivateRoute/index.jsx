import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {disconnectAuth} from '../../actions/loginActions';

export default connect(
  ({loginReducer: {isAuth}}) => ({isAuth}),
  (dispatch) => ({disconnect: () => dispatch(disconnectAuth())})
)(
 ({component: Component, isAuth, disconnect, ...rest}) => (
   <>
    <button onClick={disconnect}>
      Разлогиниться
    </button>
      <Route {...rest}
        render={props => (
          isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
      )} />
    </>
 ) 
);