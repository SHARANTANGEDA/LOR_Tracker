import axios from 'axios'
import {
  CLEAR_ERRORS, GET_NAME_RESULTS, GET_STUDENT_HOME, HOME_LOADING, SEARCH_LOADING,
} from './types'
import { tokenHeader } from '../utils/headers';


export const studentHome=() => dispatch => {
  axios.get('api/student/home', tokenHeader()).then(res => {
    dispatch({
        type: GET_STUDENT_HOME,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};

export const favourite=(id) => dispatch => {
  axios.get(`/api/upload/favourite/${id}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
};

export const unFavourite=(id) => dispatch => {
  axios.get(`/api/upload/unFavourite/${id}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
};





export const changeRating = (id, rating) => dispatch => {
  axios.get(`/api/upload/changeRating/${id}/${rating}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
};


export const getNameResults = (data) => dispatch => {
  dispatch(setSearchLoading());
  dispatch(homeLoading());
  axios.get(`/api/users/searchName/${data}`).then(res => {
    dispatch({
      type: GET_NAME_RESULTS,
      payload: res.data
    })
  }).catch(err =>
    console.log({sErr: err})
    // dispatch({
    //   type: GET_SEARCH_ERRORS,
    //   payload: err.data
    // })
  )
};



export const pinFile = (id) => dispatch => {
  axios.post(`/api/upload/pinFile`,id).then(res => {
    console.log(res.data)
  }).catch(err =>
    {console.log(err)}
  )
};
export const unPinFile = (id) => dispatch => {
  axios.post(`/api/upload/unPinFile`,id).then(res => {
    console.log(res.data)
  }).catch(err =>
    {console.log(err)}
  )
};


export const homeLoading = () => {
  return {
    type: HOME_LOADING
  }
};

export const setSearchLoading = () => {
  return {
    type: SEARCH_LOADING
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};
