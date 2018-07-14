import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import cookbookReducer from './cookbookReducer'

const store = combineReducers({
  user,
  login,
  cookbookReducer
});

export default store;
