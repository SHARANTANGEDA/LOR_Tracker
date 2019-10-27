import {GET_NAME_RESULTS, GET_SEARCH_ERRORS, GET_SEARCH_RESULTS, SEARCH_LOADING,} from '../actions/types'

const initialState = {
  results: null,
  loading: true,
  resultsName: null,
  loading2: true
};

export default function(state = initialState, action) {
  // console.log({'Search Reducer':action.payload});
  switch (action.type) {
    case SEARCH_LOADING:
      console.log("IN File Reducer loading");
      return {
        ...state,
        loading: true,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false,

      };
    case GET_NAME_RESULTS:
      return {
        ...state,
        resultsName: action.payload,
        loading2: false
      };
    case GET_SEARCH_ERRORS:
      return {
        ...state,
        results: action.payload,
        loading: false
      };
    default:
      return state;

  }
}
