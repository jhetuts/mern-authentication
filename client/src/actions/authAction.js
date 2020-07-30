import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (data, history) => (dispatch) => {
  console.log(data);
  axios
    .post("/api/auth/register", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const loginUser = (data, history) => (dispatch) => {
  console.log(data);
  axios
    .post("/api/auth/login", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
