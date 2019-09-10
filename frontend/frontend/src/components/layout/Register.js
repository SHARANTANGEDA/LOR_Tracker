import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaGroupField'
import { registerFaculty } from '../../actions/authActions'
import Select from 'react-select'
import Modal from 'react-modal'
import EnterPin from './EnterPin'
import isEmpty from '../../validation/is-empty'
import 'react-datepicker/dist/react-datepicker.css'

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

class Register extends Component {
  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',

      modalIsOpen: false,
      dob: new Date(),
      gender: null,
      qualification: null,
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onQualificationChange = this.onQualificationChange.bind(this)

  }

  dateChange (date) {
    this.setState({
      dob: date
    })
  }
  onQualificationChange (e) {
    this.setState({qualification: e})
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {

  }

  closeModal () {
    this.setState({ modalIsOpen: false });
    window.location.href = '/dashboard'
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
      // console.log(nextProps.errors)
    }
  }

  onCatChange (e) {
    this.setState({ country: e })
  }

  onGenderChange (e) {
    this.setState({ gender: e })
  }

  onSubmit (e) {
    e.preventDefault();
    // if(this.state.country===null) {
    //   this.setState({errors:{country:'Please select your country'}})
    //   return
    // }
    // if(this.state.gender===null) {
    //   this.setState({errors:{gender:'Please select your Gender'}})
    //   return
    // }
    // if(this.state.qualification===null) {
    //   this.setState({errors:{qualification:'Please select your Qualification'}})
    //   return
    // }
    // console.log({country: this.state.country.label})
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      repassword: this.state.repassword,
      address: this.state.address,
      pinCode: this.state.pinCode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      dob: this.state.dob,
      gender: this.state.gender,
      qualification: this.state.qualification
    };
    // console.log(newUser)
    this.props.registerFaculty(newUser);
    if (newUser.country !== null && !isEmpty(newUser.firstName) && !isEmpty(newUser.lastName) && !isEmpty(newUser.country)
      && !isEmpty(newUser.state) && !isEmpty(newUser.city) && !isEmpty(newUser.password) && !isEmpty(newUser.repassword)
      && !isEmpty(newUser.address) && !isEmpty(newUser.pinCode) && !isEmpty(newUser.email) && newUser.gender!==null &&
      newUser.qualification!==null && !isEmpty(newUser.dob) && newUser.password === newUser.repassword) {
      this.setState({ modalIsOpen: true })

    }
  }

  render () {
    const { errors } = this.state;
    const eduArray = [
      { value: 'Pre-Primary', label: 'Pre-Primary' },
      { value: 'Primary', label: 'Primary' },
      { value: 'Upper Primary', label: 'Upper Primary' },
      { value: 'Secondary', label: 'Secondary' },
      { value: 'Senior Secondary', label: 'Senior Secondary' },
      { value: 'Under Graduate', label: 'Under Graduate' },
      { value: 'Post Graduate', label: 'Post Graduate' },
      { value: 'M.Phil', label: 'M.Phil' },
      { value: 'Diploma', label: 'Diploma' },
      {
        value: 'Post Graduate Diploma including Advanced Diploma',
        label: 'Post Graduate Diploma including Advanced Diploma'
      },
      { value: 'Integrated', label: 'Integrated' },
      { value: 'Certificate', label: 'Certificate' },
      { value: 'In-Service Training', label: 'In-Service Training' },
      { value: 'Adult Education', label: 'Adult Education' },
      { value: 'Education n.e.c', label: 'Education n.e.c' }
    ];
    const genderArray = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Others', label: 'Others' }

    ];
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
    //landing
    //dark-overlay
    return (
      <div className="register landing" style={{ maxHeight: '100%' }}>
        <div className='dark-overlay' style={{ maxHeight: '100%' }}>
          <div className="container-fluid " style={{ maxHeight: '100%' }}>
            <div className="row col-md-12">
              <div className='row col-md-12 d-flex justify-content-center'>
                <h1 className=" col-md-12  text-center" style={{ color: 'white' }}>Sign Up</h1>
                <p className="col-md-12  lead text-center" style={{ color: 'white' }}>
                  Create a free account to downloads Audio books</p>
              </div>
              <form noValidate onSubmit={this.onSubmit} className='text-center row col-md-12'>
                <div className="col-md-6">
                  <div className='row'>
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="First Name" error={errors.firstName}
                                      type="text" onChange={this.changeHandler} value={this.state.firstName}
                                      name="firstName"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="Last Name" error={errors.lastName}
                                      type="text" onChange={this.changeHandler} value={this.state.lastName}
                                      name="lastName"
                      />
                    </div>
                  </div>
                  <TextFieldGroup placeholder="Enter your Email Address" error={errors.email}
                                  type="email" onChange={this.changeHandler} value={this.state.email} name="email"
                  />
                  <TextFieldGroup placeholder="Password" error={errors.password}
                                  type="password" onChange={this.changeHandler} value={this.state.password}
                                  name="password"
                  />
                  <TextFieldGroup placeholder="Confirm Password" error={errors.repassword}
                                  type="password" onChange={this.changeHandler} value={this.state.repassword}
                                  name="repassword"
                  />
                  <div className="row d-flex justify-content-center">
                    <div className='col-md-6 d-flex justify-content-end'>
                      <label style={{ color: 'white' }} htmlFor='dob'>
                        Date Of Birth:</label>
                    </div>
                    <div className='col-md-6'>
                      <input type="date" name="dob"
                             style={{ borderRadius: '5px', width: '100%', height: '100%', }}
                             value={this.state.dob} onChange={this.changeHandler}/>
                    </div>
                    <p className="" style={{color:'red', fontSize:'14px'}}>{errors.dob}</p>



                    {/*</div>*/}
                  </div>

                </div>
                <div className='col-md-6'>
                  <div className="row">
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="Enter pin Code" error={errors.pinCode}
                                      type="text" onChange={this.changeHandler} value={this.state.pinCode}
                                      name="pinCode"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="Enter City" error={errors.city}
                                      type="text" onChange={this.changeHandler} value={this.state.city} name="city"
                      />

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="Enter State" error={errors.state}
                                      type="text" onChange={this.changeHandler} value={this.state.state} name="state"
                      />
                    </div>
                    <div className="col-md-6" style={{ maxHeight: '150px' }}>
                      {/*<TextFieldGroup placeholder="Enter Country" error={errors.country}*/}
                      {/*                type="text" onChange={this.changeHandler} value={this.state.country} name="country"*/}
                      {/*/>*/}
                      <Select options={this.state.countryOptions}
                              className={classnames('isSearchable',
                                { 'is-invalid': errors.country })}
                              styles={customSelectStyles}
                              placeholder="Select Country"
                              name="country" value={this.state.country} onChange={this.onCatChange}>
                      </Select>
                      <p className="" style={{color:'red', fontSize:'14px'}}>{errors.country}</p>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: '15px', marginBottom: '10px' }}>
                    <div className=" col-md-5">
                      <Select options={genderArray}
                              className={classnames('isSearchable',
                                { 'is-invalid': errors.gender })}
                              placeholder="Select Gender"
                              name="country" value={this.state.gender} onChange={this.onGenderChange}>
                      </Select>
                      <div className="invalid-feedback">{errors.gender}</div>
                      <p className="" style={{color:'red', fontSize:'14px'}}>{errors.gender}</p>

                    </div>
                    <div className={classnames('col-md-7',
                      { 'is-invalid': errors.qualification })}style={{ height: '100%' }}>
                      <Select options={eduArray}
                              className='isSearchable'
                              placeholder="Choose Qualification"
                              name="country" value={this.state.qualification} onChange={this.onQualificationChange}>
                      </Select>
                      <p className="" style={{color:'red', fontSize:'14px'}}>{errors.qualification}</p>

                    </div>
                  </div>
                  <TextAreaFieldGroup placeholder="Enter your address here(optional)" error={errors.address}
                                      type="text" onChange={this.changeHandler} value={this.state.address}
                                      name="address"
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center text-center">
                  <input style={{maxWidth:'400px',background:'#008cff'}}
                    type="submit" className="btn btn-info btn-block mt-4" value='Verify Your Email & SignUp'/>
                </div>

              </form>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Confirm OTP"
          shouldCloseOnOverlayClick={false}
          modalOptions={{ dismissible: false }}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
        >{<div className='d-flex justify-content-center'>
          <EnterPin/>
          <div>
            <button onClick={this.closeModal} className='btn btn-sm' style={{ color: 'white', background: 'red' }}>
              <i className="fas fa-times"/></button>
          </div>
        </div>}</Modal>
      </div>
    )
  }
}

Register.propTypes = {
  registerFaculty: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerFaculty })(withRouter(Register))