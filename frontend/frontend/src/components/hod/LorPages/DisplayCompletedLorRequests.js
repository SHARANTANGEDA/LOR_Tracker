import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getAllCompletedRequests} from "../../../actions/lorActions";
import ViewAllRequests from "./ViewAllRequestsRouter";

class DisplayCompletedLorRequests extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			this.props.getAllCompletedRequests(this.props.match.params.id)
		}
	}

	render() {
		const {completedRequests, completedLoading} = this.props.faculty;
		if (completedLoading || completedRequests === null) {
			return (<Spinner/>)
		} else {
			return (<ViewAllRequests lor={completedRequests}/>)
		}
	}
}

DisplayCompletedLorRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAllCompletedRequests: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAllCompletedRequests})(DisplayCompletedLorRequests)
