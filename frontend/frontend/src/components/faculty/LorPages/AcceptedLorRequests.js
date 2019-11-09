import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getAcceptedLorData} from "../../../actions/lorActions";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import AcceptLorModal from "./AcceptLorModal";
import Modal from "react-modal";
import formatFacultyAcceptedLorData from "../formatFacultyAcceptedLorData";
import {markAsComplete} from "../../../actions/homeActions";

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


class AcceptedLorRequests extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			currentData: null
		};
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onComplete = this.onComplete.bind(this)
	}

	openModal(e) {
		this.setState({modalIsOpen: true, currentData: e})
	}

	closeModal() {
		this.setState({modalIsOpen: false, rejectionModal: false, currentData: null})
	}

	afterOpenModal() {

	}


	onComplete(e) {
		console.log(e.application_details.lor, e.application_details.faculty)
		this.props.markAsComplete(e.application_details.lor, e.application_details.faculty)
	}


	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'faculty') {
			console.log('called');
			this.props.getAcceptedLorData(this.props.match.params.id)
		}
	}

	render() {
		const viewButton = row => {
			console.log({row: row.value});
			return <button onClick={() => this.openModal(row.value)} className='btn btn-sm btn-primary'
										 style={{overflow:'wrap'}}>View Complete Details</button>
		};
		const markAsCompleteButton = row => {
			console.log({row: row.value});
			return <button onClick={() => this.onComplete(row.value)} className='btn btn-sm btn-primary'
										 style={{background: 'green', color: 'white'}}>Mark as Complete</button>
		};

		const {acceptedRequests, acceptedLoading} = this.props.faculty;
		let tableData=null, tableContent=null;
		let heading=null, modalContent=null;
		if(this.state.currentData!==null) {
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
				<AcceptLorModal content={this.state.currentData}/>
			</div>
		);
		}
		if (acceptedLoading || acceptedRequests === null) {
			heading = (<Spinner/>)
		} else {
			if (acceptedRequests.length === 0) {
				heading = (
					<h5>No Requests currently</h5>
				);
			} else {
					tableData = formatFacultyAcceptedLorData(acceptedRequests);
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
										Header: "Lor Purpose",
										accessor: "purpose",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["purpose"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},

							{
								// Header: "Name",
								columns: [
									{
										Header: "Deadline to apply",
										accessor: "deadline",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["deadline"]}),
										filterAll: true,
										expander: false,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								columns: [
									{
										Header: "Mark As Complete",
										accessor: "markAsComplete",
										filterable: false,
										Cell: row => (markAsCompleteButton(row)),
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								columns: [
									{
										Header: "View Requests",
										accessor: "viewButton",
										filterable: false,
										Cell: row => (viewButton(row)),
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
				<div className="displayFolder ">
					<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Accepted Lor Requests
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

AcceptedLorRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAcceptedLorData: PropTypes.func.isRequired,
	markAsComplete: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAcceptedLorData, markAsComplete})(AcceptedLorRequests)
