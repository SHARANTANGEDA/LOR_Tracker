import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getFacultyList} from "../../../actions/lorActions";
import Modal from "react-modal";
import CPTSelector from "./CPT/CPTSelector";
import validateLorSubmission from "../../../validation/validateLorSubmission";
import isEmpty from "../../../validation/is-empty"
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import formatFacultySelector from "./formatFacultySelector";
import "react-table/react-table.css";

const customStyles = {
	content: {
		top: '5%',
		left: '5%',
		right: '5%',
		bottom: '5%',
		marginRight: '0',
		transform: 'translate(-0%, -0%)',
		backgroundColor: 'rgba(255,167,38,0.8)'
	},
};

class FacultySelector extends Component {
	constructor() {
		super();
		this.state = {
			selected: false,
			modalIsOpen: false,
			currentFid: '',
			currentIndex:''
		};
		this.onSelect = this.onSelect.bind(this);
    this.onUnSelect = this.onUnSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

	}

	openModal (e) {
    let getSelected = this.props.checkbox.selected;
    this.setState({selected: true});
		let data = {
			faculty_id:e,
			courses_done:[],
			projects_done: [],
			thesis_done: [],
			status: false,
			others: ''
		};
    getSelected.push(data);
    this.props.checkbox.selected = getSelected;
    console.log(this.props.checkbox.selected);
    this.setState({ modalIsOpen: true , currentFid: e,currentIndex: getSelected.length-1});

  }
	afterOpenModal () {

  }
	closeModal () {
		const errors=validateLorSubmission(this.props.checkbox.selected);
		if(!isEmpty(errors)) {
			console.log(errors)
			this.props.checkbox.errors=errors;
		}else {
			this.setState({ modalIsOpen: false });
		}
  }
  onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}
	onSelect (e) {
    this.setState({selected: true});
    let getSelected = this.props.checkbox.selected;
    getSelected.push(e);
    this.props.checkbox.selected = getSelected
  }

  onUnSelect (e) {
    this.setState({selected: false});
		this.props.checkbox.selected= this.props.checkbox.selected.filter( item => item.faculty_id!==e);
    console.log(this.props.checkbox.selected)
  }
	render() {
		const {facLoading, facList} = this.props.lor;

		let heading=null, tableData=null, tableContent=null;
		let modalContent = (
				<div className='row container-fluid'>
					<div className="col-md-12 d-flex justify-content-end">
						<button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
							Done
						</button>

					</div>
					<div className='row'>
						<CPTSelector facultyId={this.state.currentFid} selectionIndex={this.state.currentIndex}/>
					</div>
				</div>
			);
		const selectFacultyContent = faculty => {
			if (this.props.checkbox.selected.filter( item => item.faculty_id===faculty.id).length===0) {
				return (
					<button onClick={() => this.openModal(faculty.id)} style={{background:'white', color:'blue', borderStyle:'none'}}>
          <i className="far fa-check-square fa-2x"/></button>
				)
			} else {
				return (
					<button  onClick={() => this.onUnSelect(faculty.id)} style={{background:'white', color:'blue', borderStyle:'none'}}>
        <i className="fas fa-check-square fa-2x"/></button>
				)
			}
		};
		if (facLoading || facList === null) {
			heading = (<Spinner/>)

		} else {
			if (facList.length === 0) {
				heading = (
					<h5>Amazing!!, No Faculty available:)</h5>
				);
			} else {
				heading=null;
				tableData = formatFacultySelector(facList);
				tableContent = (
					<ReactTable
						data={tableData}
						filterable
						defaultFilterMethod={(filter, row) =>
							String(row[filter.id]) === filter.value}
						style={{overflowX:'auto'}}
						minRows={1}
						columns={[
							{
								// Header: "Name",
								columns: [
									{
										Header: "Select Faculty",
										accessor: "selectFaculty",
										Cell: ({value}) => (
											selectFacultyContent(value)
										),
										filterable: false
									}
								]
							},
							{
								columns: [
									{
										Header: "Faculty Name",
										accessor: "facultyName",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["facultyName"]}),
										filterAll: true,
										minWidth: 300,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								columns: [
									{
										Header: "Email Address",
										accessor: "facultyEmail",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["facultyEmail"]}),
										filterAll: true,
										minWidth: 225,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Department",
										accessor: "departmentName",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["departmentName"]}),
										filterAll: true,
										minWidth: 225,
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
			<div className='container-fluid ' style={{minWidth:'100%', padding:'0px', margin:'0px'}}>
				<div className="row col-md-12">
							<p style={{color:'red', fontStyle:'italic', fontSize:'14px'}}>
								*It is recommended that you add at least one of the courses,
								projects or thesis done with the faculty for the Lor request to be accepted
							</p>
						</div>
				{heading}
				<div className="displayFolder col-md-12">
					<div className="App-content row d-flex justify-content-center" style={{minWidth:'100%'}}>
						{tableContent}
					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Select Courses and Projects"
					shouldCloseOnOverlayClick={false}
					modalOptions={{ dismissible: false }}
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>{modalContent}</Modal>
			</div>
		);
	}
}

FacultySelector.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getFacultyList: PropTypes.func.isRequired,
	checkbox: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor,
	checkbox: state.checkbox
});
export default connect(mapStateToProps, {getFacultyList})(FacultySelector)
