import {
  GET_FACULTY_HOME,
  GET_SA_HOME, GET_STUDENT_HOME,
  HOME_LOADING
} from '../actions/types'

const initialState = {
  home: null,
  loading: true,
  studentHome:null,
  invalid: false,
  facultyHome: null,
  facLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HOME_LOADING:
      return {
        ...state,
        loading: true,
        home: null,
        studentHome: null,
        invalid: false,
        facultyHome: null,
        facLoading: true
      };

    case GET_SA_HOME:
      return {
        ...state,
        home: action.payload,
        loading: false
      };
    case GET_STUDENT_HOME:
      return {
        ...state,
        studentHome: action.payload,
        loading: false
      };
    case GET_FACULTY_HOME:
      return {
        ...state,
        facultyHome: action.payload,
        facLoading: false
      };
    default:
      return state;

  }
}
