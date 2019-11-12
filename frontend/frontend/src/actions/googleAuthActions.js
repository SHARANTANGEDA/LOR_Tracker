import {
	CONVERT_GOOGLE_TOKEN_FAILURE,
	CONVERT_GOOGLE_TOKEN_SUCCESS,
	GOOGLE_IS_AUTHENTICATING,
	GOOGLE_LOGOUT,
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {tokenHeader} from "../utils/headers";
import {setCurrentUser} from "./authActions";
import URLSearchParams from "url-search-params";

export const django_client_id = '4beIudnLDAWJ8tswrrnNH8VngEd30kGYI3DZ7y30'
export const django_client_secret = 'q86sdglQxfX7YmqFsOZ2hWnnptqs2stohcjtKKgaSdVxJ3dLHxyKYnb5rq1IC5gIu3iwn3nhnfzgGb4AvmMX3qu2OD4DUwb6NHolZbASWMH8heiajkkJVWt8R07kcTvr'
export const isAuthenticating = () => ({
  type: GOOGLE_IS_AUTHENTICATING
});

export const convertGoogleTokenSuccess = (data, roleData )=> {
  localStorage.setItem("google_access_token", data.access_token);
  localStorage.setItem("google_refresh_token", data.refresh_token);
  let expiryDate = Math.round(new Date().getTime() / 1000) + data.expires_in;
  localStorage.setItem("google_access_token_expires_in", expiryDate);
  const {token} = roleData;
	localStorage.setItem('jwtToken',token.toString());
	setAuthToken(token);
	const decoded = jwt_decode(token);
  localStorage.setItem('email', decoded.email);
  localStorage.setItem('role', decoded.role);
  localStorage.setItem('id', decoded.id);
  return {
    type: CONVERT_GOOGLE_TOKEN_SUCCESS,
    google_token: data,
		payload: decoded
  };
};

export const setCurrentUserGoogle = ()=> {
	let data = {
		google_access_token:localStorage.getItem("google_access_token"),
  	google_refresh_token:localStorage.getItem("google_refresh_token"),
  	google_access_token_expires_in:localStorage.getItem("google_access_token_expires_in")
	};
	let roleData = {
		role:localStorage.getItem('role'),
		email: localStorage.getItem('email'),
		id:localStorage.getItem('id'),
		first_name:localStorage.getItem('google_name'),
		last_name:''
	};
  return {
    type: CONVERT_GOOGLE_TOKEN_SUCCESS,
    google_token: data,
		payload: roleData
  };
};

export const googleLogoutAction = () => dispatch => {
	axios.get('api/auth/logout', tokenHeader()).then(res => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem("google_access_token");
		localStorage.removeItem("google_refresh_token");
		localStorage.removeItem("google_access_token_expires_in");
		localStorage.removeItem("google_avatar_url");
		localStorage.removeItem("google_name");
		localStorage.removeItem("email");
		localStorage.removeItem("id");
		localStorage.removeItem("role");
		dispatch({type: GOOGLE_LOGOUT, payload: null});
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }).catch(err =>
      console.log(err)
  )
};

export const convertGoogleTokenFailure = err => {
	return {
		type: CONVERT_GOOGLE_TOKEN_FAILURE,
  	payload: err.response.data
	}

};
// export const setCurrentUser = (decoded) => {
//   return {
//     type: CONVERT_GOOGLE_TOKEN_FAILURE,
//     payload: decoded
//   }
// };


export const convertGoogleToken = access_token => async dispatch => {
	dispatch(isAuthenticating());
	const searchParams = new URLSearchParams();
	searchParams.set("grant_type", "convert_token");
	searchParams.set("client_id", django_client_id);
	searchParams.set("client_secret", django_client_secret);
	searchParams.set("backend", "google-oauth2");
	searchParams.set("token", access_token);
	axios.post('/auth/convert-token/', searchParams).then(res => {
		axios.post('/api/auth/getRole',searchParams).then(roleRes => {
			console.log(roleRes.data);
			return dispatch(convertGoogleTokenSuccess(res.data, roleRes.data))
		}).catch(err => {
		console.log(err.response.data);
		return dispatch(convertGoogleTokenFailure(err))
	})

	}).catch(err => {
		console.log(err.response.data);
		return dispatch(convertGoogleTokenFailure(err))
	})

};
