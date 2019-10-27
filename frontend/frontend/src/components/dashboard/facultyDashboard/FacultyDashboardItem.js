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

class FacultyDashboardItem extends Component {
  render () {
    const {item} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{item.student_details.student_id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{item.student_details.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{item.lor_details.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(item.lor_details.created_at)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(item.lor_details.deadline)}</span></td>
        <td><button className='btn btn-sm' >View Complete Details</button></td>
      </tr>

    )
  }
}

FacultyDashboardItem.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(FacultyDashboardItem);