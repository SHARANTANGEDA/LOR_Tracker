import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'


class StudentProfilePanel extends Component {

  render () {
    const {studentProfile, user} = this.props;
    let t1, t2;
    if(studentProfile.graduation_status) {
      t1=(<tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Graduation Status:</h6></td>
              <td><h6>graduated</h6></td>
            </tr>)
      t2= (
        <tr>
          <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Highest Degree:</h6></td>
          <td><h6>{studentProfile.degree}</h6></td>
        </tr>
      )
    }else {
      t1=(<tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Graduation Status:</h6></td>
              <td><h6>Not graduated</h6></td>
            </tr>)
      t2= (
        <tr>
          <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Graduation Expected in:</h6></td>
          <td><h6>{studentProfile.degree}</h6></td>
        </tr>)

    }
    return (
     <div id="mainbar" className='row d-flex justify-content-center'>
          <table className="table">
            <tbody>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Student Id:</h6></td>
              <td><h6>{studentProfile.student_id}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Student Name:</h6></td>
              <td><h6>{studentProfile.full_name}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Email:</h6></td>
              <td><h6>{user.email}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>CGPA:</h6></td>
              <td><h6>{studentProfile.cgpa}</h6></td>
            </tr>
            {t1}
            {t2}
            </tbody>
          </table>
        </div>
    )
  }
}

StudentProfilePanel.propTypes = {
  studentProfile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(StudentProfilePanel);