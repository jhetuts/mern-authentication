import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  registration: registerReducer,
});
