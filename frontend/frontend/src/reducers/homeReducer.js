import {
  GET_SA_HOME, GET_STUDENT_HOME,
  HOME_LOADING
} from '../actions/types'

const initialState = {
  home: null,
  loading: true,
  studentHome:null,
  invalid: false
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case HOME_LOADING:
      return {
        ...state,
        loading: true,
        home: null,
        studentHome: null,
        invalid: false
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
    default:
      return state;

  }
}
