import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'
import accountReducer from './accountReducer'
import resetPasswordReducer from './resetPasswordReducer'
import lorReducer from "./lorReducer";
import checkboxReducer from "./checkboxReducer";
import facultyReducer from "./facultyReducer";
import hodReducer from "./hodReducer";
import googleInfoReducer from './googleInfoReducer'

export default combineReducers({
  auth: googleInfoReducer,
  errors: errorReducer,
  home: homeReducer,
  search: searchReducer,
  account: accountReducer,
  reset: resetPasswordReducer,
  lor: lorReducer,
  checkbox: checkboxReducer,
  faculty: facultyReducer,
  hod: hodReducer
  // google: googleInfoReducer
})