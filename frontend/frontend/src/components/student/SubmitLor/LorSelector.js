import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import formatLorSelector from "./formatLorSelector";
import "react-table/react-table.css";

class LorSelector extends Component {
	constructor() {
		super();
		this.state = {
			state: null
		};
		this.onSelect = this.onSelect.bind(this);
    this.onUnSelect = this.onUnSelect.bind(this);
	}


	onSelect (e) {
		console.log(e);
		this.props.lor.selectLor=e;
		this.setState({selected:e});

  }

  onUnSelect (e) {
		this.props.lor.selectLor=null;
		this.setState({selected:null});
	}

	render() {
		const selectLorContent = lor => {
			if (this.state.selected !== lor.id) {
				return (
					<button onClick={() => this.onSelect(lor.id)}
									style={{background: 'white', color: 'blue', borderStyle: 'none'}}>
						<i className="far fa-check-square fa-2x"/></button>
				)
			} else {
				return (
					<button onClick={this.onUnSelect} style={{background: 'white', color: 'blue', borderStyle: 'none'}}>
						<i className="fas fa-check-square fa-2x"/></button>
				)
			}
		};
		const {savedLorForApplication, savedLorForApplicationLoading} = this.props.lor;

		let  heading=null, tableData=null, tableContent=null;
		if (savedLorForApplicationLoading || savedLorForApplication === null) {
			heading = (<Spinner/>)
		} else {
			if (savedLorForApplication.length === 0) {
				heading = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				heading=null;
				tableData = formatLorSelector(savedLorForApplication);
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
										Header: "Select",
										accessor: "selectLor",
										Cell: ({value}) => (
											selectLorContent(value)
										),
										filterable: false
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Purpose",
										accessor: "purpose",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["purpose"]}),
										filterAll: true,
										minWidth: 300,
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
										minWidth: 200,
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
										// minWidth: 225,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
							{
								// Header: "Name",
								columns: [
									{
										Header: "Deadline",
										accessor: "deadline",
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, {keys: ["deadline"]}),
										filterAll: true,
										 // minWidth: 200,
										style: { 'whiteSpace': 'unset' }
									}
								]
							},
						]}
						defaultPageSize={10}
						className="-striped -highlight"
					/>
				);
			}
		}
		return (
			<div className='container-fluid' style={{minWidth:'100%', padding:'0px', margin:'0px'}}>
				<div className='row col-md-12'>
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
			</div>
		);
	}
}

LorSelector.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor
});
export default connect(mapStateToProps)(LorSelector)
