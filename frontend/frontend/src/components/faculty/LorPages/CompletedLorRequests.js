import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {completedLorData} from "../../../actions/lorActions";
import formatFacultyDashboardData from "../../dashboard/formatFacultyDashboardData";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Modal from "react-modal";
import AcceptLorModal from "./AcceptLorModal";

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

class CompletedLorRequests extends Component {
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
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'faculty') {
			console.log('called');
			this.props.completedLorData(this.props.match.params.id)
		}
	}

	render() {
		const viewButton = row => {
			console.log({row: row.value});
			return <button onClick={() => this.openModal(row.value)} className='btn btn-sm btn-primary'
										 style={{overflow:'wrap'}}>View Complete Details</button>
		};
		const {completedRequests, completedLoading} = this.props.faculty;
		let tableData=null, tableContent=null;
		let modalContent = (
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
		let heading=null;
		if (completedLoading || completedRequests === null) {
			heading = (<Spinner/>)
		} else {
			if (completedRequests.length === 0) {
				heading = (
					<h5>No Requests currently</h5>
				);
			} else {
				console.log(completedRequests);
					tableData = formatFacultyDashboardData(completedRequests);
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
					<div className="App-content row d-flex justify-content-between">
						<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Completed Lor Requests
							</button>

						{/*</nav>*/}
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

CompletedLorRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	completedLorData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {completedLorData})(CompletedLorRequests)
