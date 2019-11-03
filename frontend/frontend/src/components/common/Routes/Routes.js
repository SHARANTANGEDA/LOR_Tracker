import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../../dashboard/Dashboard'
import ChangePassword from '../../MyAccount/ChangePassword'
import NotFound from '../../layout/NotFound'
import UploadForm from '../../upload/UploadForm'
import EditProfile from '../../MyAccount/EditProfile'
import CreateLor from '../../student/CreateLor'
import ViewSavedLor from '../../student/ViewSavedLor/ViewSavedLor'
import SubmitLor from '../../student/SubmitLor/SubmitLor'
import ViewLorRequestsStatus from '../../student/ViewLorRequestsStatus/ViewLorRequestsStatus'
import AcceptLorRequests from '../../faculty/LorPages/AcceptLorRequests'
import AcceptedLorRequests from '../../faculty/LorPages/AcceptedLorRequests/AcceptedLorRequests'
import CompletedLorRequests from "../../faculty/LorPages/CompletedLorRequests/CompletedLorRequests";
import GetAllNewRequests from "../../hod/LorPages/GetAllNewRequests"
import DisplayCompletedLorRequests from "../../hod/LorPages/DisplayCompletedLorRequests"
import DisplayAcceptedLorRequests from "../../hod/LorPages/DisplayAcceptedLorRequests"
import DisplayLorRequests from "../../hod/LorPages/DisplayLorRequests"
import ViewAllStudents from "../../hod/UserControl/GetAllStudents/ViewAllStudents"
import ActiveUsers from "../../hod/UserControl/ViewActiveUsers/ActiveUsers"

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
        <PrivateRoute exact path='/viewAppliedLor' component={ViewLorRequestsStatus}/>
        <PrivateRoute exact path='/viewNewRequests' component={AcceptLorRequests}/>
        <PrivateRoute exact path='/viewAcceptedLorRequests' component={AcceptedLorRequests}/>
        <PrivateRoute exact path='/completedLorRequests' component={CompletedLorRequests}/>
        <PrivateRoute exact path='/viewAllCompletedRequests' component={DisplayCompletedLorRequests}/>
        <PrivateRoute exact path='/viewAllNewRequests' component={GetAllNewRequests}/>
        <PrivateRoute exact path='/viewAllAcceptedRequests' component={DisplayAcceptedLorRequests}/>
        <PrivateRoute exact path='/viewAllRequests' component={DisplayLorRequests}/>
        <PrivateRoute exact path='/viewAllStudents' component={ViewAllStudents}/>
        <PrivateRoute exact path='/viewCurrentActiveUsers' component={ActiveUsers}/>

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
)};

export default Routes