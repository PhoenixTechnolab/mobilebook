import { combineReducers } from 'redux';
import SignInReducers from './SignInReducers';
import SignUpReducer from './SignUpReducer';

export default combineReducers({
  signIn: SignInReducers,
  signUp: SignUpReducer,
});
