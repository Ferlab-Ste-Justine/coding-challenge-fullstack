import socket from './utils/socket';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import masterReducer from './reducers';
import App from './components/app';

const store = createStore(
  masterReducer,
  applyMiddleware(thunk.withExtraArgument(socket))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-container')
);
