import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

class StudentItem extends Component {
	render() {
		const {lorItem} = this.props;
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		let dg_status;
		if(lorItem.profile.graduation_status) {
			dg_status = 'Completed, Currently pursuing ' + lorItem.profile.degree
		}else {
			dg_status = 'Estimated to Complete in ' + lorItem.profile.degree.toString()
		}
		return (
			<tr>
				<td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.profile.student_id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.basic.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{lorItem.profile.phone}</span></td>
				        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>
          {capitalizeFirstLetter(lorItem.basic.first_name +' '+ lorItem.basic.last_name)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{dg_status}</span></td>
			</tr>

		)
	}
}

StudentItem.propTypes = {
	lorItem: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(StudentItem);