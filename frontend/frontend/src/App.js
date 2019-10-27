import React, {Component} from 'react'
import './App.css'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {autoLogoutUser, setCurrentUser} from './actions/authActions'
import {Provider} from 'react-redux'
import store from './store'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Routes from './components/common/Routes/Routes'
// import Login from './components/layout/Login'
// import Footer from './components/layout/Footer'


//Check for token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(autoLogoutUser());
    window.location.href = '/'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App w-100">
        <NavBar/>
        <Switch>
        {/*<Route exact path="/home" component={Landing}/>*/}
          <Route exact path='/' component={Landing}/>
          {/*<Route exact path='/forgotPassword' component={ForgotPassword}/>*/}
          {/*<Route exact path='/register' component={Register}/>*/}
          <Route component={Routes}/>
        </Switch>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
