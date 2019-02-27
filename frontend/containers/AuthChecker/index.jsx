import React, {Component} from "react";
import {checkCookie} from '../../actions/loginActions';
import store from '../../store';
import Cookie from 'js-cookie';

export const withAuthCheck = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      store.dispatch(checkCookie(Cookie.get('login')));
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
};