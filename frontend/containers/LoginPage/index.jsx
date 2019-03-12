import React from 'react';
import {connect} from 'react-redux';
import {
  changeLoginField,
  changePasswordField,
  handleFormSubmit
} from '../../actions/loginActions';

import Input from '../../components/Input';
import {authFormContainer, inputWrapper} from './style.js';

const LoginPage = ({
  login,
  password,
  loading,
  message,
  error,
  changeLogin,
  changePass,
  handleSubmit
}) => (
  <>
    <>
      <h1>Страница авторизации</h1>
      {
        loading ? (
          <div style={{height: '306px'}}>...loading</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={authFormContainer}>
              <div className={inputWrapper}>
                <Input value={login} onChange={changeLogin} placeholder='Enter your login' />
              </div>
              <div className={inputWrapper}>
                <Input value={password} type='password' onChange={changePass} placeholder='Enter your password' />
              </div>
              <div className={inputWrapper}>
                <Input value='submit' type='submit' />
              </div>
              {message && <span>{message}</span>}
              {error && error.message && <span>{error.message}</span>}
            </div>
          </form>
        )
      }
    </>
  </>
);

LoginPage.displayName = 'LoginPage';

const mapStateToProps = ({loginReducer}) => ({
  login: loginReducer.login,
  password: loginReducer.password,
  loading: loginReducer.loading,
  message: loginReducer.message,
  error: loginReducer.error
});

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (val) => dispatch(changeLoginField(val)),
  changePass: (val) => dispatch(changePasswordField(val)),
  handleSubmit: (e) => dispatch(handleFormSubmit(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);