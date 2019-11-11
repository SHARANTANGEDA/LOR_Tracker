import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {GoogleLogout} from "react-google-login";
import {googleLogoutAction} from "../../actions/googleAuthActions";
import {Link} from "react-router-dom";


class GoogleLogoutButton extends Component {



	render() {
		let userRole = this.props.auth.user.role;
		console.log({role: userRole});
		 const signOut = dispatch => {
		 	console.log(dispatch);
		 	this.props.googleLogoutAction()
    };

			return (
					<GoogleLogout
						clientId="373821760819-n464h5ipe9u121o98tqbd5973q4m1djg.apps.googleusercontent.com"
						buttonText="Logout"
						onLogoutSuccess={signOut}
						className="nav-link"
						disabledStyle={{padding:'0px', margin:'0px',background:'#ffe36b', color:'#000d69', border: '#000d69'}}
						icon={false}
					>
						<Link className="nav-link" to="/"
									style={{borderRadius: '5px',fontSize:'12pt', borderStyle:'none', border:'none', padding:'0', margin:'0'}}>
							<i className="fa fa-power-off" aria-hidden="true"/>
							{'  '}Logout</Link>
					</GoogleLogout>
			)
		}

}


GoogleLogoutButton.propTypes = {
	home: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	googleLogoutAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	home: state.home,
	auth: state.auth,
});
export default connect(mapStateToProps, {googleLogoutAction})(GoogleLogoutButton)

