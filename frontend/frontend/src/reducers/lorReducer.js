import {

} from '../actions/types'
import {LOR_LOADING} from "../actions/types";
import {GET_UNIV_LIST} from "../actions/types";
import {GET_FACULTY_LIST} from "../actions/types";
import {GET_MY_SAVED_LOR} from "../actions/types";

const initialState = {
  univ: null,
  facList: null,
  loading: true,
  facLoading: true,
  savedLor: null,
  lorLoading: true,
  selectLor: null,
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
        savedLor: null
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
    default:
      return state;

  }
}
