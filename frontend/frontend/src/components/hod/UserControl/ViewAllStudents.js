import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getStudents} from "../../../actions/hodActions";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Modal from "react-modal";
import formatUserProfileData from "./formatUserProfileData";
import ViewStudentProfileModal from "./ViewStudentProfileModal";

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '0',
		transform: 'translate(-50%, -50%)'
	}
};


class ViewAllStudents extends Component {
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

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			console.log('called');
			this.props.getStudents(this.props.match.params.id)
		}
	}

	render() {
		const {student, studentLoading} = this.props.hod;
		const showApplicationStatus = value => {
			console.log({row: value});
			if (value.graduation_status === true) {
				return <span>
					Completed, Currently pursuing {' '}{value.degree}</span>
			} else if (value.graduation_status === false) {
				return <span>
					Estimated to Complete in{' '} {value.degree}</span>
			} else {
				return true
			}
		};
		const viewButton = row => {
			console.log({row: row.value});
			return <button onClick={() => this.openModal(row.value)} className='btn btn-sm btn-primary'
										 style={{overflow: 'wrap'}}>View Complete Details</button>
		};
		let heading = null, tableData = null, tableContent = null, modalContent = null;
		if (studentLoading || student === null) {
			heading = (<Spinner/>)
		} else {
			if (student.length === 0) {
				heading = (
					<h5>No Requests currently</h5>
				);
			} else {
				if (this.state.currentData !== null) {
					modalContent = (
						<div id="mainbar" className='row d-flex justify-content-start'>
							<div className="col-md-12 d-flex justify-content-between" style={{width: '100%', margin: '5px'}}>
								<button
									className="rounded border d-flex justify-content-start align-items-center flex-grow-1 pl-1 w-100 my-3"
									style={{
										boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
											'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
										fontSize: '25px', background: '#000d69', color: 'white'
									}}>Complete Details:
								</button>
								<button onClick={this.closeModal} className='btn btn-sm' style={{background: 'white', color: 'red'}}>
									<i className="fas fa-times fa-2x"/>
								</button>
							</div>
							<ViewStudentProfileModal content={this.state.currentData}/>
						</div>
					);
				}
				console.log(student)
				tableData = formatUserProfileData(student);
				tableContent = (
					<ReactTable
						data={tableData}
						filterable
						defaultFilterMethod={(filter, row) =>
							String(row[filter.id]) === filter.value}
						style={{overflow: 'wrap', minWidth: '100%'}}
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
										style: {'whiteSpace': 'unset'}
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
										style: {'whiteSpace': 'unset'}
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
										style: {'whiteSpace': 'unset'}
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
										style: {'whiteSpace': 'unset'}
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
										style: {'whiteSpace': 'unset'}
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
											} else {
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
										Header: "View Requests",
										accessor: "viewProfile",
										filterable: false,
										Cell: row => (viewButton(row)),
										style: {'whiteSpace': 'unset'}
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
				<div className="displayFolder ">
					<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>View All Students
							</button>
					<div className="App-content row d-flex justify-content-between">
						{heading}
						{tableContent}
					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Student Details"
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>{modalContent}</Modal>
			</div>
		);
	}
}

ViewAllStudents.propTypes = {
	auth: PropTypes.object.isRequired,
	hod: PropTypes.object.isRequired,
	getStudents: PropTypes.func.isRequired
};
const
	mapStateToProps = state => ({
		auth: state.auth,
		hod: state.hod
	});
export default connect(mapStateToProps, {getStudents})(ViewAllStudents)
