import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './containers/MainPage';
import {globals} from './styles';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={MainPage} />
    </BrowserRouter>
  </Provider>
);

render(<App />, document.querySelector('#app'));