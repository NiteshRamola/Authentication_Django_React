import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_REQUEST,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_REQUEST,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from "../constants/authConstant";

export const facebookAuthReducer = (
  state = { access: "", refresh: "", isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case FACEBOOK_AUTH_REQUEST:
      return { loading: true };
    case FACEBOOK_AUTH_SUCCESS:
      return {
        loading: false,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    case FACEBOOK_AUTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const googleAuthReducer = (
  state = { access: "", refresh: "", isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case GOOGLE_AUTH_REQUEST:
      return { loading: true };
    case GOOGLE_AUTH_SUCCESS:
      return {
        loading: false,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    case GOOGLE_AUTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const passwordResetConfirmReducer = (
  state = { resetConfirm: false },
  action
) => {
  switch (action.type) {
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return { loading: true };

    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return { loading: false, resetConfirm: true };

    case PASSWORD_RESET_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const passwordResetReducer = (state = { reset: false }, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_SUCCESS:
      return { loading: false, reset: true };
    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoadReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
      return { loading: true };
    case USER_LOAD_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOAD_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (
  state = { access: "", refresh: "", isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { loading: true };
    case SIGNUP_SUCCESS:
      return { loading: false, created: true };
    case SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATION_REQUEST:
      return { loading: true };
    case ACTIVATION_SUCCESS:
      return { loading: false, activated: true };
    case ACTIVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
