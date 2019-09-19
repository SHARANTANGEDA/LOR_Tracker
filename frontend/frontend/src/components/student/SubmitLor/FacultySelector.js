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
import {getFacultyList, getSavedLor} from "../../../actions/lorActions";
import SearchBar from "../../dashboard/SearchBar";
import getLocalDate from "../../../utils/getLocalDate";

class FacultySelector extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filter: null,
			state: null,
			selected: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
    this.onUnSelect = this.onUnSelect.bind(this);
	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	onSelect (e) {
    this.setState({selected: true});
    let getSelected = this.props.checkbox.selected;
    getSelected.push(e);
    this.props.checkbox.selected = getSelected
  }

  onUnSelect (e) {
    this.setState({selected: false});
    let unSelect = this.props.checkbox.selected;
    let index = unSelect.indexOf(e);
    if (index !== -1) {
      unSelect.splice(index, 1);
    }
    this.props.checkbox.selected = unSelect;
    console.log({selected: this.props.checkbox.selected})
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

		if (facLoading || facList === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			if (facList.length === 0) {
				allFoldersContent = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				const currentFolder = facList.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(faculty => (
					<tr key={faculty.id}>
						{/*<td>{checkbox}</td>*/}
						{this.props.checkbox.selected.indexOf(faculty.id) === -1 ?
							<td><button onClick={() => this.onSelect(faculty.id)} style={{background:'white', color:'blue', borderStyle:'none'}}>
          <i className="far fa-check-square fa-2x"/></button></td> :
						<td onClick={() => this.onUnSelect(faculty.id)}><button style={{background:'white', color:'blue', borderStyle:'none'}}>
        <i className="fas fa-check-square fa-2x"/></button></td>}
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.first_name + ' '+faculty.last_name}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.email}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{faculty.department_name}</span></td>
					</tr>
				)));
				for (let i = 1; i <= Math.ceil(facList.length / todosPerPage); i++) {
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
			<div className='container'>
				<div className="displayFolder ">
					<div className="App-content row d-flex justify-content-between">
						<table className="table table-bordered table-striped mb-0">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Select Faculty</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Name of Faculty</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Email Address</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Department</th>
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
