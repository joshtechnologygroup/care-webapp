import { combineReducers } from 'redux';
import UserReducer from 'Reducers/UserReducer';

export default combineReducers({
  User: UserReducer
});
