import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextFieldGroup from '../common/TextFieldGroup'
import Modal from 'react-modal'
import Select from 'react-select'
import {createLor, getUniversitiesList} from "../../actions/lorActions";
import CreatableSelect from 'react-select/lib/Creatable';
import TextAreaFieldGroup from "../common/TextAreaGroupField";
import convertToSelectArray from '../../utils/convertToSelectArray'
import DatePicker from "react-datepicker";
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../dashboard/SearchBar";
import DateCustomInput from "./DateCustomInput";
import {Link} from "react-router-dom";

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

class CreateLor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purpose: null,
			otherDetails: '',
			modalIsOpen: false,
			confirmationModal: false,
			category: null,
			universityName: null,
			programName: '',
			deadline: null,
			dateHandle: null,
			errors: {}
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.onSelectType = this.onSelectType.bind(this);
		this.onUnivChange = this.onUnivChange.bind(this);
		this.openConfirmationModel = this.openConfirmationModel.bind(this);
		this.closeConfirmationModal = this.closeConfirmationModal.bind(this)
	}

	componentDidMount() {
		this.props.getUniversitiesList(this.props.match.params.id)
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.errors) {
			if (nextProps.errors.profile !== null && nextProps.errors.profile !== undefined) {
				this.setState({modalIsOpen: true});
				console.log(nextProps.errors);
			}
			this.setState({errors: nextProps.errors})
		}
	}

	dateTimeHandler = date => {
		this.setState({dateHandle: date});
		this.setState({deadline: date})
	};

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	openModal() {
		this.setState({modalIsOpen: true})
	}

	openConfirmationModel() {
		this.setState({confirmationModal: true})
	}

	closeConfirmationModal() {
		this.setState({confirmationModal: false})
	}

	onSelectType(e) {
		this.setState({purpose: e})
	}

	onUnivChange(e) {
		this.setState({universityName: e})
		console.log({register: e})
	}

	afterOpenModal() {
	}

	closeModal() {
		this.setState({modalIsOpen: false})
	}


	onSubmit(e) {
		e.preventDefault();
		let errors = this.state.errors;
		if (this.state.purpose === null || this.state.universityName === null) {
			if (this.state.purpose === null) {
				errors.purpose = 'Please select the purpose';
				this.setState({errors: errors});
			}
			if (this.state.universityName === null) {
				errors.university_name = 'Please select the university';
				this.setState({errors: errors});
			}
			console.log(errors, this.state.errors);
		} else {
			const userData = {
				purpose: this.state.purpose.value,
				others_details: this.state.otherDetails,
				university_name: this.state.universityName.value,
				program_name: this.state.programName,
				deadline: this.state.deadline,
			};
			this.props.createLor(userData)
		}
	}

	render() {
		const {errors} = this.state;
		if (this.props.auth.user.role !== 'student') {
			window.location.href = '/404';
		}
		const {loading, univ} = this.props.lor;
		let univArray = [{value: null, label: 'Loading...'}];
		if (loading || univ === null || univ === []) {

		} else {
			// console.log({select:convertToSelectArray(univ)})
			univArray = convertToSelectArray(univ)
		}
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px',
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px',
			}),
		};
		let othersContent = null, purposeArray = [
			{
				value: 'Applying to Foreign Universities for MS',
				label: 'Applying to Foreign Universities for MS'
			},
			{value: 'Applying to Foreign Universities for PhD', label: 'Applying to Foreign Universities for PhD'},
			{
				value: 'Applying for Thesis at a Foreign University',
				label: 'Applying for Thesis at a Foreign University'
			},
			{value: 'Applying for Thesis within India', label: 'Applying for Thesis within India'},
			{value: 'Applying for Scholarship', label: 'Applying for Scholarship'},
			{value: 'Applying for Job', label: 'Applying for Job'},
			{value: 'Others', label: 'Others'}];
		// const DateCustomInput = ({value, onClick}) => (
		//
		// );
		let confirmationContent = (
			<div className='d-flex justify-content-center'>
				<div>
					<h3>Confirm the details</h3>
					<p>Make sure you have entered the correct details before submitting</p>
					<div className='d-flex justify-content-end'>
						<button onClick={this.onSubmit} className='btn btn-sm' style={{color: 'white', background: 'green'}}>
							Continue
						</button>
						<button onClick={this.closeConfirmationModal} className='btn btn-sm'
										style={{color: 'white', background: 'red'}}>
							Check Again
						</button>
					</div>
				</div>
			</div>
		);
		let profileErrorContent = (
			<div className='col-md-12'>
				<div className='row col-md-12 d-flex justify-content-end'>
					<button onClick={this.closeModal} className='btn btn-sm'
									style={{color: 'white', background: 'red'}}>
						<i className="fas fa-times"/></button>
				</div>
				<div className='row col-md-12 '>
					<h3>Profile not found</h3>
					<p>Please create your profile before creating LOR Application</p>
					<div className='d-flex justify-content-end'>
						<Link to='/editProfile' className='btn btn-primary' style={{color: 'white', background: 'green'}}>
							Create Profile
						</Link>
					</div>
				</div>
			</div>
		);
		if (this.state.purpose !== null && this.state.purpose.value === 'Others') {
			othersContent = (
				<div className='col-md-6'>
					<TextAreaFieldGroup placeholder="Please state your purpose here" error={errors.others_details}
															type="text" onChange={this.changeHandler} value={this.state.otherDetails}
															name="otherDetails"
					/>
				</div>

			)
		}
		return (
			<div className="display uploadForm">
				<div className='App-content row ' style={{minWidth: '100%'}}>
					<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>
						<SearchBar/>
					</nav>
					<div className='col-md-12 d-flex justify-content-center'>
						<div className="row col-md-8 " style={{width: '100%'}}>
							<button
								className="rounded border d-flex justify-content-between align-items-center flex-grow-1 pl-1 w-100 my-3"
								style={{
									boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
										'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									fontSize: '25px', background: '#000d69', color: 'white'
								}}>Fill the form to Save LOR
							</button>

							<form noValidate onSubmit={this.onSubmit}>
								<div style={{minWidth: '100px', margin: '10px'}}>
									<div className='row'>
										<div className='col-md-6'>
											<DatePicker
												selected={this.state.dateHandle}
												onChange={this.dateTimeHandler}
												minDate={new Date()}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={15}
												timeCaption="time"
												showMonthDropdown
												dateFormat="MMMM d, yyyy h:mm aa"

												customInput={<DateCustomInput/>}
											/>
										</div>
										<div className='col-md-6'>
											<TextFieldGroup placeholder="Program you want to attend there" error={errors.program_name}
																			type="text" onChange={this.changeHandler} value={this.state.programName}
																			name="programName"
											/>
										</div>
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<Select options={purposeArray} styles={customSelectStyles}
															className={classnames('isSearchable')}
															placeholder="State purpose for Lor Application"
															name="purpose" value={this.state.purpose} onChange={this.onSelectType}>
											</Select>
											{errors.purpose && (
												<small style={{color:'red'}}>{errors.purpose}</small>
											)}
										</div>
										<div className='col-md-6'>
											{/*<Select allowCreate={true} options={univArray} className={classnames("isSearchable w-75",*/}
											{/*	{'is-invalid': errors.university_name})} name="universityName" styles={customSelectStyles}*/}
											{/*				placeholder="Select the university you want to apply for"*/}
											{/*				onChange={this.onUnivChange} value={this.state.universityName}/>*/}
											<CreatableSelect isClearable options={univArray} className={classnames("isSearchable w-100")}
																			 styles={customSelectStyles}
																			 placeholder="Select the university you want to apply for"
																			 name="universityName" value={this.state.universityName}
																			 onChange={this.onUnivChange}>
											</CreatableSelect>
											{errors.university_name && (
												<small style={{color:'red'}}>{errors.university_name}</small>
											)}
											<small className="form-text " style={{color: 'blue'}}>
												*You can add new university in-case it is not in list</small>
										</div>
									</div>
									<div className='row'>
										{othersContent}

									</div>
									<div className='row d-flex justify-content-center'>
										<button className="btn btn-primary w-30 my-1 text-center" type='submit'
										>Save Details and Continue
										</button>
									</div>
									{/*<InputMoment*/}
									{/*	moment={this.state.dateHandle}*/}
									{/*	onChange={this.dateTimeHandler}*/}
									{/*	minStep={5}*/}
									{/*/>*/}

								</div>
							</form>

						</div>
					</div>

				</div>
				<Modal
					isOpen={this.state.confirmationModal}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeConfirmationModal}
					style={customStyles}
					contentLabel="Data Confirmation"
					ariaHideApp={false}
				>{confirmationContent}</Modal>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Profile Error"
					ariaHideApp={false}
				>{profileErrorContent}</Modal>

			</div>
		)
	}
}

CreateLor.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createLor: PropTypes.func.isRequired,
	getUniversitiesList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	lor: state.lor
});

export default connect(mapStateToProps, {createLor, getUniversitiesList})(CreateLor)
