import axios from 'axios'

import {
  CLEAR_ERRORS,
  GET_ERRORS,
  HOME_LOADING,
} from './types'

export  const deleteResidual=(id) => dispatch => {
  axios.post(`/api/upload/onDiscard`,id).then(res => {
    window.location.href='/dashboard'
  }).catch(err =>
    console.log('error in deleting residual')
  )
}

export const createNewMembers=(data) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/diagAdmin/addMembers', data)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data

    })
  )
}
export const setLoading = () => {
  return {
    type: HOME_LOADING
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
