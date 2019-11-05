import axios from "axios";
import {tokenHeader} from "../utils/headers";
import {
	GET_ACCEPTED_REQUESTS,
	GET_ALL_REQUESTS,
	GET_COMPLETED_REQUESTS,
	GET_ERRORS,
	GET_FACULTY_LIST,
	GET_MY_APPLIED_LORS,
	GET_MY_SAVED_LOR,
	GET_MY_SAVED_LOR_APPLICATION,
	GET_NEW_REQUESTS,
	GET_UNIV_LIST,
	HOME_LOADING
} from "./types";
import {clearErrors} from "./accountActions";

export const createLor = (data) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/student/createLor`, data, tokenHeader()).then(res => {
    window.location.href='/viewMyLor'
  }).catch(err => {
      console.log(err);
    dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
  }
  )
};
export const updateLor = (data, id) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/student/editLor/${id}`, data, tokenHeader()).then(res => {
    window.location.href='/viewMyLor'
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

export const deleteLor= (id) =>dispatch => {
	dispatch(loadList());
	axios.get(`api/student/deleteLor/${id}`, tokenHeader()).then(res => {
	  window.location.reload();
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
export const getLorForApplication= () =>dispatch => {
	dispatch(loadList());
	axios.get(`api/student/getSavedLorForApplication`, tokenHeader()).then(res => {
    dispatch({
        type: GET_MY_SAVED_LOR_APPLICATION,
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


export const getLorAcceptData = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/faculty/getLorAcceptData`, tokenHeader()).then(res => {
   dispatch({
        type: GET_NEW_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};

export const completedLorData = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/faculty/completedLorData`, tokenHeader()).then(res => {
   dispatch({
        type: GET_COMPLETED_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};

export const getAcceptedLorData = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/faculty/getAcceptedLorData`, tokenHeader()).then(res => {
   dispatch({
        type: GET_ACCEPTED_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};



export const getAllNewRequestsHod = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/hod/getAllNewRequests`, tokenHeader()).then(res => {
   dispatch({
        type: GET_NEW_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};

export const getAllCompletedRequests = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/hod/getAllCompletedRequests`, tokenHeader()).then(res => {
   dispatch({
        type: GET_COMPLETED_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};export const getAllRequests = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/hod/getAllRequests`, tokenHeader()).then(res => {
   dispatch({
        type: GET_ALL_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};

export const getAllAcceptedRequests = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/hod/getAllAcceptedRequests`, tokenHeader()).then(res => {
   dispatch({
        type: GET_ACCEPTED_REQUESTS,
        payload: res.data
      })
  }).catch(err => {
      console.log(err);
  }
  )
};

export const loadList = () => {
  return {
    type: HOME_LOADING
  }
};
