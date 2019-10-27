import {GET_FACULTY_LIST, GET_MY_APPLIED_LORS, GET_MY_SAVED_LOR, GET_UNIV_LIST, LOR_LOADING} from '../actions/types'

const initialState = {
  univ: null,
  facList: null,
  loading: true,
  facLoading: true,
  savedLor: null,
  lorLoading: true,
  selectLor: null,
  appliedLor: null,
  appliedLoading: true
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case LOR_LOADING:
      return {
        ...state,
        loading: true,
        facLoading: true,
        lorLoading: true,
        facList: null,
        univ: null,
        savedLor: null,
        appliedLor: null,
        appliedLoading: true
      };

    case GET_UNIV_LIST:
      return {
        ...state,
        univ: action.payload,
        loading: false
      };
    case GET_FACULTY_LIST:
      return {
        ...state,
        facList: action.payload,
        facLoading: false
      };
    case GET_MY_SAVED_LOR:
      return {
        ...state,
        savedLor: action.payload,
        lorLoading: false
      };
    case GET_MY_APPLIED_LORS:
      return {
        ...state,
        appliedLor: action.payload,
        appliedLoading: false
      }
    default:
      return state;

  }
}
