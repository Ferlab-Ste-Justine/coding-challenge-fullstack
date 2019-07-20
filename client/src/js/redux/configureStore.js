import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from './middlewares/socketMiddleware';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, socketMiddleware];
  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
