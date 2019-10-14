import axios from "axios";
import {tokenHeader} from "../utils/headers";
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_FACULTY_LIST, GET_MY_APPLIED_LORS,
  GET_MY_SAVED_LOR,
  GET_STUDENT_HOME,
  GET_UNIV_LIST,
  LOR_LOADING
} from "./types";
import {clearErrors} from "./accountActions";

export const createLor = (data) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/student/createLor`, data, tokenHeader()).then(res => {
    window.location.reload()
  }).catch(err => {
      console.log(err);
    dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
  }
  )
};

export const getUniversitiesList= () =>dispatch => {
	dispatch(loadList());
	axios.get('api/student/getUnivList', tokenHeader()).then(res => {
    dispatch({
        type: GET_UNIV_LIST,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};

export const getFacultyList= () =>dispatch => {
	dispatch(loadList());
	axios.get('api/student/getFacultyList', tokenHeader()).then(res => {
    dispatch({
        type: GET_FACULTY_LIST,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};

export const getAppliedLors= () =>dispatch => {
	dispatch(loadList());
	axios.get(`api/student/getAppliedLor`, tokenHeader()).then(res => {
    dispatch({
        type: GET_MY_APPLIED_LORS,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};

export const getSavedLor= () =>dispatch => {
	dispatch(loadList());
	axios.get(`api/student/getSavedLor`, tokenHeader()).then(res => {
    dispatch({
        type: GET_MY_SAVED_LOR,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};
export const submitLor = (data) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/student/selectFaculty`, data, tokenHeader()).then(res => {
    window.location.href='/viewAppliedLor'
  }).catch(err => {
      console.log(err);
    dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
  }
  )
};
export const loadList = () => {
  return {
    type: LOR_LOADING
  }
};
