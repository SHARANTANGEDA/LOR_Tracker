import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../utils/getLocalDate"

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

class LorRequestsItem extends Component {
  render () {
    const {application} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let app_status=null;
    if(application.application_status==='AP') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'blue'}}>Applied</span></td>)

    }else if(application.application_status==='AC') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'green'}}>Accepted</span></td>)
    }else if(application.application_status==='RE') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'red'}}>Rejected</span></td>)
    }else if(application.application_status==='CO') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'white', background:'green', padding: '2px',
        borderRadius: '5px'}}>
        Done</span></td>)
    }
    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>
          {capitalizeFirstLetter(application.faculty.first_name+application.faculty.last_name)}
        </span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.faculty.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.lor.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.lor.created_at}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.lor.university_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(application.lor.deadline)}</span></td>
        <td>
          <button  style={{color:'blue'}} className='btn btn-sm'>
            <i className="fas fa-edit fa-2x"/>Lor</button>
        </td>
				{app_status}

      </tr>

    )
  }
}

LorRequestsItem.propTypes = {
  application: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LorRequestsItem);