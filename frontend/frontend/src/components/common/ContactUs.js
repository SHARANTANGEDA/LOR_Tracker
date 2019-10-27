import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

class ContactUs extends Component {

  render () {
    return (
      <div className="container-fluid contactUs">
        <div className="row">
          <div className="col-md-12">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 bg-light">
                  <h1 className="text-capitalize pt-1 text-center bg-light text-dark">Our team</h1>
                </div>
              </div>
              <div>
                <h1>Coming up shortly please bear with us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ContactUs.defaultProps = {
  showActions: true
};

ContactUs.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ContactUs)
