import React, {Component} from "react";
import {checkUserAuth} from '../../actions/loginActions';
import store from '../../store';

export const withAuthCheck = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      store.dispatch(checkUserAuth());
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
};