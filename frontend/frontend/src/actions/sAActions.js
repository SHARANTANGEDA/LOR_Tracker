import axios from 'axios'

import {
  CLEAR_ERRORS,
  GET_ERRORS,
} from './types'

export const addDiagnostics = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/addDiagnostic', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};


export const removeDiagAccess = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/removeAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const grantDiagAccess = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/grantAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const removeUserAccess = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/removeLVPEIAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const grantUserAccess = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/grantLVPEIAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};


export const deleteLVPEIUser = (userData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/superAdmin/deleteLVPEIUser', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};



// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
