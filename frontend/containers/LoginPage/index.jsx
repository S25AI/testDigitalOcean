import React from 'react';
import {connect} from 'react-redux';
import {
  changeLoginField,
  changePasswordField,
  handleFormSubmit
} from '../../actions/loginActions';

import Input from '../../components/Input';

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
          <div>...loading</div>
        ) : (
          <form onSubmit={handleSubmit}>
          <Input value={login} onChange={changeLogin} placeholder='Enter your login' />
          <Input value={password} type='password' onChange={changePass} placeholder='Enter your password' />
          <Input value='submit' type='submit' />
          <br />
          {message && <span>{message}</span>}
          {error && error.message && <span>{error.message}</span>}
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