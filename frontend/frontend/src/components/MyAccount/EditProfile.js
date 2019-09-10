import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProfileInfo, updateInfo } from '../../actions/accountActions'
import Spinner from '../common/Spinner'
import TextFieldGroup from '../common/TextFieldGroup'
import Select from 'react-select'
import TextAreaFieldGroup from '../common/TextAreaGroupField'
import countryList from 'react-select-country-list'

class EditProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
     userName: '',
      pinCode: '',
      address: '',
      city: '',
      state: '',
      country: null,
      countryOptions: countryList().getData(),
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCatChange = this.onCatChange.bind(this)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.account.loading===false && nextProps.account.details!==null) {
      if(nextProps.auth.user.role==='world') {
        this.setState({
          userName: nextProps.account.details.email,
          firstName: nextProps.account.details.firstName,
          lastName: nextProps.account.details.lastName,
          pinCode: nextProps.account.details.pinCode,
          city:  nextProps.account.details.city,
          state: nextProps.account.details.state,
          address: nextProps.account.details.address
        })
      }else if(nextProps.auth.user.role==='lvpei') {
        this.setState({
          userName: nextProps.account.details.email,
          firstName: nextProps.account.details.firstName,
          lastName: nextProps.account.details.lastName,
        })
      }

    }
  }
  componentDidMount () {
    this.props.getProfileInfo(this.props.match.params.id)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCatChange (e) {
    this.setState({ country: e })
  }

  onSubmit (e) {
    e.preventDefault()

    if(this.props.auth.user.role==='world') {
      const profileData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        pinCode: this.state.pinCode,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country.label
      }
      this.props.updateInfo(profileData)
    }else if(this.props.auth.user.role==='lvpei') {
      const profileData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
      this.props.updateInfo(profileData)
    }

  }

  render () {
    const { errors } = this.state
    const customSelectStyles =  {
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
    }
    const {loading, details} = this.props.account
    let profileContent=null
    if(loading || details===null) {
      profileContent = (<Spinner/>)
    } else {
      if(this.props.auth.user.role==='world') {
        profileContent = (
          <div>
            <div className="col-sm-9">
              <div className="row col-md-8 m-auto">
                <div className="col-sm-10" style={{ color: 'black'}}>
                  <h1>My Account</h1></div>
              </div>
              <div className="col-md-8 m-auto">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="user_name"><h6>email</h6></label>

                    <input readOnly
                           className='form-control form-control-lg'
                           name="userName"
                           type="text"
                           value={this.state.userName}/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="first_name"><h6>First name</h6></label>
                    <input
                      className={classnames('form-control form-control-lg', { 'is-invalid': errors.firstName })}
                      name="firstName" type="text"
                      value={this.state.firstName} onChange={this.onChange}/>
                    {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name"><h6>Last name</h6></label>

                    <input
                      className={classnames('form-control form-control-lg', { 'is-invalid': errors.lastName })}
                      name="lastName" type="text"
                      value={this.state.lastName} onChange={this.onChange}/>
                    {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="pinCode"><h6>Pin Code:</h6></label>
                      <TextFieldGroup placeholder="Enter pin Code" error={errors.pinCode}
                                      type="text" onChange={this.onChange} value={this.state.pinCode} name="pinCode"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="city"><h6>City:</h6></label>

                      <TextFieldGroup placeholder="Enter City" error={errors.city}
                                      type="text" onChange={this.onChange} value={this.state.city} name="city"
                      />

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="state"><h6>state:</h6></label>

                      <TextFieldGroup placeholder="Enter State" error={errors.state}
                                      type="text" onChange={this.onChange} value={this.state.state} name="state"
                      />
                    </div>
                    <div className="col-md-6" style={{maxHeight:'150px'}}>
                      {/*<TextFieldGroup placeholder="Enter Country" error={errors.country}*/}
                      {/*                type="text" onChange={this.changeHandler} value={this.state.country} name="country"*/}
                      {/*/>*/}
                      <label htmlFor="state"><h6>Country:</h6></label>

                      <Select options={this.state.countryOptions}
                              className={classnames('isSearchable',
                                { 'is-invalid': errors.country })}
                              styles={customSelectStyles}
                              placeholder="Select Country"
                              name="country" value={this.state.country} onChange={this.onCatChange}>
                      </Select>
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                  </div>
                  <label htmlFor="address"><h6>address</h6></label>
                  <TextAreaFieldGroup placeholder="Enter your address here(optional)" error={errors.address}
                                      type="text" onChange={this.onChange} value={this.state.address} name="address"
                  />
                  <div className="form-group">
                    <div className="col-xs-12">
                      <button className="btn btn-primary w-30 my-1" type="submit">Confirm Change</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }else if(this.props.auth.user.role==='lvpei') {
        profileContent = (
          <div>
            <div className="col-sm-9">
              <div className="row col-md-8 m-auto">
                <div className="col-sm-10" style={{ color: 'black'}}>
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
                      className={classnames('form-control form-control-lg', { 'is-invalid': errors.firstName })}
                      name="firstName" type="text"
                      value={this.state.firstName} onChange={this.onChange}/>
                    {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name"><h6>Last name</h6></label>

                    <input
                      className={classnames('form-control form-control-lg', { 'is-invalid': errors.lastName })}
                      name="lastName" type="text"
                      value={this.state.lastName} onChange={this.onChange}/>
                    {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <button className="btn btn-primary w-30 my-1" type="submit">Confirm Change</button>
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
      <div className="container-fluid bootstrap snippet editProfile" style={{ maxWidth: '100%' }}>
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
}

const mapStateToProps = state => ({
  errors: state.errors,
  account: state.account,
  auth: state.auth
})

export default connect(mapStateToProps, { updateInfo, getProfileInfo })(EditProfile)
