import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

class ViewAllRequestsItem extends Component {
	render() {
		const {lorItem} = this.props;
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		let  dg_status;
		if(lorItem.student_details_profile.graduation_status) {
			dg_status = 'Completed, Currently pursuing ' + lorItem.student_details_profile.degree
		}else {
			dg_status = 'Estimated to Complete in ' + lorItem.student_details_profile.degree.toString()
		}
		return (
			<tr>
				<td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_profile.student_id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_general.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>
          {capitalizeFirstLetter(lorItem.student_details_general.first_name) +' '+
					capitalizeFirstLetter(lorItem.student_details_general.last_name)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_profile.phone}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{lorItem.student_details_profile.cgpa}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{dg_status}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'}}>
					{lorItem.noOfRequests}</span></td>
			</tr>

		)
	}
}

ViewAllRequestsItem.propTypes = {
	lorItem: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(ViewAllRequestsItem);