import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import Select from 'react-select'
import Warning from '../../layout/Warning'
import 'react-dates/initialize'
import {DateRangePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {getSavedLor} from "../../../actions/lorActions";
import SearchBar from "../../dashboard/SearchBar";
import SavedLorItem from "./SavedLorItem";
class ViewSavedLor extends Component {
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
			console.log('called')
			this.props.getSavedLor(this.props.match.params.id)
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

		const {lorLoading, savedLor} = this.props.lor;
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn;
		let allFoldersContent, heading;
		if (lorLoading || savedLor === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			if (savedLor.length === 0) {
				allFoldersContent = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				const currentFolder = savedLor.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(lor => (
					// <ProductCard folder={land} key={land._id}/>
					<SavedLorItem lorItem={lor} key={lor.id}/>
				)));
				for (let i = 1; i <= Math.ceil(savedLor.length / todosPerPage); i++) {
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
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Purpose</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>University Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Program Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>deadline</th>
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

ViewSavedLor.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getSavedLor: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor
});
export default connect(mapStateToProps, {getSavedLor})(ViewSavedLor)
