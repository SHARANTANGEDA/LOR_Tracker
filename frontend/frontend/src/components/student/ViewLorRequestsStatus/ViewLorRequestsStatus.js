import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {editApplication, getAppliedLors, withdrawApplication} from "../../../actions/lorActions";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import getAppliedLorTableFormat from "./getAppliedLorTableFormat";
import validateEditLorSubmission from "../../../validation/validateEditLorSubmission";
import isEmpty from "../../../validation/is-empty";
import CPTEditSelector from "./CPT/CPTEditSelector";
import Modal from "react-modal";

const customStylesI = {
	content: {
		top: '5%',
		left: '5%',
		right: '5%',
		bottom: '5%',
		marginRight: '0',
		transform: 'translate(-0%, -0%)',
		backgroundColor: 'rgba(255,187,41,0.8)'
	},
};

const customStylesII = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '0',
		transform: 'translate(-50%, -50%)'
	}
};

class ViewLorRequestsStatus extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			currentRow: null,
			editModal: false,
			deleteSpinner: false
		};
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onDone = this.onDone.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
			this.props.getAppliedLors(this.props.match.params.id)
		}
	}

	openModal(e) {
		this.setState({modalIsOpen: true, currentRow: e, editModal: true});
	}

	confirmDelete(e) {
		this.setState({modalIsOpen: true, currentRow: e, editModal: false});
	}

	afterOpenModal() {

	}

	onDone() {
		const errors = validateEditLorSubmission(this.props.checkbox.editData);
		if (!isEmpty(errors)) {
			this.props.checkbox.errors = errors;
		} else {
			console.log(this.state.currentRow);
			this.props.editApplication(this.props.checkbox.editData, this.state.currentRow.faculty.id, this.state.currentRow.lor.id);
			this.setState({currentRow: null, modalIsOpen: false});
		}
	};

	onDelete() {
		this.setState({deleteSpinner: true});
		this.props.withdrawApplication(this.state.currentRow.faculty.id, this.state.currentRow.lor.id)
	};

	closeModal() {
		this.props.checkbox.editData = this.state.currentRow;
		this.setState({modalIsOpen: false, editModal: false, currentRow: null});
	}

	render() {

		let modalContent = null;

		const {appliedLoading, appliedLor} = this.props.lor;
		let heading = null, tableData = null, tableContent = null, modal = null;
		const editButton = row => {
			console.log({row: row.value});
			let data = row.value, status = data.application_status;
			if (status === 'AP' || status === 'AC') {
				return <button style={{background: 'blue', color: 'white', borderRadius: '5px', fontSize: '18px'}}
											 onClick={() => this.openModal(data)} className='btn btn-sm'>
					Edit <i className="fas fa-edit"/></button>
			} else {
				return <span style={{color: 'grey', fontSize: '18px'}}>
				Cannot be edited</span>
			}

		};
		const deleteButton = row => {
			let data = row.value, status = data.application_status;
			console.log({row: row.value});
			if (status === 'AP' || status === 'AC') {
				return <button style={{background: 'red', color: 'white', borderRadius: '5px', fontSize: '18px'}}
											 onClick={() => this.confirmDelete(data)} className='btn btn-sm'>
					Withdraw <i className="fas fa-trash"/></button>
			} else {
				return <span style={{color: 'grey', fontSize: '18px'}}>
					Cannot Withdraw now</span>
			}
		};
		const showApplicationStatus = value => {
			console.log({row: value});
			if (value === 'AP') {
				return <span style={{fontFamily: 'Arial', fontSize: '16px', color: 'blue'}}>Applied</span>
			} else if (value === 'AC') {
				return <span style={{fontFamily: 'Arial', fontSize: '16px', color: 'green'}}>Accepted</span>
			} else if (value === 'RE') {
				return <span style={{fontFamily: 'Arial', fontSize: '16px', color: 'red'}}>Rejected</span>
			} else if (value === 'CO') {
				return <span style={{fontFamily: 'Arial', fontSize: '16px', color: 'green'}}>Done</span>
			} else if (value === 'EX') {
				return <span style={{
					fontFamily: 'Arial', fontSize: '16px', color: 'red', padding: '2px',
					borderRadius: '5px'
				}}>
        Expired before applying</span>
			} else {
				return true
			}
		};
		if (appliedLoading || appliedLor === null) {
			heading = (<Spinner/>)
		} else {
			console.log({DATA: appliedLor});
			if (appliedLor.length === 0) {
				heading = (<h5>No Lors Requested Yet</h5>)
			} else {
				tableData = appliedLor;
				tableData = getAppliedLorTableFormat(tableData);
				tableContent = (
					<ReactTable
						data={tableData}
						filterable
						defaultFilterMethod={(filter, row) =>
							String(row[filter.id]) === filter.value}
						resizable={false}
						style={{minWidth: '100%'}}
						minRows={1}
						columns={[
							{
								// Header: "Name",
								columns: [
									{
										Header: "Faculty Name",
										accessor: "facultyName",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["facultyName"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Faculty Email Address",
										accessor: "facultyEmail",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["facultyEmail"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Lor created on",
										accessor: "createdOn",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["createdOn"]}),
										filterAll: true,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Lor for University",
										accessor: "university",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["university"]}),
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
								// Header: "Info",
								columns: [
									{
										Header: "Application Status",
										accessor: "applicationStatus",
										id: "applicationStatus",
										// Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
										Cell: ({value}) => (
											showApplicationStatus(value)
										),
										filterMethod: (filter, row) => {

											if (filter.value === 'AP') {
												console.log('H1:', filter.value, row.applicationStatus, row.applicationStatus === 'AP')
												return row.applicationStatus === 'AP'
											} else if (filter.value === 'AC') {
												return row.applicationStatus === 'AC'
											} else if (filter.value === 'RE') {
												return row.applicationStatus === 'RE'
											} else if (filter.value === 'CO') {
												return row.applicationStatus === 'CO'
											} else if (filter.value === 'EX') {
												return row.applicationStatus === 'EX'
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
												<option value="AP">Applied</option>
												<option value="AC">Accepted</option>
												<option value="RE">Rejected</option>
												<option value="CO">Done</option>
												<option value="EX">Expired</option>
											</select>
									}
								]
							},
							{
								columns: [
									{
										Header: 'Edit Application',
										accessor: 'editButton',
										filterable: false,
										Cell: row => (editButton(row)),
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								columns: [
									{
										Header: "Withdraw Application",
										accessor: "withdraw",
										filterable: false,
										Cell: row => (deleteButton(row)),
										style: { 'whiteSpace': 'unset' }
									}
								]
							}
						]}
						defaultPageSize={10}
						className="-striped -highlight"
					/>
				);
				if (this.state.currentRow !== null) {

					console.log('content:', this.state.currentRow, 'editData:', this.props.checkbox.editData);
					if (this.state.editModal) {
						this.props.checkbox.editData = this.state.currentRow;
						modalContent = (
							<div className='row container-fluid'>
								<div className="col-md-12 d-flex justify-content-between">
									<button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
													style={{background: 'none', color: 'red', borderStyle: 'none', fontSize: '18px'}}>
										<i className="fas fa-times fa-2x"/>
									</button>
									<button type="submit" onClick={this.onDone} className="btn-sm  text-center"
													style={{background: 'green', color: 'white', borderRadius: '5px', fontSize: '18px'}}>
										Done
									</button>

								</div>
								<div className='row'>
									<CPTEditSelector facultyId={this.state.currentRow.faculty.id} lor_id={this.state.currentRow.lor.id}
																	 editData={this.state.currentRow}/>
								</div>
							</div>
						)
						modal = (
							<Modal
								isOpen={this.state.modalIsOpen}
								onAfterOpen={this.afterOpenModal}
								onRequestClose={this.closeModal}
								style={customStylesI}
								contentLabel="Select Courses and Projects"
								ariaHideApp={false}
							>{modalContent}</Modal>
						)
					} else {
						if (this.state.deleteSpinner) {
							modalContent = (
								<div className='row container-fluid d-flex justify-content-center'>
									<div className='row d-flex justify-content-center'>
										<h5>Withdrawing the application, Please wait....</h5>
									</div>
									<div className='row d-flex justify-content-center'>
										<Spinner/>
									</div>
								</div>
							)
						} else {
							modalContent = (
								<div className='row container-fluid'>
									<h5>Do you wish to Withdraw The Application?</h5>
									<div className="col-md-12 d-flex justify-content-end">
										<button type="submit" onClick={() => this.onDelete()} className="btn-sm  text-center"
														style={{background: 'red', color: 'white', borderRadius: '5px', fontSize: '18px'}}>
											Delete <i className="fas fa-trash-alt"/>
										</button>
										<button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
														style={{background: 'green', color: 'white', borderRadius: '5px', fontSize: '18px'}}>
											Cancel
										</button>
									</div>
								</div>
							)
						}

						modal = (
							<Modal
								isOpen={this.state.modalIsOpen}
								onAfterOpen={this.afterOpenModal}
								onRequestClose={this.closeModal}
								style={customStylesII}
								contentLabel="Select Courses and Projects"
								ariaHideApp={false}
							>{modalContent}</Modal>
						)
					}

				}
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
								}}>View Applied LOR Requests
							</button>
					{heading}
					<div className="App-content row">
						{/*<nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{*/}
						{/*	background: '#ffa726',*/}
						{/*	width: '100%', height: '50px'*/}
						{/*}}>*/}
						{/*	<SearchBar/>*/}
						{/*</nav>*/}
						<div className='App-table row d-flex justify-content-center' style={{minWidth: '100%'}}>
							{tableContent}
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<p className='text-center d-flex justify-content-center' style={{fontStyle: 'italic', fontSize: '11pt'}}>
							Tip: Hold shift when sorting to multi-sort!</p>
					</div>
				</div>
				{modal}
			</div>
		);
	}
}

ViewLorRequestsStatus.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getAppliedLors: PropTypes.func.isRequired,
	checkbox: PropTypes.object.isRequired,
	editApplication: PropTypes.func.isRequired,
	withdrawApplication: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor,
	checkbox: state.checkbox
});
export default connect(mapStateToProps, {getAppliedLors, editApplication, withdrawApplication})(ViewLorRequestsStatus)
