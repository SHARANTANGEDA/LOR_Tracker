import {GET_ACTIVE_USERS, GET_FACULTY, GET_STUDENTS, HOD_LOADING,} from '../actions/types'

const initialState = {
	student: null,
	studentLoading: true,
	faculty: null,
	facultyLoading: true,
	activeUsers: null,
	activeUsersLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HOD_LOADING:
      return {
        ...state,
				student: null,
				studentLoading: true,
				faculty: null,
				facultyLoading: true,
				activeUsers: null,
				activeUsersLoading: true
      };

    case GET_STUDENTS:
      return {
        ...state,
        student: action.payload,
        studentLoading: false
      };
    case GET_FACULTY:
      return {
        ...state,
        faculty: action.payload,
        facultyLoading: false
      };
    case GET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload,
        activeUsersLoading: false
      };
    default:
      return state;

  }
}
