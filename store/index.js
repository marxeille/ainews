import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import logger from './logger';

const sagaMiddlewares = createSagaMiddleware();
const middlewares = [sagaMiddlewares];

// eslint-disable-next-line no-undef
if (__DEV__) {
  !window.devToolsExtension && middlewares.push(logger);
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

export default () => new Promise((resolve) => {
  const enhancer = [applyMiddleware(...middlewares)];
  window.devToolsExtension && enhancer.push(window.devToolsExtension());

  let persistedReducer = null;
  persistedReducer = reducers;

  const store = createStore(
    persistedReducer,
    undefined,
    compose(...enhancer)
  );
  sagaMiddlewares.run(rootSaga);

  persistStore(store, null, () => {
    resolve(store);
  });
});
