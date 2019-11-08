import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import convertToBackendFormat from '../../../utils/convertToBackendFormat'
import {Collapse} from "react-collapse";
import LorSelector from "./LorSelector";
import FacultySelector from "./FacultySelector";
import {getFacultyList, getLorForApplication, submitLor} from "../../../actions/lorActions";


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

class SubmitLor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lorId: null,
			isLorSelectorOpen: true,
			isFacultySelectorOpen: false,
			lorWarning: null,
			makeLorSelectorInvisible: false,
			errors: {}
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleLorSelector = this.toggleLorSelector.bind(this);
		this.toggleFacultySelector = this.toggleFacultySelector.bind(this);
		this.onSelectLor = this.onSelectLor.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
			this.props.getLorForApplication(this.props.match.params.id);
			this.props.getFacultyList(this.props.match.params.id);
		}
	}

	toggleLorSelector() {
		this.setState({isLorSelectorOpen: !this.state.isLorSelectorOpen})
	}

	toggleFacultySelector() {
		this.setState({isFacultySelectorOpen: !this.state.isFacultySelectorOpen})
	}

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onSelectLor(e) {
		if(this.props.lor.selectLor===null) {
			alert('Please Select an Lor to Proceed')
		}else {
			this.setState({
			isLorSelectorOpen: false, lorId: this.props.lor.selectLor, lorWarning: null,
			isFacultySelectorOpen: true, makeLorSelectorInvisible: true
		})
		}

	}


	onSubmit(e) {
		// this.setState({isFacultySelectorOpen: false})
		if (this.props.checkbox.selected.length === 0) {
			console.log({facultyWarning: 'Please select at least one faculty'})
			this.setState({facultyWarning: 'Please select at least one faculty'})
		}
		if (this.state.lorId === null) {
			console.log({lorWarning: 'Please select an Lor'})
			this.setState({lorWarning: 'Please select an Lor'})
		}
		e.preventDefault();
		let dataArray = convertToBackendFormat(this.state.lorId, this.props.checkbox.selected);
		console.log({data: dataArray})
		this.props.submitLor(dataArray);
	}

	render() {
		const {errors} = this.state;
		if (this.props.auth.user.role !== 'student') {
			window.location.href = '/404';
		}
		let selectLorCode = null, selectFacultyCode = null;
		if (!this.state.makeLorSelectorInvisible) {
			selectLorCode = (

				<div className='row col-md-12 d-flex justify-content-center'>
					<button onClick={this.toggleLorSelector}
									className="rounded border d-flex justify-content-between align-items-center flex-grow-1 pl-1 w-100 my-3"
									style={{
										boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
											'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
										fontSize: '25px', background: '#000d69', color: 'white'
									}}>
						Step-1: Select the LOR You want to use<i className="fas fa-angle-down"/></button>
					<Collapse isOpened={this.state.isLorSelectorOpen} style={{listStyleType: 'none', minWidth:'100%'}}>
						<LorSelector/>
						<div className='row d-flex justify-content-end' style={{margin: '5px'}}>
							<button onClick={this.onSelectLor} className='btn btn-primary d-flex justify-content-center'>Confirm Lor
							</button>
						</div>
					</Collapse>
				</div>
			)
		} else {
			selectFacultyCode = (
				<div className='row col-md-12 d-flex justify-content-center'>
					<button onClick={this.toggleFacultySelector}
									className="rounded border d-flex justify-content-between align-items-center flex-grow-1 pl-1 w-100 my-3"
									style={{
										boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
											'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
										fontSize: '25px', background: '#000d69', color: 'white'
									}}>
						Step-2: Select the faculty(You can choose multiple)<i className="fas fa-angle-down"/></button>
					<Collapse isOpened={this.state.isFacultySelectorOpen} style={{listStyleType: 'none'}}>
						<FacultySelector/>
						<div className='row d-flex justify-content-end' style={{margin: '5px'}}>
							<button onClick={this.onSubmit} className='btn btn-primary d-flex justify-content-end'>Confirm Faculty
							</button>
						</div>
					</Collapse>
				</div>
			)
		}

		return (
			<div className="display uploadForm">
				<div className='App-content row d-flex justify-content-center' style={{minWidth: '100%'}}>
					{/*<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>*/}
					{/*	<SearchBar/>*/}
					{/*</nav>*/}
					<h3 className='d-flex justify-content-center'>Apply For Letter of Recommendation</h3>
					<div className='row d-flex justify-content-center'>
						{selectLorCode}
					</div>
					<div className='row d-flex justify-content-center'>
						{selectFacultyCode}
					</div>

				</div>
			</div>
		)
	}
}

SubmitLor.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	checkbox: PropTypes.object.isRequired,
	getLorForApplication: PropTypes.func.isRequired,
	getFacultyList: PropTypes.func.isRequired,
	submitLor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox,
	lor: state.lor
});

export default connect(mapStateToProps, {getFacultyList, getLorForApplication, submitLor})(SubmitLor)
