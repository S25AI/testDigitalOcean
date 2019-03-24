import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {disconnectAuth} from '../../actions/loginActions';
import {PageHeader, PrivateHeader} from '../../components/PageHeader';

export default connect(
  ({loginReducer: {isAuth, authUserLogin, authCheckLoading}}) => ({
    isAuth,
    login: authUserLogin,
    authCheckLoading
  }),
  (dispatch) => ({disconnect: () => dispatch(disconnectAuth())})
)(
 ({component: Component, isAuth, login, authCheckLoading, disconnect, ...rest}) => (
   <>
     {
       authCheckLoading ? <div style={{
         display: 'flex',
         height: '100vh',
         justifyContent: 'center',
         alignItems: 'center'
        }}>...loading</div> : (
        <>
          <PageHeader>
            <PrivateHeader exitAction={disconnect} login={login} />
          </PageHeader>
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
     }
   </>
 )
);