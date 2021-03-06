import React from 'react';
import {connect} from 'react-redux';
import {
  changeLoginField,
  changePasswordField,
  handleFormSubmit
} from '../../actions/registerActions';

import Input from '../../components/Input';
import {
  authFormContainer,
  inputWrapper
} from '../LoginPage/style';

import {errorMessage} from './style';

const RegisterPage = ({
  login,
  password,
  changeLogin,
  changePass,
  handleSubmit,
  loading,
  error
}) => (
  <div className='wrapper'>
    <h1>Страница регистрации</h1>
    {
      loading ? (
        <div>...loading</div>
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
            <div className={errorMessage}>{error && error.message}</div>
          </div>
        </form>
      )
    }
  </div>
);

const mapStateToProps = ({registerReducer, jobsTestReducer}) => ({
  login: registerReducer.login,
  password: registerReducer.password,
  loading: registerReducer.loading,
  error: registerReducer.error
});

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (val) => dispatch(changeLoginField(val)),
  changePass: (val) => dispatch(changePasswordField(val)),
  handleSubmit: (e) => dispatch(handleFormSubmit(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);