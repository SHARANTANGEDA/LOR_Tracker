import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {deleteLor, getSavedLor, getUniversitiesList} from "../../../actions/lorActions";
import convertToSelectArray from "../../../utils/convertToSelectArray";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import formatSavedLorData from "./formatSavedLorData";
import EditLorModal from "./EditLorModal";
import Modal from "react-modal";

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

class ViewSavedLor extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filter: null,
			modalIsOpen: false,
			editModal: false,
			currentLor: null,
			toDeleteLorId: null
		};
		this.handleClick = this.handleClick.bind(this);
			this.openModal = this.openModal.bind(this)
		this.editModal = this.editModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
			console.log('called')
			this.props.getSavedLor(this.props.match.params.id)
			this.props.getUniversitiesList(this.props.match.params.id)
		}
	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}
	openModal(id) {
    this.setState({modalIsOpen: true, editModal: false,toDeleteLorId: id})
  }
  editModal(data) {
  	this.setState({editModal: true, modalIsOpen: true, currentLor: data})
	}
  closeModal() {
    this.setState({modalIsOpen: false, editModal: false, currentLor: null, toDeleteLorId: null})
  }
  afterOpenModal() {}
	onDelete(id) {
    this.props.deleteLor(id)
  }
	render() {
		const editButton = row => {
			console.log({row: row.value});
			return <button style={{color: 'white', background: 'blue', borderRadius: '5px', fontSize:'18px'}}
										 onClick={() => this.editModal(row.value)} className='btn btn-sm'>
				Edit <i className="fas fa-edit"/></button>
		};
		const deleteButton = row => {
			console.log({row: row.value});
			return <button  onClick={() => this.openModal(row.value)} className='btn btn-sm'
				style={{background: 'red', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
							Delete <i className="fas fa-trash-alt"/></button>
		};
const lorStatus = value => {
			console.log({row: value});
    if(value==='expired') {
      return <span style={{ fontFamily: 'Arial', fontSize: '16px', color: 'red'}}>Expired</span>;
    }else {
			return <span style={{fontFamily: 'Arial', fontSize: '16px', color: 'green'}}>Active</span>
		}
		};
		const {lorLoading, savedLor, univ, loading} = this.props.lor;
		let heading=null, tableData=null, tableContent=null;
		let modalContent = null;
		if (lorLoading || loading || univ===null|| savedLor === null) {
			heading = (<Spinner/>)
		} else {
			if (savedLor.length === 0) {
				heading = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				let univList;
				if(univ === []) {
					univList = []
				}else {
					univList = convertToSelectArray(univ)
				}
				if(this.state.editModal) {
					modalContent = (<EditLorModal lorItem={this.state.currentLor} univ={univList}/>)
				}else {
					modalContent = (
						<div className='row container-fluid'>
							<h5>Do you wish to delete the Lor?</h5>
							<div className="col-md-12 d-flex justify-content-end">
								<button type="submit" onClick={() =>this.onDelete(this.state.toDeleteLorId)} className="btn-sm  text-center"
												style={{background: 'red', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
									Delete <i className="fas fa-trash-alt"/>
								</button>
								<button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
												style={{background: 'green', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
									Cancel
								</button>
							</div>
						</div>
					)
				}
				tableData = formatSavedLorData(savedLor);
				tableContent = (
					<ReactTable
						data={tableData}
						filterable
						defaultFilterMethod={(filter, row) =>
							String(row[filter.id]) === filter.value}
						style={{overflow:'wrap', minWidth: '100%'}}
						minRows={1}
						columns={[
							{
								// Header: "Name",
								columns: [
									{
										Header: "Purpose",
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
										Header: "University Name",
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
										Header: "Program Name",
										accessor: "programName",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["programName"]}),
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
										Header: "Status",
										accessor: "status",
										id: "status",
										// Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
										Cell: ({value}) => (
											lorStatus(value)
										),
										filterMethod: (filter, row) => {
											console.log(filter.value, row.status);
											if (filter.value === 'expired') {
												return row.status === 'expired'
											} else if (filter.value === 'active') {
												return row.status === 'active'
											} else {
												return true
											}
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                    </select>
									}
								]
							},
							{
								columns: [
									{
										Header: 'Edit Lor',
										accessor: 'editLor',
										filterable: false,
										Cell: row => (editButton(row))
									}
								]
							},
							{
								columns: [
									{
										Header: "Delete Lor",
										accessor: "deleteLor",
										filterable: false,
										Cell: row => (deleteButton(row))
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
					<div className="App-content row d-flex justify-content-center">
							<button
								className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Saved Letter of Recommendations
							</button>
						{/*<h3 className='text-center'>Saved Letter of Recommendations</h3>*/}
						{heading}
					</div>
						<h5 style={{color:'red', fontStyle:'italic'}}>
							**Editing your saved Lor will also change details in the submitted application, It is advised not to make edits repeatedly</h5>
						{tableContent}
				</div>
				 <Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Saved Lor"
					ariaHideApp={false}
				>{modalContent}</Modal>
			</div>
		);
	}
}

ViewSavedLor.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getSavedLor: PropTypes.func.isRequired,
	getUniversitiesList: PropTypes.func.isRequired,
	deleteLor: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor
});
export default connect(mapStateToProps, {getSavedLor, getUniversitiesList, deleteLor})(ViewSavedLor)
