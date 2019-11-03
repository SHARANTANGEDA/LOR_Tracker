import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from 'classnames'

class FilterRequests extends Component {
	constructor(props) {
		super(props);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClear = this.onClear.bind(this)
	}


	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onFilterChange(e) {
		this.props.filterSort.filterType=e;
	}
	onSortChange(e) {
		this.props.filterSort.sortType=e;
	}

	onClear(e) {
		this.props.filterSort.filterType=null;
		this.props.filterSort.sortType= null;
		this.props.filterSort.search= '';
	}
	render() {
		const {filterType, sortType, search} = this.props.filterSort;
		const options = [
			{value: 'studentId', label: 'Student Id'},
			{value: 'studentName', label: 'Student Name'},
			{value: 'studentEmail', label: 'Student Email'},
		];
		const sortOptions = [
			{value: 'studentId', label: 'Student Id'},
			{value: 'studentName', label: 'Student Name'},
			{value: 'incCgpa', label: 'Increasing CGPA'},
			{value: 'decCgpa', label: 'Decreasing CGPA'},
			{value: 'noOfRequests', label: 'Number of Requests'},

		];
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				'min-width':'180px'
			}),
			menuList: base => ({
				...base,
				minWidth:'180px'
			}),
		};
		const customSelectStylesSort = {
			control: (base, state) => ({
				...base,
				'min-width':'200px'
			}),
			menuList: base => ({
				...base,
				minWidth:'200px'
			}),
		};
		return (
			<div className="row container-fluid d-flex justify-content-between col-md-12" style={{padding: '5px', background:'#ffc200'}}>
				<div className=" input-group md-form form-sm form-2 pl-0"
						 style={{width: '500px', maxWidth: '700px', paddingLeft: '5px'}}>
					<div style={{minWidth: '100px', marginLeft: '5px'}}>
						<Select options={options}
										className={classnames('isSearchable',)}
										placeholder="Type"
										styles={customSelectStyles}
										name="type" value={filterType} onChange={this.onFilterChange}>
						</Select>
					</div>
					<input type="text"
								 className={classnames('form-control my-0 py-1 lime-border')}
								 placeholder="Select Type and Start Typing..."
								 name="search"
								 value={search} onChange={this.onChange}/>
				</div>
        <div className=" input-group md-form form-sm form-2 pl-0"
						 style={{width: '500px', maxWidth: '700px', paddingLeft: '5px'}}>
						<label>Sort By: </label>
					<div style={{minWidth: '100px', marginLeft: '5px'}}>
						<Select options={sortOptions}
										className={classnames('isSearchable',)}
										placeholder="Sort by..."
										styles={customSelectStylesSort}
										name="sortType" value={sortType} onChange={this.onSortChange}>
						</Select>
					</div>
					<button type="submit" onClick={this.onClear} className="input-group-text cyan lighten-2">
                Clear Filters
              </button>
        </div>
			</div>
		)
	}
}

FilterRequests.propTypes = {
	auth: PropTypes.object.isRequired,
	search: PropTypes.object.isRequired,
	filterSort: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	search: state.search,
	filterSort: state.filterSort
});

export default connect(mapStateToProps)(FilterRequests)
