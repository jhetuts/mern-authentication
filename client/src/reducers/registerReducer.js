import isEmpty from "../validations/isEmpty";
import { SET_REGISTRAR } from "../actions/types";

const initialState = {
  registration: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_REGISTRAR:
      return {
        ...state,
        registration: !isEmpty(action.payload),
      };
    default:
      return state;
  }
}
