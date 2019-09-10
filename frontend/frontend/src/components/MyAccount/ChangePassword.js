import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changePassword } from '../../actions/profileActions'

import classnames from 'classnames'

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      newPassword: '',
      renewPassword: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    const profileData = {
      password: this.state.password,
      newPassword: this.state.newPassword,
      renewPassword: this.state.renewPassword
    }
    this.props.changePassword(profileData)
  }

  render () {
    const { errors } = this.state
    let profileContent = (
      <div>
        <div className="col-sm-9">
          <div className="row col-md-8 m-auto">
            <div className="col-sm-10" style={{ color: 'black'}}>
              <h2>Change Password</h2></div>
          </div>

            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
                    placeholder="Old Password"
                    name="password" type="password"
                    value={this.state.password} onChange={this.onChange}/>
                  {'Enter Your Old Password' &&
                  <small className="form-text text-muted">{'Enter Your Old Password'}</small>}
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.newPassword })}
                    placeholder="New Password"
                    name="newPassword" type="password"
                    value={this.state.newPassword} onChange={this.onChange}/>
                  {'Enter a new Password different from previous one' &&
                  <small className="form-text text-muted">{'Enter a new Password different from previous one'}</small>}
                  {errors.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.renewPassword })}
                    placeholder="Re-Enter Password"
                    name="renewPassword"
                    type="password"
                    value={this.state.renewPassword} onChange={this.onChange}/>
                  {errors.renewPassword && (<div className="invalid-feedback">{errors.renewPassword}</div>
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
    // }

    return (
      <div className="container bootstrap snippet changePassword" style={{ maxWidth: '100%' }}>
        <div className="row" style={{ maxWidth: '100%' }}>
        </div>
        {profileContent}
        <footer className="text-white mt-5 p-4 text-center" style={{ height:'60px',left:0,
          bottom:0,background:'#008cff',position: 'absolute',
          right:0}}>
          Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute
        </footer>
      </div>
    )
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { changePassword })(ChangePassword)
