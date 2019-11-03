import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getAllAcceptedRequests,} from "../../../actions/lorActions";
import ViewAllRequests from "./ViewAllRequests/ViewAllRequests";


class DisplayAcceptedLorRequests extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			this.props.getAllAcceptedRequests(this.props.match.params.id)
		}
	}
	render() {
		const {acceptedRequests, acceptedLoading} = this.props.faculty;
		if (acceptedLoading || acceptedRequests === null) {
			return (<Spinner/>)
		} else {
			return (<ViewAllRequests lor={acceptedRequests}/>)
		}
	}
}

DisplayAcceptedLorRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAllAcceptedRequests: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAllAcceptedRequests})(DisplayAcceptedLorRequests)
