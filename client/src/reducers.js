import { combineReducers } from 'redux';
import homeReducer from './app/home/service/reducers';
import appReducer from './app/core/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  app: appReducer,
});

export default rootReducer;
