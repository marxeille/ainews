import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import posts from './posts';
import comments from './comments';
import me from './me';
import { tokenReducer as token } from '../../utils/RequestSagaUtils';
import categories from './categories';
import updateFlags from './updateFlags';
import authors from './authors';
import themes from './themes';
import searchReducer from './search';
import report from './report';

const config = {
  key: 'AINews',
  timeout: 10000,
  storage: AsyncStorage,
  whitelist: ['token', 'me', 'categories', 'themes', 'report'],
  blacklist: ['form']
};

const formPersistConfig = {
  key: 'form',
  storage: AsyncStorage,
  timeout: 10000
  // whitelist: ['ExampleForm']
};

const searchPersistConfig = {
  key: 'searchReducer',
  storage: AsyncStorage,
  timeout: 10000,
  whitelist: ['savedKeyword']
};

const reducers = combineReducers({
  posts,
  comments,
  token,
  me,
  updateFlags,
  form: persistReducer(formPersistConfig, form),
  categories,
  themes,
  searchReducer: persistReducer(searchPersistConfig, searchReducer),
  authors,
  report
});

export default persistReducer(config, reducers);
