import axios from 'axios'

import {CLEAR_ERRORS, GET_ERRORS} from './types'

export const changePassword = (data) => dispatch => {
  clearErrors();
  axios
    .post('/api/users/changePassword', data)
    .then(res => {
      window.location.href='/dashboard'
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const resetPassword = (data) => dispatch => {
  clearErrors();
  axios
    .post('/api/superAdmin/resetPassword', data)
    .then(res => {
      window.location.reload()
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
