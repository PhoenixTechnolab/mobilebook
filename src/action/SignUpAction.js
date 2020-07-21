import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_UP_CLICKED } from './types';
import { postRequestApi } from '../network/NetworkManager';
import { REGISTER_USER } from '../network/URL';
export const signUpAction = (fullName, username, password, contact) => {
  const params = {
    fullName,
    username,
    password,
    contact,
  };
  return dispatch =>
    postRequestApi(
      REGISTER_USER,
      params,
      dispatch,
      SIGN_UP_SUCCESS,
      SIGN_UP_FAILED,
    );
};
