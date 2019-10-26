import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {completedLorData, getAllCompletedRequests, getAllRequests} from "../../../../actions/lorActions";
import SearchBar from "../../../dashboard/SearchBar";
import ViewAllRequestsItem from "./ViewAllRequestsItem";

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

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'hod') {
			console.log('called');
			this.props.getAllRequests(this.props.match.params.id)
		}
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

		const {allRequests, allRequestsLoading} = this.props.faculty;
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn, modalContent;


		let allFoldersContent, heading;
		if (allRequestsLoading || allRequests === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			if (allRequests.length === 0) {
				allFoldersContent = (
					<h5>No Requests currently</h5>
				);
			} else {
				console.log(allRequests)

				const currentFolder = allRequests.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(lor => (
					// <ProductCard folder={land} key={land._id}/>
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
		}
		return (
			<div className='container-fluid' style={{minWidth: '100%', padding: '0px'}}>
				<div className="displayFolder ">
					<div className="App-content row d-flex justify-content-between">
						<nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{
							background: '#ffa726',
							width: '100%', height: '50px'
						}}>
							<SearchBar/>

						</nav>
						<table className="table table-bordered table-striped mb-0">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Id</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Email</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Faculty Email</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Faculty Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Purpose</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Requested On</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Deadline for Application</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Application Status</th>
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
			</div>
		);
	}
}

ViewAllRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	faculty: PropTypes.object.isRequired,
	getAllRequests: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	faculty: state.faculty
});
export default connect(mapStateToProps, {getAllRequests})(ViewAllRequests)
