import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import ViewAllRequestsItem from "./ViewAllRequestsItem";
import FilterRequests from "./FilterRequests";

class ViewAllRequests extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filter: null,
			modalIsOpen: false,
			currentData: null
		};
		this.handleClick = this.handleClick.bind(this);
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

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	render() {
		function sort_by_key(array, key) {
			return array.sort(function (a, b) {
				let x = a[key].toUpperCase();
				let y = b[key].toUpperCase();
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn, modalContent;


		let allFoldersContent, heading=null;
		let allRequests = this.props.lor;
		if (allRequests.length === 0) {
				allFoldersContent = (
					<h5>No Requests currently</h5>
				);
			} else {
				if(allRequests[0].type==='all') {
					heading = (<div className='d-flex justify-content-center'>
								<h3 className='text-center'
										style={{fontWeight: 'bold', color: '#ffa726', borderRadius: '5px', padding: '5px'}}>
									Total Applications</h3></div>)
				}else if(allRequests[0].type==='AP') {
					heading = (<div className='d-flex justify-content-center'>
								<h3 className='text-center'
										style={{fontWeight: 'bold', color: '#ffa726', borderRadius: '5px', padding: '5px'}}>
							New Lor Requests</h3></div>)
				}else if(allRequests[0].type==='AC') {
					heading = (<div className='d-flex justify-content-center'>
								<h3 className='text-center'
										style={{fontWeight: 'bold', color: '#ffa726', borderRadius: '5px', padding: '5px'}}>
							Accepted Lor Requests</h3></div>)
				}else if(allRequests[0].type==='CO') {
					heading = (<div className='d-flex justify-content-center'>
								<h3 className='text-center'
										style={{fontWeight: 'bold', color: '#ffa726', borderRadius: '5px', padding: '5px'}}>
							Completed Lor Requests</h3></div>)
				}
				console.log(allRequests);
				const {filterType, sortType, search} = this.props.filterSort;
				let currentFolder = allRequests.slice(indexOfFirstTodo, indexOfLastTodo);
				if(filterType!==null && search!=='') {
					if(filterType.value==='studentId' ) {
							currentFolder = currentFolder.filter(item =>
							item.student_details_profile.student_id.toString().toLowerCase().includes(search.toLowerCase()))
					}else if(filterType.value==='studentName') {
							currentFolder = currentFolder.filter(item => {
								let name = item.student_details_general.first_name.toString() + item.student_details_general.last_name.toString()
								name = name.toLowerCase();
								return name.includes(search.toLowerCase())
							})
					}else if(filterType.value ==='studentEmail') {
							currentFolder = currentFolder.filter(item =>
								item.student_details_general.email.toString().toLowerCase().includes(search.toLowerCase())
							)
					}
				}
				if(sortType!==null) {
					if(sortType === 'studentId') {
						currentFolder = currentFolder.sort((a, b) => {
								let x = a.student_details_profile.student_id.toUpperCase();
								let y = b.student_details_profile.student_id.toUpperCase();
								return ((x < y) ? -1 : ((x > y) ? 1 : 0));
						})
					}else if(sortType === 'studentName'){
						currentFolder = currentFolder.sort((a, b) => {
							let x = a.student_details_general.first_name.toString() + a.student_details_general.last_name.toString();
							x = x.toUpperCase();
							let y = b.student_details_general.first_name.toString() + b.student_details_general.last_name.toString();
							y = y.toUpperCase();
								return ((x < y) ? -1 : ((x > y) ? 1 : 0));
						})
					} else if(sortType === 'incCgpa'){
						currentFolder = currentFolder.sort((a, b) => {
								let x = a.student_details_profile.cgpa;
								let y = b.student_details_profile.cgpa;
								return ((x < y) ? -1 : ((x > y) ? 1 : 0));
						})
					} else if(sortType === 'decCgpa'){
						currentFolder = currentFolder.sort((a, b) => {
								let x = a.student_details_profile.cgpa;
								let y = b.student_details_profile.cgpa;
								return ((x > y) ? -1 : ((x < y) ? 1 : 0));
						})
					} else if(sortType === 'noOfRequests'){
						currentFolder = currentFolder.sort((a, b) => {
								let x = a.noOfRequests;
								let y = b.noOfRequests;
								return ((x > y) ? -1 : ((x < y) ? 1 : 0));
						})
					}
				}

				const render = (currentFolder.map(lor => (
					<ViewAllRequestsItem lorItem={lor} key={currentFolder.indexOf(lor)}/>
				)));
				for (let i = 1; i <= Math.ceil(allRequests.length / todosPerPage); i++) {
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
		return (
			<div className='container-fluid' style={{minWidth: '100%', padding: '0px'}}>
				<div className="displayFolder ">
					<div className="App-content row d-flex justify-content-center">
							{heading}
							<FilterRequests/>
						<div  style={{width:'100%',overflowX:'auto'}}>
						<table className="table table-bordered table-striped mb-0 ">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Id</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Email</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Contact No</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>CGPA</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth:'220px'}}>Graduation Status</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>No of Requests</th>
							</tr>
							</thead>
							<tbody>
							{allFoldersContent}
							</tbody>
						</table>
						</div>
					</div>
					<div className='d-flex justify-content-end'>
						{renderpn}
					</div>
				</div>
			</div>
		);
	}
}

ViewAllRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	filterSort: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty,
	filterSort: state.filterSort
});
export default connect(mapStateToProps)(ViewAllRequests)
