import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

class ActiveUserItem extends Component {
	render() {
		const {lorItem} = this.props;
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		return (
			<tr>
				<td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.activeUserContent.id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.activeUserContent.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>
          {capitalizeFirstLetter(lorItem.activeUserContent.first_name )}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.activeUserContent.last_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{capitalizeFirstLetter(lorItem.activeUserContent.role)}</span></td>
			</tr>

		)
	}
}

ActiveUserItem.propTypes = {
	lorItem: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(ActiveUserItem);