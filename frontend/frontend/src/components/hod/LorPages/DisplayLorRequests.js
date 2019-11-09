import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getAllRequests} from "../../../actions/lorActions";
import ViewAllRequests from "./ViewAllRequestsRouter";

class DisplayLorRequests extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			console.log('called');
			this.props.getAllRequests(this.props.match.params.id)
		}
	}


	render() {
		const {allRequests, allRequestsLoading} = this.props.faculty;
		console.log({here: allRequests})
		if (allRequestsLoading || allRequests === null) {
			return (<Spinner/>)
		} else {
			return (<ViewAllRequests lor={allRequests}/>)
		}
	}
}

DisplayLorRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAllRequests: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAllRequests})(DisplayLorRequests)
