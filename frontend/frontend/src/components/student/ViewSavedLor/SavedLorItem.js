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

class SavedLorItem extends Component {
  render () {
    const {lorItem} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.university_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.program_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.deadline)}</span></td>
      </tr>

    )
  }
}

SavedLorItem.propTypes = {
  lorItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(SavedLorItem);