import axios from "axios";
import {tokenHeader} from "../utils/headers";
import {GET_ACTIVE_USERS, GET_STUDENTS, HOME_LOADING} from "./types";

export const getStudents= () =>dispatch => {
	dispatch(loadList());
	axios.get(`api/hod/getAllStudents`, tokenHeader()).then(res => {
    dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
  }).catch(err =>
      console.log(err)
  )
};

// export const getFaculty = () => dispatch => {
//   dispatch(loadList());
//   axios.get(`/api/hod/getAllFaculty`, tokenHeader()).then(res => {
//    dispatch({
//         type: GET_FACULTY,
//         payload: res.data
//       })
//   }).catch(err => {
//       console.log(err);
//   }
//   )
// };

export const getActiveUsers = () => dispatch => {
  dispatch(loadList());
  axios.get(`/api/hod/activeUserControl`, tokenHeader()).then(res => {
   dispatch({
        type: GET_ACTIVE_USERS,
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
