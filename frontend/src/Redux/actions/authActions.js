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
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  LOGOUT,
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
import axios from "axios";

export const facebookAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      dispatch({ type: FACEBOOK_AUTH_REQUEST });

      const { data } = await axios.post(
        `/api/auth/o/facebook/?${formBody}`,
        config
      );
      localStorage.setItem("access", JSON.stringify(data.access));
      localStorage.setItem("refresh", JSON.stringify(data.refresh));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      dispatch({ type: FACEBOOK_AUTH_SUCCESS, payload: data });
      dispatch(loadUserData());
    } catch (error) {
      dispatch({ type: FACEBOOK_AUTH_FAIL, payload: error.response });
    }
  }
};

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      dispatch({ type: GOOGLE_AUTH_REQUEST });

      const { data } = await axios.post(
        `/api/auth/o/google-oauth2/?${formBody}`,
        config
      );
      localStorage.setItem("access", JSON.stringify(data.access));
      localStorage.setItem("refresh", JSON.stringify(data.refresh));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: data });
      dispatch(loadUserData());
    } catch (error) {
      dispatch({ type: GOOGLE_AUTH_FAIL, payload: error.response });
    }
  }
};

export const passwordResetConfirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    try {
      dispatch({ type: PASSWORD_RESET_CONFIRM_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/users/reset_password_confirm/",
        {
          uid: uid,
          token: token,
          new_password: new_password,
          re_new_password: re_new_password,
        },
        config
      );

      dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        payload: error.response.data.new_password
          ? error.response.data.new_password
          : error.response.data.token
          ? error.response.data.token
          : error.response.data.uid
          ? error.response.data.uid
          : error.response.statusText,
      });
    }
  };

export const passwordReset = (email) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/users/reset_password/",
      { email: email },
      config
    );

    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload:
        error.response.statusText && error.response.data.detail
          ? error.response.data.detail
          : error.response.statusText,
    });
  }
};

export const loadUserData = () => async (dispatch) => {
  let accessToken = localStorage.getItem("access");
  if (accessToken) {
    accessToken = accessToken.replace('"', "");
    accessToken = accessToken.replace('"', "");
    dispatch({ type: USER_LOAD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/auth/users/me/`, config);

      dispatch({
        type: USER_LOAD_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOAD_FAIL,
        payload:
          error.response.statusText && error.response.data.detail
            ? error.response.data.detail
            : error.response.statusText,
      });
    }
  } else {
    dispatch({
      type: USER_LOAD_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("isAuthenticated");
  dispatch({ type: LOGOUT });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/jwt/create/",
      { email: email, password: password },
      config
    );

    localStorage.setItem("access", JSON.stringify(data.access));
    localStorage.setItem("refresh", JSON.stringify(data.refresh));
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(loadUserData());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response.statusText && error.response.data.detail
          ? error.response.data.detail
          : error.response.statusText,
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

export const signup =
  (first_name, last_name, email, password, re_password) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/users/",
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          re_password: re_password,
        },
        config
      );

      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response.data.email
          ? error.response.data.email
          : error.response.data.password
          ? error.response.data.password
          : error.response.statusText,
      });
    }
  };

export const activateAccount = (uid, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVATION_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/users/activation/",
      {
        uid: uid,
        token: token,
      },
      config
    );

    dispatch({ type: ACTIVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
      payload: error.response.data.detail
        ? error.response.data.detail
        : error.response.data.token
        ? error.response.data.token
        : error.response.data.uid
        ? error.response.data.uid
        : error.response.statusText,
    });
  }
};
