import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'
import GoogleLogoutButton from "./GoogleLogoutButton";

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth
		};
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

// make sure to remove the listener
// when the component is not mounted anymore
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		this.setState({width: window.innerWidth});
	};

	onLogoutClick(e) {
		e.preventDefault();
		// this.props.logoutUser()
	}


	render() {
		const {isAuthenticated, user} = this.props.auth;
		let authLinksIII = null;
		if (isAuthenticated && (user.role === 'hod')) {
			authLinksIII = (
				<ul id="menu-content" className="menu-content collapse out" style={{height:'100%', marginRight:'5px'}}>
					<li className='nav-item' style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', padding:'0px'
					}}>
						<Link className='nav-link' to="/dashboard" style={{borderRadius: '5px', padding:'0px'}}>
              <i className="fas fa-tachometer-alt fa-lg"/>{'  '}Dashboard
						</Link>
					</li>
					<li data-toggle="collapse" data-target="#lor" className="collapsed active" >
						<a  href="#"
									style={{borderRadius: '5px', color:'#000d69'}}>
              Lor Requests Control<i className="fas fa-caret-down"/>
						</a>
          </li>
						<ul className="sub-menu collapse" id="lor" style={{background: '#ffe36b'}}>
							<li ><Link className='nav-link-Link' to='/viewAllNewRequests'>
									New Requests</Link></li>
							<li><Link className='nav-link-Link' to='/viewAllAcceptedRequests'>Accepted Requests</Link></li>
							<li><Link className='nav-link-Link' to='/viewAllCompletedRequests'>Completed Requests</Link></li>
							<li><Link className='nav-link-Link'  to='/viewAllRequests'>View All Requests</Link></li>
						</ul>
					<li data-toggle="collapse" data-target="#users" className="collapsed active"  style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', minWidth: '200px'
					}}>
						<a href="#"
									style={{borderRadius: '5px', color:'#000d69'}}>
              User Control<i className="fas fa-caret-down"/>
						</a>
          </li>
						<ul className="sub-menu collapse" id="users" style={{background: '#ffe36b', width: '100%'}}>
							<li><Link className='nav-link-Link' to="/viewAllStudents">View Students</Link></li>
							<li><Link className='nav-link-Link' to="/viewCurrentActiveUsers">View Active Users</Link></li>
						</ul>
					<li className="nav-item " style={{borderRadius: '5px', padding:'0px'}}>
						<GoogleLogoutButton/>
					</li>
				</ul>
			)
		} else if (isAuthenticated && user.role === 'faculty') {
			authLinksIII = (
				<ul id="menu-content" className="menu-content collapse out" style={{height:'100%', marginRight:'5px',
					padding:'2px', width:'220px'}}>
					<li className='nav-item' style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', padding:'0px'
					}}>
						<Link className='nav-link' to="/dashboard" style={{borderRadius: '5px', padding:'0px'}}>
              <i className="fas fa-tachometer-alt fa-lg"/>{'  '}Dashboard
						</Link>
					</li>
					<li data-toggle="collapse" data-target="#lor" className="collapsed active" >
						<a  href="#"
									style={{borderRadius: '5px', color:'#000d69'}}>
              Lor Requests Control<i className="fas fa-caret-down"/>
						</a>
          </li>
						<ul className="sub-menu collapse" id="lor" style={{background: '#ffe36b'}}>
							<li ><Link className='nav-link-Link' to='/viewNewRequests'>New Requests</Link></li>
							<li><Link className='nav-link-Link' to='/viewAcceptedLorRequests'>Accepted Requests</Link></li>
							<li><Link className='nav-link-Link'  to='/completedLorRequests'>Completed Requests</Link></li>
						</ul>
					<li className='nav-item' style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', padding:'0px'
					}}>
						<a className='nav-link' href="#" style={{borderRadius: '5px', padding:'0px'}}>
              {user.email}
						</a>
					</li>
					<li className="nav-item " style={{borderRadius: '5px', padding:'0px'}}>
						<GoogleLogoutButton/>
					</li>
				</ul>
			)
		} else if (isAuthenticated && user.role === 'student') {
			authLinksIII = (
				<ul id="menu-content" className="menu-content collapse out" style={{height:'100%', marginRight:'5px',
					padding:'2px', width:'220px'}}>
					<li className='nav-item' style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', padding:'0px'
					}}>
						<Link className='nav-link' to="/dashboard" style={{borderRadius: '5px', padding:'0px'}}>
              <i className="fas fa-tachometer-alt fa-lg"/>{'  '}Dashboard
						</Link>
					</li>
					<li data-toggle="collapse" data-target="#lor" className="collapsed active" >
						<a  href="#"
									style={{borderRadius: '5px', color:'#000d69'}}>
              LOR Actions<i className="fas fa-caret-down"/>
						</a>
          </li>
						<ul className="sub-menu collapse" id="lor" style={{background: '#ffe36b'}}>
							<li ><Link className='nav-link-Link' to='/viewAppliedLor'>Application Status</Link></li>
							<li><Link className='nav-link-Link' to='/submitLor'>Submit Lor</Link></li>
							<li><Link className='nav-link-Link'  to='/viewMyLor'>View My Lor</Link></li>
							<li><Link className='nav-link-Link' to='/fillLor'>Create Lor</Link></li>
						</ul>
					<li data-toggle="collapse" data-target="#users" className="collapsed active"  style={{
						color: 'white', background: '#ffe36b', borderRadius: '5px', minWidth: '200px'
					}}>
						<a href="#"
									style={{borderRadius: '5px', color:'#000d69'}}>
              {user.email}<i className="fas fa-caret-down"/>
						</a>
          </li>
					<ul className="sub-menu collapse" id="users" style={{background: '#ffe36b', width: '100%'}}>
						<li ><Link className='nav-link-Link' to="/editProfile">My Profile</Link>
						</li>
					</ul>
					<li className="nav-item " style={{borderRadius: '5px', padding:'0px'}}>

					</li>
				</ul>
			)


		}
		const {width} = this.state;
		const isMobile = width <= 575;
		if (isMobile) {
			return (
			  <div className=''>
          <div className="nav-side-menu">
            {/*<div className="brand"><i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"/></div>*/}

            <div className="menu-list">
              {/*<div className="brand">{user.email}</div>*/}
              {isAuthenticated ? authLinksIII : null}
            </div>
          </div>
        </div>

			)
		} else {
			return null
		}

	}
}

Sidebar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});
export default connect(mapStateToProps, {logoutUser})(Sidebar)
