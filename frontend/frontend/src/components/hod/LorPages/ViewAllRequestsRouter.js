import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import formatViewAllRequestsData from "./formatViewAllRequestsData";

class ViewAllRequestsRouter extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			currentData: null
		};
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(e) {
		this.setState({modalIsOpen: true, currentData: e})
	}

	closeModal() {
		this.setState({modalIsOpen: false})
	}

	afterOpenModal() {

	}

	render() {
		let tableData=null, tableContent=null;

		const showApplicationStatus = value => {
			console.log({row: value});
			if (value.graduation_status === true) {
				return <span >
					Completed, Currently pursuing {' '}{value.degree}</span>
			} else if (value.graduation_status === false) {
				return <span >
					Estimated to Complete in{' '} {value.degree}</span>
			} else {
				return true
			}
		};
		let contentHeading, heading=null;
		let allRequests = this.props.lor;
		if (allRequests.length === 0) {
				contentHeading = (
					<h5>No Requests currently</h5>
				);
			} else {
				if(allRequests[0].type==='all') {
					heading = (<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Total Applications
							</button>)
				}else if(allRequests[0].type==='AP') {
					heading = (<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>New Lor Requests
							</button>)
				}else if(allRequests[0].type==='AC') {
					heading = (<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Accepted Lor Requests
							</button>)
				}else if(allRequests[0].type==='CO') {
					heading = (<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Completed Lor Requests
							</button>)
				}
					tableData = formatViewAllRequestsData(allRequests);
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
										Header: "Student ID",
										accessor: "studentId",
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
										Header: "Student Email",
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
										Header: "Student Name",
										accessor: "studentName",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["studentName"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},

							{
								// Header: "Name",
								columns: [
									{
										Header: "Contact No",
										accessor: "contactNo",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["contactNo"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},

							{
								// Header: "Name",
								columns: [
									{
										Header: "CGPA",
										accessor: "cgpa",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["cgpa"]}),
										filterAll: true,
										expander: false,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Info",
								columns: [
									{
										Header: "Graduation Status",
										accessor: "graduationStatus",
										id: "graduationStatus",
										// Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
										Cell: ({value}) => (
											showApplicationStatus(value)
										),
										minWidth: 180,
										filterMethod: (filter, row) => {
											console.log(row.graduationStatus.graduation_status)
											if (filter.value === 'graduated') {
												// console.log('H1:', filter.value, row.graduationStatus, row.graduationStatus === 'AP')
												return row.graduationStatus.graduation_status === true
											} else if (filter.value === 'notGraduated') {
												return row.graduationStatus.graduation_status === false
											}else {
												return true
											}
										},
										Filter: ({filter, onChange}) =>
											<select
												onChange={event => onChange(event.target.value)}
												style={{width: "100%"}}
												value={filter ? filter.value : "all"}
											>
												<option value="all">Show All</option>
												<option value="notGraduated">Not Graduated</option>
												<option value="graduated">Graduated</option>
											</select>
									}
								]
							},
							{
								columns: [
									{
										Header: "No of Requests",
										accessor: "noOfRequests",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["noOfRequests"]}),
										filterAll: true,
										expander: false,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
						]}
						defaultPageSize={10}
						className="-striped -highlight"
					/>
				);
				console.log(allRequests);
			}
		return (
			<div className='container-fluid' style={{minWidth: '100%', padding: '0px'}}>
				<div className="displayFolder ">
					<div className="App-content row d-flex justify-content-center">
							{heading}
						{contentHeading}
						{tableContent}
					</div>
				</div>
			</div>
		);
	}
}

ViewAllRequestsRouter.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty,
});
export default connect(mapStateToProps)(ViewAllRequestsRouter)
