import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  facebookAuthReducer,
  googleAuthReducer,
  passwordResetConfirmReducer,
  passwordResetReducer,
  userActivationReducer,
  userLoadReducer,
  userLoginReducer,
  userSignUpReducer,
} from "./reducers/authReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  userInfo: userLoadReducer,
  resetPassword: passwordResetReducer,
  resetPasswordConfirm: passwordResetConfirmReducer,
  userActivation: userActivationReducer,
  googleAuth: googleAuthReducer,
  facebookAuth: facebookAuthReducer,
});

const accessTokenFromStorage = localStorage.getItem("access")
  ? JSON.parse(localStorage.getItem("access"))
  : "";
const refreshTokenFromStorage = localStorage.getItem("refresh")
  ? JSON.parse(localStorage.getItem("refresh"))
  : "";

const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated")
  ? JSON.parse(localStorage.getItem("isAuthenticated"))
  : "";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialState = {
  userLogin: {
    refresh: refreshTokenFromStorage,
    access: accessTokenFromStorage,
    isAuthenticated: isAuthenticatedFromStorage,
  },
  googleAuth: {
    refresh: refreshTokenFromStorage,
    access: accessTokenFromStorage,
    isAuthenticated: isAuthenticatedFromStorage,
  },
  facebookAuth: {
    refresh: refreshTokenFromStorage,
    access: accessTokenFromStorage,
    isAuthenticated: isAuthenticatedFromStorage,
  },
  userInfo: {
    user: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
