import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { getAllBooks, loginUser } from '../../actions/authActions'

class ModalLogin extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const {errors} = this.state;

    return (
      <div className="LoginModal col-md-12">
            <div className="row d-flex justify-content-center">
              <h3>Login to download or play the book</h3>
              <div className="row text-center">
                <p >
                  Sign in to access account
                </p>
                <hr />
              </div>
              <div className="row text-center d-flex justify-content-center">

                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="Email Address" error={errors.email}
                                  type="text" onChange={this.changeHandler} value={this.state.email} name="email"
                  />
                  <TextFieldGroup placeholder="Password" error={errors.password}
                                  type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
                <div className='col-md-12'>
                  <div className='row col-md-12'>
                    <Link  to={"/resetPassword"} className={"text-primary"}> Forgot Password? </Link>
                  </div>

                </div>

              </div>
            </div>
      </div>
    );
  }
}

ModalLogin.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors

});

export default connect(mapStateToProps,{loginUser,getAllBooks})(ModalLogin);
