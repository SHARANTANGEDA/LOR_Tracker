import {FILTER_SORT_LOADING} from '../actions/types'

const initialState = {
  filterType: null,
  sortType: null,
	search: '',
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case FILTER_SORT_LOADING:
      return {
        ...state,
        filterType: null,
  			sortType: null,
				search: '',
      };
    default:
      return state;

  }
}
