import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getFacultyList} from "../../../actions/lorActions";
import classnames from "classnames";
import returnFilterList from '../../../utils/returnFilterList'
import Modal from "react-modal";
import CPTSelector from "./CPT/CPTSelector";
import validateLorSubmission from "../../../validation/validateLorSubmission";
import isEmpty from "../../../validation/is-empty"
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
	// overlay: {
  //     position: 'fixed',
  //     top: '5px',
  //     left: '1px',
  //     right: '1px',
  //     bottom: '1px',
  //     backgroundColor: '#a0a79f'
  //   },
};

class FacultySelector extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filterFaculty:'',
			filter: null,
			state: null,
			selected: false,
			modalIsOpen: false,
			currentFid: '',
			currentIndex:''
		};
		this.handleClick = this.handleClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
    this.onUnSelect = this.onUnSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
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
		function sort_by_key(array, key) {
			return array.sort(function (a, b) {
				let x = a[key].toUpperCase();
				let y = b[key].toUpperCase();
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}

		const {facLoading, facList} = this.props.lor;
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn, allFoldersContent;
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
			)
		if (facLoading || facList === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			let filterList=facList;

			if(this.state.filterFaculty.length!==0) {
				filterList=returnFilterList(facList,this.state.filterFaculty)
			}
			if (filterList.length === 0) {
				allFoldersContent = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				const currentFolder = filterList.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(faculty => (
					<tr key={faculty.id}>
						{this.props.checkbox.selected.filter( item => item.faculty_id===faculty.id).length===0 ?
							<td><button onClick={() => this.openModal(faculty.id)} style={{background:'white', color:'blue', borderStyle:'none'}}>
          <i className="far fa-check-square fa-2x"/></button></td> :
						<td onClick={() => this.onUnSelect(faculty.id)}><button style={{background:'white', color:'blue', borderStyle:'none'}}>
        <i className="fas fa-check-square fa-2x"/></button></td>}
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.first_name + ' '+faculty.last_name}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.email}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.department_name}</span></td>
					{/*	<td><button type="submit" onClick={() => this.openModal(faculty.id)} className="btn-sm  text-center"*/}
					{/*		style={{border: 'none',background: 'green', color: 'white'}}>*/}
					{/*<i className="fas fa-plus"/>Add*/}
					{/*</button></td>*/}
					{/*	<td><button type="submit" onClick={() => this.openModal(faculty.id)} className="btn-sm  text-center"*/}
					{/*style={{border: 'none',background: 'green', color: 'white'}}>*/}
					{/*<i className="fas fa-plus"/>Add*/}
					{/*	</button></td>*/}
					{/*	<td><button type="submit" onClick={() => this.openModal(faculty.id)} className="btn-sm  text-center"*/}
					{/*				style={{border: 'none',background: 'green', color: 'white'}}>*/}
					{/*	<i className="fas fa-plus"/>Add*/}
					{/*</button></td>*/}
					</tr>
				)));
				for (let i = 1; i <= Math.ceil(filterList.length / todosPerPage); i++) {
					pageNumbers.push(i);
				}
				const renderPageNumbers = (
					pageNumbers.map(number => {
						return (
							<button className='page-item page-link'
											key={number}
											id={number}
											onClick={this.handleClick}
							>
								{number}
							</button>
						);
					}));
				allFoldersContent = render;
				renderpn = (
					<nav aria-label="...">
						<ul className="pagination pagination-sm">
							{renderPageNumbers}
						</ul>
					</nav>

				)

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
				<nav className='navbar navbar-expand-sm   ' style={{background: '#ffa726', width: '100%'}}>
						<div className="row container-fluid d-flex justify-content-between col-md-6">
          <div className=" input-group md-form form-sm form-2 pl-0" style={{ width: '500px', maxWidth: '700px' }}>
            <input type="text"
                   className={classnames('form-control my-0 py-1 lime-border')}
                   placeholder="Search"
                   name="search"
                   value={this.state.filterFaculty} onChange={this.onChange}/>
            <div className="input-group-append">
              <button type="submit" onClick={this.onUnSelect} className="input-group-text cyan lighten-2">
                <i className="fas fa-search text-grey" aria-hidden="true"/>filter
              </button>
            </div>
          </div>
        	</div>
				</nav>
				<div className="displayFolder col-md-12">
					<div className="App-content row d-flex justify-content-between">
						<table className="table table-bordered table-striped mb-0 col-md-12">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Select Faculty</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth:'180px'}}>Name of Faculty</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth:'200px'}}>Email Address</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Department</th>
								{/*<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Courses Done</th>*/}
								{/*<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Projects Done</th>*/}
								{/*<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Thesis Done</th>*/}
							</tr>
							</thead>
							<tbody>
							{allFoldersContent}
							</tbody>
						</table>
					</div>
					<div className='d-flex justify-content-end'>
						{renderpn}
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
