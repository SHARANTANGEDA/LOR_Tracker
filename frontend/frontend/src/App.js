import React, {Component} from 'react'
import './App.css'
import {Provider} from 'react-redux'
import store from './store'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import URLSearchParams from "url-search-params";
import Routes from './components/common/Routes/Routes'
import Sidebar from "./components/layout/Sidebar";
import {convertGoogleToken, googleLogoutAction, setCurrentUserGoogle} from "./actions/googleAuthActions";

//Check for token
// if(localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(decoded));
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(autoLogoutUser());
//     window.location.href = '/'
//   }
// }


if (localStorage.getItem("google_access_token") &&localStorage.length > 0) {
  const tokenExpirationTime = localStorage.getItem(
    "google_access_token_expires_in"
  );
  // get the current unix epoch time in seconds
  const currentTime = Math.round(new Date().getTime() / 1000);
  const timeLeft = tokenExpirationTime - currentTime;
  console.log("token time left =======>", timeLeft);
  // check if the token is expired, if so log the user out
  if (tokenExpirationTime && tokenExpirationTime - currentTime <= 0) {
    console.log("TOKEN IS EXPIRED");
    localStorage.removeItem("google_access_token_conv");
    localStorage.removeItem("google_refresh_token_conv");
    localStorage.removeItem("google_access_token_expires_in");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    store.dispatch(googleLogoutAction());
    window.location.href = '/';
  }else {
    store.dispatch(setCurrentUserGoogle())
  }
  if (tokenExpirationTime && tokenExpirationTime - currentTime <= 1800) {
    let searchParams = new URLSearchParams();
    searchParams.set("grant_type", "refresh_token");
    searchParams.set("refresh_token", localStorage.getItem("google_refresh_token"));
    store.dispatch(convertGoogleToken());
    //   fetch(`${url}/auth/token/`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     body: searchParams
    //   })
    //     .then(response => response.json())
    //     .then(json => dispatch(convertGoogTokenSuccess(json)))
    //     .then(() => next(action));
    // } else {
    //   return next(action);
    // }
  }
}


class App extends Component {
  constructor(props) {
  super(props);
  this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}
  render() {
    return (
      <Provider store={store}>
      <Router >
      <div className="App w-100 " style={{width:this.state.width, height: this.state.height, overflow: 'scroll'}}>
        <NavBar/>
        <Switch>
        {/*<Route exact path="/home" component={Landing}/>*/}
          <Route exact path='/' component={Landing}/>
          {/*<Route exact path='/forgotPassword' component={ForgotPassword}/>*/}
          {/*<Route exact path='/register' component={Register}/>*/}
          <div className='wrapper' style={{width:this.state.width, height: this.state.height, overflow: 'scroll'}}>
             <Sidebar/>
          <Route component={Routes}/>
          </div>
        </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
