import {
  GET_ACCEPTED_REQUESTS, GET_ALL_REQUESTS, GET_COMPLETED_REQUESTS,
  GET_NEW_REQUESTS,
  HOME_LOADING
} from '../actions/types'

const initialState = {
  newRequests: null,
  loading: true,
  acceptedRequests: null,
  acceptedLoading: true,
  completedRequests: null,
  completedLoading: true,
  allRequests: null,
  allRequestsLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HOME_LOADING:
      return {
        ...state,
        loading: true,
        newRequests: null,
        acceptedLoading: true,
        acceptedRequests: null,
        completedRequests: null,
        completedLoading: true,
        allRequests: null,
        allRequestsLoading: true
      };

    case GET_NEW_REQUESTS:
      return {
        ...state,
        newRequests: action.payload,
        loading: false
      };
    case GET_ALL_REQUESTS:
      return {
        ...state,
        allRequests: action.payload,
        allRequestsLoading: false
      };
    case GET_ACCEPTED_REQUESTS:
      return {
        ...state,
        acceptedRequests: action.payload,
        acceptedLoading: false
      };
    case GET_COMPLETED_REQUESTS:
      return {
        ...state,
        completedRequests: action.payload,
        completedLoading: false
      };
    default:
      return state;

  }
}
