import { FACULTY_CHECK_BOX, CHECK_BOX_LOADING } from '../actions/types'

const initialState = {
  selected: [],
  size:0,
  loading: true,
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case CHECK_BOX_LOADING:
      return {
        ...state,
        loading: true,
        selected: [],
        size:0
      }
    case FACULTY_CHECK_BOX:
      return {
        ...state,
        selected: action.payload,
        loading: false,
      }
    default:
      return state;

  }
}
