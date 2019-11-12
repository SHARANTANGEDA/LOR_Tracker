import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {getProfileInfo, updateInfo} from '../../actions/accountActions'
import Spinner from '../common/Spinner'
import TextFieldGroup from '../common/TextFieldGroup'
import Select from 'react-select'
import {Collapse} from 'react-collapse'
// import './switch.css'
import UploadFiles from "../upload/UploadFiles";

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			student_id: '',
			full_name: '',
			email: '',
			phone: '',
			cgpa: '',
			graduation_status: false,
			degree: '',
			isProfileOpen: true,
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
		console.log({DETAILS: nextProps.account.details});
		if (nextProps.account.loading === false && nextProps.account.details !== null &&
			(!nextProps.account.details.status===true)) {
			if (nextProps.auth.user.role === 'student') {
				console.log({DETAILS: nextProps.account.details});
				console.log({student_id: nextProps.account.details.student_id, full_name: nextProps.account.details.full_name,
				email: nextProps.account.details.email, phone: nextProps.account.details.phone,
					cgpa: nextProps.account.details.cgpa, graduation_status: nextProps.account.details.graduation_status,
				degree: nextProps.account.details.degree})
				if(nextProps.account.details.student_id!==null) {
					this.setState({student_id: nextProps.account.details.student_id})
				}
				if( nextProps.account.details.full_name!==null) {
					this.setState({full_name: nextProps.account.details.full_name})
				}
				if(nextProps.account.details.email!==null) {
					this.setState({email: nextProps.account.details.email})
				}
				if(nextProps.account.details.phone!==null) {
					this.setState({phone: nextProps.account.details.phone})
				}
				if(nextProps.account.details.cgpa!==null) {
					this.setState({cgpa: nextProps.account.details.cgpa})
				}
				if(nextProps.account.details.graduation_status===null) {
					this.setState({graduation_status: false})
				}else {
					this.setState({graduation_status: nextProps.account.details.graduation_status})
				}
				if(nextProps.account.details.graduation_status) {
					this.setState({degree: {value: nextProps.account.details.degree, label: nextProps.account.details.degree}})
				}else {
					this.setState({degree: nextProps.account.details.degree})
				}
				console.log({student_id: this.state.student_id, full_name: this.state.full_name,
				email: this.state.email, phone: this.state.phone,
					cgpa: this.state.cgpa, graduation_status: this.state.graduation_status,
				degree: this.state.degree})
			}
		}
	}

	componentDidMount() {
		if (this.props.auth.user.role === 'student') {
			this.props.getProfileInfo(this.props.match.params.id)
		}
	}

	toggleProfile(e) {
		this.setState({isProfileOpen: !this.state.isProfileOpen})
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
		console.log({student_id: this.state.student_id, full_name: this.state.full_name,
				email: this.state.email, phone: this.state.phone,
					cgpa: this.state.cgpa, graduation_status: this.state.graduation_status,
				degree: this.state.degree})
	}

	onSwitch(e) {
		if(!this.state.graduation_status) {
			this.setState({degree: null})
		}else {
			this.setState({degree: ''})
		}
		this.setState({graduation_status: !this.state.graduation_status})


	}


	onCatChange(e) {
		this.setState({degree: e})
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.props.auth.user.role === 'student') {
			console.log(this.state.degree, this.state.degree.length);
			// if(this.state.graduation_status===null) {
			// 	this.setState({graduation_status: false})
			// }
			if(this.state.degree.length) {
				const profileData = {
					student_id: this.state.student_id,
					full_name: this.state.full_name,
					email: this.state.email,
					phone: this.state.phone,
					cgpa: this.state.cgpa,
					graduation_status: this.state.graduation_status,
					degree: this.state.degree
				};
			this.props.updateInfo(profileData);
			console.log(profileData)
			}else {
				const profileData = {
					student_id: this.state.student_id,
					full_name: this.state.full_name,
					email: this.state.email,
					phone: this.state.phone,
					cgpa: this.state.cgpa,
					graduation_status: this.state.graduation_status,
					degree: this.state.degree.value
				};
			this.props.updateInfo(profileData);
			console.log(profileData)
			}

		}
	}

	render() {
		const {errors} = this.state;
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px',
				'min-width':'300px'
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px',
				minWidth:'300px'
			}),
		};
	// 	const onSwitch = name => event => {
	// 		console.log('GRADCHANGEAFTER', this.state.graduation_status)
  //   this.setState({ [name]: event.target.checked });
  //   console.log('GRADCHANGEAFTER', this.state.graduation_status)
  // };
		const degreeOptions = [
			{value: 'BE(Hons.)', label: 'BE(Hons.)'},
			{value: 'ME', label: 'ME'},
			{value: 'PhD', label: 'PhD'}
		];
		const {loading, details} = this.props.account;
		let profileContent = null;
		if (loading || details === null) {
			profileContent = (<Spinner/>)
		} else {
			if (this.props.auth.user.role === 'student') {
				let graduationSelect;
				if(this.state.graduation_status) {
					graduationSelect= (
						<div className='form-group row'>
															{/*<label className='d-flex justify-content-start */}
                              {/*                           '></label>*/}
							<label className='d-flex justify-content-start align-items-center'
																	 htmlFor="degree"><h6>Select your highest degree{' '}</h6></label>
															<Select options={degreeOptions}
																			className={classnames('isSearchable', {'is-invalid': errors.degree})}
																			styles={customSelectStyles}
																			placeholder="Select your graduation degree"
																			name="degree" value={this.state.degree}
																			onChange={this.onCatChange}>
															</Select>
						</div>
					)
				}else {
					graduationSelect = (
						<div className='row form-group'>
														{/*<div className='col-md-6 '>*/}
														{/*	<h6 className='d-flex justify-content-start*/}
                            {/*                                 align-items-center'>Expected Year of Graduation</h6>*/}
														{/*</div>*/}
															<label className='d-flex justify-content-start align-items-center'
																	 htmlFor="degree"><h6>Expected Year of Graduation:{' '}</h6></label>
															<TextFieldGroup
															placeholder="Ex. 2021"
															error={errors.degree}
															type="text" onChange={this.onChange}
															value={this.state.degree}
															name="degree"
														/>
						</div>
					)
				}
				console.log({errors: errors});
				profileContent = (
					<div className='App-content row d-flex justify-content-center'>
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
															value={this.state.email}
															name="email"
														/>
													</div>
													<div className="form-group col-md-5">
														<label className='d-flex justify-content-start'
																	 htmlFor="full_name"><h6>Full Name</h6></label>
														<TextFieldGroup
															placeholder="Enter your full name as per Records"
															error={errors.full_name}
															type="text" onChange={this.onChange}
															value={this.state.full_name}
															name="full_name"
														/>
													</div>
													<div className="form-group col-md-2">
														<label className='d-flex justify-content-start'
																	 htmlFor="cgpa"><h6>CGPA/GPA</h6></label>

														<TextFieldGroup placeholder="CGPA out of 10"
																						error={errors.cgpa}
																						type="text" onChange={this.onChange}
																						value={this.state.cgpa} name="cgpa"
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-md-4">
														<label className='d-flex justify-content-start'
																	 htmlFor="student_id"><h6>Student Id</h6></label>
														<TextFieldGroup placeholder="Enter your College ID"
																						error={errors.student_id}
																						type="text" onChange={this.onChange}
																						value={this.state.student_id}
																						name="student_id"
														/>
													</div>
													<div className="col-md-4">
														<label className='d-flex justify-content-start'
																	 htmlFor="phone"><h6>Mobile No</h6></label>

														<TextFieldGroup placeholder="Enter your mobile number"
																						error={errors.phone}
																						type="text" onChange={this.onChange}
																						value={this.state.phone} name="phone"
														/>
													</div>
												</div>
												<div className="row">
													<div className='col-md-6'>
														<h6 className='d-flex justify-content-start'>Graduation Status</h6>
														{/*<label>*/}
														{/*	{this.state.graduation_status ? <label>Yes, I have completed my graduation</label> :*/}
														{/*	<label>Yet to be graduated</label>}*/}
														{/*	<Switch onChange={this.onSwitch} checked={this.state.graduation_status} />*/}
														{/*</label>*/}
														<div>
															<input type="radio" name="graduation_status"
                                   value='Yes, I have completed my graduation'
                                   checked={this.state.graduation_status}
                                   onChange={this.onSwitch} />Yes, I have completed my graduation
														</div>
														<div>
															<input type="radio" name="graduation_status"
                                   value='Yet to be graduated'
                                   checked={!this.state.graduation_status}
                                   onChange={this.onSwitch} />Yet to be graduated
														</div>

														{/*<MDBFormInline>*/}
														{/*	<MDBInput gap onClick={this.onSwitch}*/}
														{/*						checked={this.state.graduation_status}*/}
														{/*						label="Yes, I have completed my graduation"*/}
														{/*						type="radio"*/}
														{/*	/>*/}
														{/*	<MDBInput gap onClick={this.onSwitch}*/}
														{/*						checked={!this.state.graduation_status}*/}
														{/*						label="On going" type="radio"*/}
														{/*	/>*/}
														{/*</MDBFormInline>*/}
													</div>
													{graduationSelect}
													</div>
												<div className="form-group row d-flex justify-content-end">
														<button className="btn btn-primary w-30 my-1" type='submit'
																		>Update Information
														</button>
												</div>
											</form>
										</Collapse>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}

		}
		return (
			<div className=" bootstrap snippet editProfile" style={{maxWidth: '100%'}}>
				<UploadFiles email={this.props.auth.user.email} user={this.props.auth.user.id}/>
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
