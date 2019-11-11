import {
  CONVERT_GOOGLE_TOKEN_FAILURE,
  CONVERT_GOOGLE_TOKEN_SUCCESS,
  GOOGLE_IS_AUTHENTICATING,
  GOOGLE_LOGOUT,
  SET_CURRENT_USER
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  err: null,
  isAuthenticated: false,
  isAuthenticating: false,
  token_data: {},
  user: {}
};

export default function googleInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GOOGLE_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true,
        err: null,
        isAuthenticated: false,
        token_data: {},
        user: {}
      };
    case CONVERT_GOOGLE_TOKEN_SUCCESS:
      return {
        ...state,
        err: null,
        isAuthenticated: true,
        isAuthenticating: false,
        token_data: action.google_token,
        user: action.payload
      };
    case CONVERT_GOOGLE_TOKEN_FAILURE:
      return {
        ...state,
        err: action.err,
        isAuthenticated: false,
        isAuthenticating: false,
        user: {}
      };
    case GOOGLE_LOGOUT:
      return {
        ...initialState
      };
    case SET_CURRENT_USER:
          return {
              ...state,
              isAuthenticated: !isEmpty(action.payload),
              user: action.payload
          };
    // case GOOGLE_AUTHENTICATE_ACTION:
    //   return {
    //     ...state,
    //     isAuthenticated: true
    //   };
    default:
      return state;
  }
}

