import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'
import accountReducer from './accountReducer'
import resetPasswordReducer from './resetPasswordReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  home: homeReducer,
  search: searchReducer,
  account: accountReducer,
  reset: resetPasswordReducer
})