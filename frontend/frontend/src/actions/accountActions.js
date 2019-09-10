import axios from 'axios'

import { ACCOUNT_LOADING, CLEAR_ERRORS, GET_ACCOUNT_DETAILS, GET_ERRORS } from './types'

export const getProfileInfo = () => dispatch => {
  dispatch(setLoading());
  axios.get('/api/users/myAccount')
    .then(res => {
      dispatch({
        type: GET_ACCOUNT_DETAILS,
        payload: res.data
      })
    }).catch(err =>
    {console.log(err)}
  )
};


export const updateInfo = (data) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/users/myAccount/Change`, data).then(res => {
    window.location.href='/dashboard'
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const updateBook = (id,data) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/users/updateBookInfo/${id}`, data).then(res => {
    window.location.href='/dashboard'
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const setLoading = () => {
  return {
    type: ACCOUNT_LOADING
  }
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};
