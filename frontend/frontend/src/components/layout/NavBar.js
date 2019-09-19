import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: {value: 'mr.No', label: 'MR No'},
			errors: {},
			search: ''
		};
		this.onCatChange = this.onCatChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this)
	}

	onSubmit(e) {
		e.preventDefault();
		const newSearch = {
			category: this.state.category.value,
			search: this.state.search,
		};
		if (this.state.category.value === 'mr.No') {
			this.props.getSearchResults(newSearch)
		} else if (this.state.category.value === 'name') {
			window.location.href = `/nameSearchResults/${this.state.search}`
		}
	}

	openModal() {
		this.setState({modalIsOpen: true})
	}

	afterOpenModal() {

	}

	closeModal() {
		this.setState({modalIsOpen: false})
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	onCatChange(e) {
		this.setState({category: e})
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser()
	}


	render() {
		const {isAuthenticated, user} = this.props.auth;
		const {category, errors} = this.state;
		const authLinkO = (
			<div className='d-flex justify-content-between align-content-end col-md-12'>
				<div className="row col-md-6 d-flex justify-content-start align-items-center"
						 style={{color: 'white', verticalAlign: 'bottom'}}>
					<Link to='/dashboard'><img style={{maxWidth: '500px', maxHeight: '130px'}}
																			src={require('../../img/bitslogoFull.png')} alt=""/></Link>
				</div>

				<div className="row col-md-4 d-flex justify-content-end align-items-center" style={{color: 'white'}}>
					{/*<img style={{ maxWidth: '200px', maxHeight: '150px' }}*/}
					{/*     src={require('../../img/invertedEye.png')} alt=""*/}
					{/*/>*/}
					{/*<h3 style={{color:'#06ff00'}}>L</h3><h3 style={{color:'#00c8ff'}}>O</h3><h3 style={{color:'#06ff00'}}>R</h3>*/}
					{/*     <h3 style={{color:'#06ff00'}}>{' '}T</h3><h3 style={{color:'#00f500'}}>r</h3><h3 style={{color:'#00c8ff'}}>a</h3>*/}
					{/*     <h3 style={{color:'#06ff00'}}>c</h3><h3 style={{color:'#00c8ff'}}>k</h3><h3 style={{color:'#06ff00'}}>e</h3>*/}
					{/*       <h3 style={{color:'#00c8ff'}}>r</h3>*/}
					<img style={{maxWidth: '100px', maxHeight: '100px'}}
							 src={require('../../img/insert-picture-icon.png')} alt=""
					/>
					<h2 style={{color: '#000d69', fontWeight: 'bold', fontFamily: 'Times New Roman'}}>Lor Tracker</h2>

				</div>
			</div>

		);
		const guestLinkO = (
			<div className='d-flex justify-content-between align-content-end col-md-12'>
				<div className="row col-md-8 d-flex justify-content-start align-items-center"
						 style={{color: 'white', verticalAlign: 'bottom'}}>
					<Link to='/'> <img style={{maxWidth: '500px', maxHeight: '130px'}}
														 src={require('../../img/bitslogoFull.png')} alt=""/></Link>
					{/*<h5>{' '}Birla Institute of Technology & Science, Pilani</h5>*/}
				</div>
				<div className="row col-md-4 d-flex justify-content-end align-items-center" style={{color: 'white'}}>
					<img style={{maxWidth: '100px', maxHeight: '100px'}}
							 src={require('../../img/insert-picture-icon.png')} alt=""
					/>
					{/*<h3 style={{color:'#06ff00'}}>L</h3><h3 style={{color:'#00c8ff'}}>O</h3><h3 style={{color:'#06ff00'}}>R</h3>*/}
					{/*<h3>{' '}T</h3><h3 style={{color:'#00f500'}}>r</h3><h3 style={{color:'#00c8ff'}}>a</h3>*/}
					{/*<h3 style={{color:'#06ff00'}}>c</h3><h3 style={{color:'#00c8ff'}}>k</h3><h3 style={{color:'#06ff00'}}>e</h3>*/}
					{/*  <h3 style={{color:'#00c8ff'}}>r</h3>*/}
					<h2 style={{color: '#000d69'}}>Lor Tracker</h2>
				</div>
			</div>
		);
		const guestLink1 = (
			<ul className="navbar-nav components d-flex justify-content-around" style={{height: '100%'}}>
				{/*<li className='nav-item' style={{color: 'white',background:'#00c8ff' , borderRadius: '5px'*/}
				{/*}}>*/}
				{/*  <Link className="nav-link" to="/browse"*/}
				{/*        style={{color: 'white', borderRadius: '5px' }}>*/}
				{/*    {' '}PublicCatalogue</Link>*/}
				{/*</li>*/}
				{/*<li className='nav-item' style={{color: 'white',background:'#00c8ff' , borderRadius: '5px'*/}
				{/*   }}>*/}
				{/*  <Link className="nav-link" to="/"*/}
				{/*        style={{color: 'white', borderRadius: '5px' }}>*/}
				{/*    {' '}Login</Link>*/}
				{/*</li>*/}

				{/*<li className="nav-item pull-right" style={{color: 'white',background:'#00c8ff' , borderRadius: '5px'*/}
				{/*   }}>*/}
				{/*</li>*/}
			</ul>
		);

		let authLinksIII = null;
		if (isAuthenticated && (user.role === 'super_admin')) {
			authLinksIII = (
				<ul className="navbar-nav components d-flex justify-content-between" style={{height: '100%'}}>
					<li className='nav-item' style={{
						color: 'white', background: '#00c8ff', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/dashboard" style={{color: 'white', borderRadius: '5px'}}>
							Home
						</Link>
					</li>
					<li className='nav-item' style={{
						color: 'white', background: '#00c8ff', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/report" style={{color: 'white', borderRadius: '5px'}}>
							Usage Reports
						</Link>
					</li>
					<li className="nav-item" style={{
						color: 'white', background: '#00c8ff', borderRadius: '5px'
					}}>
						<Link className="nav-link" to="/analytics"
									style={{color: 'white', borderRadius: '5px', background: '#00c8ff'}}>
							PBI Analytics</Link>
					</li>
					<li className="nav-item dropdown" style={{
						color: 'white', background: '#00c8ff', borderRadius: '5px'
					}}>
						<Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
									style={{
										color: 'white', background: '#00c8ff', borderRadius: '5px'
										, minWidth: '150px'
									}}>
							Users<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu ">
							<li><Link className='nav-link' to="/createUser" style={{color: 'white'}}>
								Create</Link></li>
							<li><Link className='nav-link' to="/activeLVP" style={{color: 'white'}}>
								Current</Link></li>
							<li><Link className='nav-link' to="/deAssignedLVP" style={{color: 'white'}}>
								De Assigned</Link></li>
						</ul>
					</li>
					<li className="nav-item dropdown" style={{
						color: 'white', borderRadius: '5px'
						, minWidth: '200px'
					}}>
						<Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
									style={{color: 'white', borderRadius: '5px'}}>
							{user.email}<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu " aria-labelledby="navbarDropdown">
							<li className='nav-item' style={{minWidth: '200px'}}>
								<Link className='nav-link' to="/changePassword" style={{color: 'white'}}>
									Change Password
								</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item pull-right" style={{borderRadius: '5px'}}>
						<Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
									style={{color: 'white', borderRadius: '5px'}}>
							<i className="fa fa-power-off" aria-hidden="true"/>
							{'  '}Logout</Link>
					</li>
				</ul>
			)
		} else if (isAuthenticated && (user.role === 'lvpei')) {
			authLinksIII = (
				<ul className="navbar-nav components" style={{height: '100%'}}>
					<li className='nav-item' style={{color: 'white', background: '#0000ff', borderRadius: '5px'}}>
						<Link className='nav-link' to="/dashboard" style={{color: 'white', borderRadius: '5px'}}>
							Home
						</Link>
					</li>
					<li className="nav-item" style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className="nav-link" to="/analytics"
									style={{color: 'white', borderRadius: '5px', background: '#ffec96'}}>
							PBI Analytics</Link>
					</li>
					{/*<li className='nav-item' style={{color: 'white',background:'#00c8ff' , borderRadius: '5px'*/}
					{/*  }}>*/}
					{/*  <Link className='nav-link'  to="/uploadForm" style={{color: 'white', borderRadius: '5px' }}>*/}
					{/*    Upload Book*/}
					{/*  </Link>*/}
					{/*</li>*/}
					{/*<li className='nav-item' style={{color: 'white',background:'#00c8ff' , borderRadius: '5px'*/}
					{/*}}>*/}
					{/*  <Link className='nav-link'  to="/lvpBooks" style={{color: 'white', borderRadius: '5px' }}>*/}
					{/*    View All Books*/}
					{/*  </Link>*/}
					{/*</li>*/}
					<li className="nav-item dropdown" style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
									style={{
										color: 'white', background: '#ffec96', borderRadius: '5px'
										, minWidth: '150px'
									}}>
							Book Master Control<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu ">
							<li><Link className='nav-link' to="/uploadForm" style={{color: 'white'}}>
								Upload Book</Link></li>
							<li><Link className='nav-link' to="/lvpBooks" style={{color: 'white'}}>
								View Current Books</Link></li>
							<li><Link className='nav-link' to="/grantBookAccess" style={{color: 'white'}}>
								De-assigned Books</Link></li>
						</ul>
					</li>
					<li className="nav-item dropdown " style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
						, minWidth: '150px'
					}}>
						<Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
									style={{color: 'white', borderRadius: '5px'}}>
							{user.email}<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu " style={{
							color: 'white', background: '#ffec96', borderRadius: '5px'
						}}>
							<li><Link className='nav-link' to="/editProfile" style={{color: 'white'}}>
								My Account</Link></li>
							<li><Link className='nav-link' to="/changePassword" style={{color: 'white'}}>
								Change Password</Link></li>
						</ul>
					</li>
					<li className="nav-item pull-right" style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
									style={{color: 'white', borderRadius: '5px'}}>
							<i className="fa fa-power-off" aria-hidden="true"/>
							{'  '}Logout</Link>
					</li>
				</ul>
			)
		} else if (user.role === 'student') {
			authLinksIII = (
				<ul className="navbar-nav components d-flex justify-content-around" style={{height: '100%'}}>
					<li className='nav-item' style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/dashboard" style={{borderRadius: '5px'}}>
							Home
						</Link>
					</li>
					<li className="nav-item dropdown " style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
					<Link className="nav-link nav-item d-flex justify-content-between" to="" data-toggle="dropdown"
									style={{borderRadius: '5px'}}>
							LOR{' '}<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu ">
							<li className='nav-item' style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/submitLor" style={{borderRadius: '5px'}}>
							Submit Lor
						</Link>
					</li>
							<li className='nav-item' style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/viewMyLor" style={{borderRadius: '5px'}}>
							View My Lor
						</Link>
					</li>
							<li className='nav-item' style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className='nav-link' to="/fillLor" style={{borderRadius: '5px'}}>
							Create Lor
						</Link>
					</li>
						</ul>
					</li>

					<li className="nav-item dropdown " style={{
						color: 'white', background: '#ffec96', borderRadius: '5px'
					}}>
						<Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
									style={{borderRadius: '5px'}}>
							{user.email}<i className="fas fa-caret-down"/>
						</Link>
						<ul className="dropdown-menu ">
							<li><Link className='nav-link' to="/editProfile">
								My Account</Link></li>
							<li><Link className='nav-link' to="/changePassword">
								Change Password</Link></li>
						</ul>
					</li>
					<li className="nav-item pull-right" style={{borderRadius: '5px'}}>
						<Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
									style={{borderRadius: '5px'}}>
							<i className="fa fa-power-off" aria-hidden="true"/>
							{'  '}Logout</Link>
					</li>
				</ul>
			)
		}

		return (
			<nav className="navbar navbar-expand-sm  col-md-12 " style={{background: '#ffb76f'}}>
				<div className="row container d-flex justify-content-between col-md-12">
					<div className='row  d-flex justify-content-between col-md-12'>
						{isAuthenticated ? authLinkO : guestLinkO}
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav"
						>
							<span className="navbar-toggler-icon"/>
						</button>
						<div className="row collapse navbar-collapse justify-content-end" id="mobile-nav">
							{isAuthenticated ? authLinksIII : guestLink1}
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	search: state.search
});

export default connect(mapStateToProps, {logoutUser})(Navbar)
