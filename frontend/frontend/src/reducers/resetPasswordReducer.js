import { ENTER_OTP, ENTER_PASSWORD, RESET_PASSWORD_LOADING, SEND_OTP } from '../actions/types'

const initialState = {
  loading: true,
  enterEmail: true,
  enterPassword: false,
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        enterEmail: true,
        enterPassword: false,
      }
    case SEND_OTP:
      return {
        ...state,
        enterEmail: true,
        enterPassword: false,
        loading: false,

      }
    case ENTER_OTP:
      return {
        enterEmail: false,
        enterPassword: false,
        loading: false,
      }
    case ENTER_PASSWORD:
      return {
        ...state,
        enterEmail: false,
        enterPassword: true,
        loading: false,
      }
    default:
      return state;

  }
}
