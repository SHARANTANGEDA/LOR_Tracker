import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../../dashboard/Dashboard'
import ChangePassword from '../../MyAccount/ChangePassword'
import NotFound from '../../layout/NotFound'
import UploadForm from '../../upload/UploadForm'
import EditProfile from '../../MyAccount/EditProfile'

const Routes = () => {
  return (

    <div className="container-fluid w-100" style={{width:'100%'}}>
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/changePassword' component={ChangePassword}/>
        <PrivateRoute exact path='/uploadForm' component={UploadForm}/>
        <PrivateRoute exact path='/editProfile' component={EditProfile}/>

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
)}

export default Routes