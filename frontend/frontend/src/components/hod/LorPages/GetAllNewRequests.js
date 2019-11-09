import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getAllNewRequestsHod,} from "../../../actions/lorActions";
import ViewAllRequests from "./ViewAllRequestsRouter";

class GetAllNewRequests extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			console.log('called')
			this.props.getAllNewRequestsHod(this.props.match.params.id)
		}
	}
	render() {
		const {loading, newRequests} = this.props.faculty;
				let allFoldersContent;
		if (loading || newRequests === null) {
			return (<Spinner/>)
		} else {
			return (<ViewAllRequests lor={newRequests}/>)
		}
	}
}

GetAllNewRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAllNewRequestsHod: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAllNewRequestsHod})(GetAllNewRequests)
