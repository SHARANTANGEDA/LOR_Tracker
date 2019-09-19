import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {getProfileInfo, updateInfo} from '../../actions/accountActions'
import Spinner from '../common/Spinner'
import TextFieldGroup from '../common/TextFieldGroup'
import Select from 'react-select'
import TextAreaFieldGroup from '../common/TextAreaGroupField'
import countryList from 'react-select-country-list'
import {Collapse} from 'react-collapse'
// import './switch.css'
import {MDBFormInline, MDBInput} from "mdbreact";

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentId: '',
			fullName: '',
			emailPersonal: '',
			phone: '',
			cgpa: '',
			graduationStatus: false,
			degree: null,
			isProfileOpen: false,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCatChange = this.onCatChange.bind(this);
		this.toggleProfile = this.toggleProfile.bind(this);
		this.onSwitch = this.onSwitch.bind(this)
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
		if (nextProps.account.loading === false && nextProps.account.details !== null) {
			if (nextProps.auth.user.role === 'student') {
				this.setState({
					studentId: nextProps.account.details.student_id,
					fullName: nextProps.account.details.full_name,
					emailPersonal: nextProps.account.details.email,
					phone: nextProps.account.details.phone,
					cgpa: nextProps.account.details.cgpa,
					graduationStatus: nextProps.account.details.graduation_status,
					degree: {value: nextProps.account.details.degree, label: nextProps.account.details.degree}

				})

			}

		}
	}

	componentDidMount() {
		this.props.getProfileInfo(this.props.match.params.id)

	}

	toggleProfile(e) {
		this.setState({isProfileOpen: !this.state.isProfileOpen})
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onSwitch(e) {
		this.setState({graduationStatus: !this.state.graduationStatus})
	}

	onCatChange(e) {
		this.setState({degree: e})
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.props.auth.user.role === 'student') {
			console.log({
				setUp: {
					student_id: this.state.studentId,
					full_name: this.state.fullName,
					email: this.state.emailPersonal,
					phone: this.state.phone,
					cgpa: this.state.cgpa,
					graduation_status: this.state.graduationStatus,
					degree: this.state.degree
				}
			})
			const profileData = {
				student_id: this.state.studentId,
				full_name: this.state.fullName,
				email: this.state.emailPersonal,
				phone: this.state.phone,
				cgpa: this.state.cgpa,
				graduation_status: this.state.graduationStatus.toString(),
				degree: this.state.degree.value
			};
			this.props.updateInfo(profileData);
			console.log(profileData)
		}
	}

	render() {
		const {errors} = this.state;
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px'
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px'
			}),
		};
		const degreeOptions = [
			{value: 'BE(Hons.)', label: 'BE(Hons.)'},
			{value: 'ME', label: 'ME'},
			{value: 'PHD', label: 'PHD'}
		];
		const {loading, details} = this.props.account;
		let profileContent = null;
		if (loading || details === null) {
			profileContent = (<Spinner/>)
		} else {
			if (this.props.auth.user.role === 'student') {
				console.log({errors: errors});
				profileContent = (
					<div className='d-flex justify-content-center'>
						<div className="row col-md-12">
							<div className='col-md-12 ' style={{
								borderRadius: '5px', borderColor: 'black', borderStyle: 'solid',
								padding: '0px'
							}}>
								<div className="row col-md-12 m-auto">
									<div className="col-sm-12 text-center" style={{color: 'black'}}>
										<button onClick={this.toggleProfile}
														className="rounded border
                                                d-flex justify-content-between align-items-center
                                                flex-grow-1 pl-1 w-100 my-3"
														style={{
															boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
																'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
															fontSize: '25px', background: '#000d69', color: 'white'
														}}>
											Edit Profile<i className="fas fa-angle-down"/></button>
										<Collapse isOpened={this.state.isProfileOpen} style={{listStyleType: 'none'}}>
											<form onSubmit={this.onSubmit}>
												<div className='row'>
													<div className="form-group col-md-5">
														<label className='d-flex justify-content-start'
																	 htmlFor="email"><h6>Email Address</h6></label>
														<TextFieldGroup
															placeholder="Please enter your personal Email Address"
															error={errors.email}
															type="text" onChange={this.onChange}
															value={this.state.emailPersonal}
															name="emailPersonal"
														/>
													</div>
													<div className="form-group col-md-5">
														<label className='d-flex justify-content-start'
																	 htmlFor="Full_Name"><h6>Full Name</h6></label>
														<TextFieldGroup
															placeholder="Enter your full name as per Records"
															error={errors.full_name}
															type="text" onChange={this.onChange}
															value={this.state.fullName}
															name="fullName"
														/>
													</div>
													<div className="form-group col-md-2">
														<label className='d-flex justify-content-start'
																	 htmlFor="state"><h6>CGPA/GPA</h6></label>

														<TextFieldGroup placeholder="CGPA out of 10"
																						error={errors.cgpa}
																						type="text" onChange={this.onChange}
																						value={this.state.cgpa.toString()} name="cgpa"
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-md-4">
														<label className='d-flex justify-content-start'
																	 htmlFor="studentId"><h6>Student Id</h6></label>
														<TextFieldGroup placeholder="Enter your College ID"
																						error={errors.student_id}
																						type="text" onChange={this.onChange}
																						value={this.state.studentId}
																						name="studentId"
														/>
													</div>
													<div className="col-md-3">
														<label className='d-flex justify-content-start'
																	 htmlFor="phone"><h6>Mobile No</h6></label>

														<TextFieldGroup placeholder="Enter your mobile number"
																						error={errors.phone}
																						type="text" onChange={this.onChange}
																						value={this.state.phone} name="phone"
														/>
													</div>
													<div className="col-md-5">
														<label className='d-flex justify-content-start'
																	 htmlFor="phone"><h6>Graduation Status</h6></label>
														<MDBFormInline>
															<MDBInput gap onClick={this.onSwitch}
																				checked={this.state.graduationStatus}
																				label="Yes, I have completed my graduation"
																				type="radio"
															/>
															<MDBInput gap onClick={this.onSwitch}
																				checked={!this.state.graduationStatus}
																				label="On going" type="radio"
															/>
														</MDBFormInline>
													</div>
												</div>
												<div className="form-group row">
													<div className="row col-md-6 text-center">
														<div className='col-md-4 '>
															<h6 className='d-flex justify-content-start
                                                             align-items-center'>Select your degree</h6>
														</div>
														<div className='col-md-8 '>
															<Select options={degreeOptions}
																			className={classnames('isSearchable', {'is-invalid': errors.degree})}
																			styles={customSelectStyles}
																			placeholder="Select your graduation degree"
																			name="country" value={this.state.degree}
																			onChange={this.onCatChange}>
															</Select>
														</div>


													</div>
													<div className="col-md-6 d-flex justify-content-end">
														<button className="btn btn-primary w-30 my-1"
																		type="submit">Update Information
														</button>
													</div>
												</div>
											</form>
										</Collapse>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			} else if (this.props.auth.user.role === 'lvpei') {
				profileContent = (
					<div>
						<div className="col-sm-9">
							<div className="row col-md-8 m-auto">
								<div className="col-sm-10" style={{color: 'black'}}>
									<h1>My Account</h1></div>
							</div>
							<div className="col-md-8 m-auto">
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="user_name"><h6>User Name</h6></label>

										<input readOnly
													 className='form-control form-control-lg'
													 name="userName"
													 type="text"
													 value={this.state.userName}/>

									</div>
									<div className="form-group">
										<label htmlFor="first_name"><h6>First name</h6></label>
										<input
											className={classnames('form-control form-control-lg', {'is-invalid': errors.firstName})}
											name="firstName" type="text"
											value={this.state.firstName} onChange={this.onChange}/>
										{errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>
										)}
									</div>
									<div className="form-group">
										<label htmlFor="last_name"><h6>Last name</h6></label>

										<input
											className={classnames('form-control form-control-lg', {'is-invalid': errors.lastName})}
											name="lastName" type="text"
											value={this.state.lastName} onChange={this.onChange}/>
										{errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>
										)}
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<button className="btn btn-primary w-30 my-1" type="submit">Confirm Change
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				)
			}

		}
		return (
			<div className="container-fluid bootstrap snippet editProfile" style={{maxWidth: '100%'}}>
				{profileContent}
			</div>
		)
	}
}

EditProfile.propTypes = {
	errors: PropTypes.object.isRequired,
	getProfileInfo: PropTypes.func.isRequired,
	updateInfo: PropTypes.func.isRequired,
	account: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	account: state.account,
	auth: state.auth
});

export default connect(mapStateToProps, {updateInfo, getProfileInfo})(EditProfile)
