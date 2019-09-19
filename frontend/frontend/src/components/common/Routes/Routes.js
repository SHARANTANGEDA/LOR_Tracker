import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../../dashboard/Dashboard'
import ChangePassword from '../../MyAccount/ChangePassword'
import NotFound from '../../layout/NotFound'
import UploadForm from '../../upload/UploadForm'
import EditProfile from '../../MyAccount/EditProfile'
import CreateLor from '../../student/CreateLor'
import ViewSavedLor from '../../student/ViewSavedLor/ViewSavedLor'
import SubmitLor from '../../student/SubmitLor/SubmitLor'
const Routes = () => {
  return (

    <div className="container-fluid w-100" style={{width:'100%'}}>
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/changePassword' component={ChangePassword}/>
        <PrivateRoute exact path='/uploadForm' component={UploadForm}/>
        <PrivateRoute exact path='/editProfile' component={EditProfile}/>
        <PrivateRoute exact path='/fillLor' component={CreateLor}/>
        <PrivateRoute exact path='/viewMyLor' component={ViewSavedLor}/>
        <PrivateRoute exact path='/submitLor' component={SubmitLor}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
)}

export default Routes