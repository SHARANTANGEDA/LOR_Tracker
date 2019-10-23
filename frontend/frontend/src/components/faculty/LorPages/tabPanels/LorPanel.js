import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import getLocalDate from "../../../../utils/getLocalDate"

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

class LorPanel extends Component {

  render () {
    const {lor} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log(lor)
    return (
     <div id="mainbar" className='row d-flex justify-content-center'>
          <table className="table">
            <tbody>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>purpose:</h6></td>
              <td><h6>{lor.purpose}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>University Name:</h6></td>
              <td><h6>{lor.university_name}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Wanting to enroll in:</h6></td>
              <td><h6>{lor.program_name}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Deadline to submit Lor:</h6></td>
              <td><h6>{getLocalDate(lor.deadline)}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Other Details( If any):</h6></td>
              <td><h6>{lor.others_details}</h6></td>
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

LorPanel.propTypes = {
  lor: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LorPanel);