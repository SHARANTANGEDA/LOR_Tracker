import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import Select from 'react-select'
import 'react-dates/initialize'
import {DateRangePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {getAppliedLors, getSavedLor} from "../../../actions/lorActions";
import SearchBar from "../../dashboard/SearchBar";
import SavedLorItem from "../ViewSavedLor/SavedLorItem";
import LorRequestsItem from "./LorRequestsItem";
class ViewLorRequestsStatus extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filter: null
		};
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
			this.props.getAppliedLors(this.props.match.params.id)
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

		const {appliedLoading, appliedLor} = this.props.lor;
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn;
		let allFoldersContent, heading;
		if (appliedLoading || appliedLor === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			console.log({DATA: appliedLor})
			if (appliedLor.length === 0) {
				allFoldersContent = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				const currentFolder = appliedLor.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(application => (
					<LorRequestsItem application={application} key={currentFolder.indexOf(application)}/>
				)));
				for (let i = 1; i <= Math.ceil(appliedLor.length / todosPerPage); i++) {
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
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Faculty Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>Faculty Email Address</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Purpose</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor created on</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor for University</th>
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

ViewLorRequestsStatus.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getAppliedLors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor
});
export default connect(mapStateToProps, {getAppliedLors})(ViewLorRequestsStatus)
