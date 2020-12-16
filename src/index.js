import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './state/store'

const store = configureStore(window.REDUX_INITIAL_DATA)

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);