import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  SET_REGISTRAR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (data, history) => (dispatch) => {
  axios
    .post("/api/auth/register", data)
    .then((res) => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: {},
      });

      dispatch(setRegistered(res.data));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (data, history) => (dispatch) => {
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      const { token } = res.data;

      dispatch({
        type: CLEAR_ERRORS,
        payload: {},
      });

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setRegistered = (data) => {
  return {
    type: SET_REGISTRAR,
    payload: data,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
