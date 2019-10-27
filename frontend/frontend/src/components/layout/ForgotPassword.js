import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import {enterOTPEmail, resetPassword, sendOTPEmail} from '../../actions/authActions'
import classnames from 'classnames'
import downloading from '../common/downloading.gif'

class ForgotPassword extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      pin: '',
      enterEmail: true,
      enterPassword: false,
      newPassword: '',
      renewPassword: '',
      sendOTP:false,
      enterOTP: false,
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitForgot = this.submitForgot.bind(this);
    this.submitRequest = this.submitRequest.bind(this)
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    this.setState({enterEmail: this.props.reset.enterEmail, enterPassword: this.props.reset.enterPassword})
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps) {
      this.setState({enterEmail: nextProps.reset.enterEmail, enterPassword: nextProps.reset.enterPassword})
    }
  }

  submitRequest(e) {
    this.setState({sendOTP: true})
  }
  submitForgot(e) {
    e.preventDefault();
    if(this.state.enterEmail && !this.state.enterPassword) {
      let userData={email: this.state.email}
      this.setState({sendOTP: true})
      this.props.sendOTPEmail(userData)
      // this.props.sendForgotPasswordRequest(userData);
    }else if(!this.state.enterEmail && !this.state.enterPassword) {
      const userData = {
        email: this.state.email,
        pin: this.state.pin
      };
      this.setState({enterOTP: true})
      this.props.enterOTPEmail(userData)
    }else if(!this.state.enterEmail && this.state.enterPassword) {
      const userData = {
        newPassword: this.state.newPassword,
        renewPassword: this.state.renewPassword
      };
      this.props.resetPassword(userData)
    }

  }
  render() {
    const {errors} = this.state;
    let content,input1, input2;
    if(this.state.sendOTP) {
      input1=(
        <button className='btn-sm btn' style={{background: 'white',marginRight: '10px'}}><img
          src={downloading}
          style={{ width: '25px', margin: 'auto', display: 'block' }}
          alt="downloading..."
        />
        </button>
      )
    }else {
      input1=(
        <button style={{maxWidth:'250px'}}
                onClick={this.submitForgot} type="submit" className="btn btn-info btn-block mt-4">
          Send OTP
        </button>

      )
    }

    if(this.state.enterOTP) {
      input2=(
        <button className='btn-sm btn' style={{background: 'white',marginRight: '10px'}}><img
          src={downloading}
          style={{ width: '25px', margin: 'auto', display: 'block' }}
          alt="downloading..."
        />
        </button>
      )
    }else {
      input2=(
        <button style={{maxWidth:'250px'}}
                onClick={this.submitForgot} type="submit" className="btn btn-info btn-block mt-4">
          Confirm OTP
        </button>

      )
    }

    if(this.state.enterEmail && !this.state.enterPassword) {
      content=(<form noValidate onSubmit={this.submitForgot}>
          <TextFieldGroup placeholder="Email Address" error={errors.email}
                          type="text" onChange={this.changeHandler} value={this.state.email} name="email"
          />
          <div className="col-md-12 d-flex justify-content-center text-center">
            <div className='col-md-6'>
              {input1}
            </div>
          </div>
        </form>
      )
    }else if(!this.state.enterEmail && !this.state.enterPassword){
      content=(<form noValidate onSubmit={this.submitForgot}>
          <TextFieldGroup placeholder="Email Address" error={errors.email} readOnly
                          type="text" onChange={this.changeHandler} value={this.state.email} name="email"
          />
          <TextFieldGroup placeholder="Enter OTP" error={errors.pin}
                          type="newPassword" onChange={this.changeHandler} value={this.state.pin} name="pin"
          />
          <div className="col-md-12 d-flex justify-content-center text-center">
            <div className='col-md-6'>
              {input2}
            </div>
          </div>
        </form>
      )
    }else if(!this.state.enterEmail && this.state.enterPassword) {
      content=(<form noValidate onSubmit={this.submitForgot}>
          <div className="form-group">
            <input
              className={classnames('form-control form-control-lg', { 'is-invalid': errors.newPassword })}
              placeholder="New Password"
              name="newPassword" type="password"
              value={this.state.newPassword} onChange={this.changeHandler}/>
            {errors.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>
            )}
          </div>
          <div className="form-group">
            <input
              className={classnames('form-control form-control-lg', { 'is-invalid': errors.renewPassword })}
              placeholder="Confirm New Password"
              name="renewPassword"
              type="password"
              value={this.state.renewPassword} onChange={this.changeHandler}/>
            {errors.renewPassword && (<div className="invalid-feedback">{errors.renewPassword}</div>
            )}
          </div>          <div className="col-md-12 d-flex justify-content-center text-center">
            <div className='col-md-6'>
              <input style={{maxWidth:'250px'}} value='Confirm Password' type="submit"
                     className="btn btn-info btn-block mt-4"/>
            </div>
          </div>
        </form>
      )
    }

    let heading
    if(this.state.enterEmail && !this.state.enterPassword) {
      heading=(
        <h5 className="lead" style={{color:'white'}}>
          {' '}
          Enter Your Email Address to receive OTP
        </h5>
      )
    }else if(!this.state.enterEmail && !this.state.enterPassword){
      heading=(
        <h5 className="lead" style={{color:'white'}}>
          {' '}
          Please Enter the OTP sent to your E-Mail
        </h5>
      )
    }else if(!this.state.enterEmail && this.state.enterPassword) {
      heading=(   <h5 className="lead" style={{color:'white'}}>
        {' '}
        Create New newPassword
      </h5>  )
    }
    return (
      <div className="forgotPassword landing " style={{ maxHeight: '100%' }}>
        <div className="dark-overlay" >
          <div className="container">
            <div className="row d-flex justify-content-center text-light">
              <h1 className="display-3 mb-4">Digital Audio Library</h1>
              <div className="col-md-12 text-center">
                {heading}
                <hr />
              </div>
              <div className="col-md-6 text-center">
                {content}
                <hr/>
                    </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  sendOTPEmail: PropTypes.func.isRequired,
  enterOTPEmail: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  reset: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  reset: state.reset
});

export default connect(mapStateToProps,{resetPassword,enterOTPEmail, sendOTPEmail})(ForgotPassword);
