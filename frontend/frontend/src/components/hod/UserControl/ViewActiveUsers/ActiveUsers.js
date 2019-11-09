import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../../common/Spinner'
import {getActiveUsers} from "../../../../actions/hodActions";
import formatActiveUsersData from "../../../dashboard/formatActiveUsersData";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

class ActiveUsers extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			console.log('called');
			this.props.getActiveUsers(this.props.match.params.id)
		}
	}


	render() {
		const {activeUsers, activeUsersLoading} = this.props.hod;
		let heading=null, tableData=null, tableContent=null, userCnt=0;
		if (activeUsersLoading || activeUsers === null) {
			heading = (<Spinner/>)
		} else {
			if (activeUsers.activeUserCnt === 0) {
				heading = (
					<h5>No Currently Active Users</h5>
				);
			} else {
				userCnt = activeUsers.activeUserContent.length;
				tableData = formatActiveUsersData(activeUsers.activeUserContent);
					tableContent = (
						<ReactTable
							data={tableData}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							style={{overflow:'wrap', minWidth:'100%'}}
							minRows={1}
							columns={[
								{
									// Header: "Name",
									columns: [
										{
											Header: "User Id",
											accessor: "userId",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["studentId"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Email Address",
											accessor: "email",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["email"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "First Name",
											accessor: "firstName",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["firstName"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Last Name",
											accessor: "lastName",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["lastName"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Role",
											accessor: "role",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["role"]}),
											filterAll: true,
											expander: false,
											style: { 'whiteSpace': 'unset' }
										}
									]
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
					);
			}
		}
		return (
			<div className='container-fluid' style={{minWidth: '100%', padding: '0px'}}>
				<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Currently Active Users - {userCnt}
							</button>
				<div className="displayFolder ">
					{heading}
					<div className="App-content row d-flex justify-content-between">
						{tableContent}
					</div>
				</div>
			</div>
		);
	}
}

ActiveUsers.propTypes = {
	auth: PropTypes.object.isRequired,
	hod: PropTypes.object.isRequired,
	getActiveUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	hod: state.hod
});
export default connect(mapStateToProps, {getActiveUsers})(ActiveUsers)
