import React from 'react';
import {connect} from 'react-redux';
import {
  changeLoginField,
  changePasswordField,
  handleFormSubmit
} from '../../actions/registerActions';

import Input from '../../components/Input';

const RegisterPage = ({
  login,
  password,
  changeLogin,
  changePass,
  handleSubmit,
  loading
}) => (
  <>
    <h1>Страница регистрации</h1>
    {
      loading ? (
        <div>...loading</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input value={login} onChange={changeLogin} placeholder='Enter your login' />
          <Input value={password} onChange={changePass} type='password' placeholder='Enter your password' />
          <Input value='submit' type='submit' />
        </form>
      )
    }
  </>
);

const mapStateToProps = ({registerReducer, jobsTestReducer}) => !console.log(jobsTestReducer) && ({
  login: registerReducer.login,
  password: registerReducer.password,
  loading: registerReducer.loading
});

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (val) => dispatch(changeLoginField(val)),
  changePass: (val) => dispatch(changePasswordField(val)),
  handleSubmit: (e) => dispatch(handleFormSubmit(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);