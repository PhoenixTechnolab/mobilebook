import {
  SIGN_UP_CLICKED,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
} from '../action/types';
import { translate } from 'i18n-js';
import { AUTH_STATUS } from '../utils';

const initialState = {
  isSignUpSuccess: false,
  message: ' ',
  authStatus: '',
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_CLICKED:
      return {
        ...state,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUpSuccess: true,
        authStatus: AUTH_STATUS.SUCCESS,
        message: translate('message_sign_up_success'),
      };

    case SIGN_UP_FAILED:
      return {
        ...state,
        message: payload.message,
        isSignUpSuccess: false,
        authStatus: AUTH_STATUS.FAILED,
      };

    default:
      return state;
  }
};
