import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { confirmEmail } from '../../actions/authActions'
import { green } from '@material-ui/core/colors'
import axios from 'axios'

class EnterPin extends Component {
  constructor () {
    super();
    this.state = {
      pin: '',
      sent: '',
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reGenerate = this.reGenerate.bind(this);
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      // window.location.href='/dashboard'
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      // window.location.href='/dashboard'
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors})
    }
  }
  reGenerate(e) {
    // this.props.sendAgain()
    axios.get('/api/users/sendAgain').then(res => {
      if(res.data.success===true) {
        this.setState({sent: 'true'})
      }else {
        this.setState({sent: 'fail'})
      }
    }).catch(err => {
      this.setState({errors: err.response.data})
    })
    this.setState({sent: true})
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      pin: this.state.pin,
    };
    console.log(userData)
    this.props.confirmEmail(userData);
  }
  render() {
    const {errors} = this.state;
    let content=null
    if(this.state.sent==='true') {
      content=(<div><p>Verification code is sent,Check your email!!</p>
        <button style={{color: 'white', background: 'green'}} onClick={this.reGenerate}
                className="btn btn-sm"> Generate Again </button>
      </div>
      )
    }else if(this.state.sent===''){
      content=(<p>Did'nt receive it yet?,
        <button style={{color: 'white', background: 'green'}} onClick={this.reGenerate}
                className="btn btn-sm"> Generate Again </button></p>)
    }else if(this.state.sent==='fail') {
      content=(<p>An error has occurred in sending email</p>)

    }
    return (
          <div className="enterPin">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 text-center">
                <h3 className="mb-4">Confirm email</h3>
                <p  style={{color: 'white', background:'green'}}>
                  Verification pin has already been sent to Registered email
                </p>
              </div>
              <div className="col-md-6 text-center">

                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="Enter OTP" error={errors.pin}
                                  type="text" onChange={this.changeHandler} value={this.state.pin} name="pin"
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
                {content}

              </div>
            </div>
          </div>
    );
  }
}

EnterPin.propTypes = {
  auth: PropTypes.object.isRequired,
  confirmEmail:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  // sendAgain: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors

});

export default connect(mapStateToProps,{confirmEmail})(EnterPin);
