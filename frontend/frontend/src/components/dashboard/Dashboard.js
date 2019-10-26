import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import classnames from 'classnames'
import Select from 'react-select'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import SearchBar from "./SearchBar";
import {facultyHome, hodHome, studentHome} from "../../actions/homeActions";
import FacultyDashboardItem from "./facultyDashboard/FacultyDashboardItem";
import returnFilterList from "../../utils/returnFilterList";
import SavedLorItem from "../student/ViewSavedLor/SavedLorItem";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			uploadModal: false,
			currentPage: 1,
			todosPerPage: 10,
			errors: {}
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSelectType = this.onSelectType.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.user.role === 'student') {
			this.props.studentHome(this.props.match.params.id)
		} else if (this.props.auth.user.role === 'faculty') {
			this.props.facultyHome(this.props.match.params.id)
		} else if (this.props.auth.user.role === 'admin' || this.props.auth.user.role === 'hod') {
			this.props.hodHome(this.props.match.params.id)
		}
	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onSelectType(e) {
		this.setState({category: e})
	}

	render() {
		let userRole = this.props.auth.user.role;
		let {errors} = this.state
		console.log({role: userRole});
		if (userRole === 'student') {
			const {loading, studentHome} = this.props.home;
			let homeContent;
			if (loading || studentHome === null) {
				homeContent = <Spinner/>;
				console.log({Here: homeContent, hello: 'True'})
			} else {
				homeContent = studentHome;
				console.log({Here: homeContent, hello: 'True'})
			}
			return (
				<div className="display ">
					<div className='App-content row d-flex justify-content-center'>
						<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>
							<SearchBar/>
						</nav>
					</div>

					<div className="App-content row d-flex justify-content-center">
						<h1 className="grid--cell fl1 fs-headline1 text-center" style={{
							color: 'black'
						}}>Welcome {this.props.auth.user.first_name} {this.props.auth.user.last_name}</h1>
					</div>

				</div>
			)
		} else if (userRole === 'faculty') {
			const {facLoading, facultyHome} = this.props.home;
			let homeContent;
			if (facLoading || facultyHome === null) {
				return (<Spinner/>)
			} else {
				const {currentPage, todosPerPage} = this.state;
				const indexOfLastTodo = currentPage * todosPerPage;
				const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
				const pageNumbers = [];
				let renderpn;
				let allFoldersContent, heading;
				if (facultyHome.upcomingDeadlines.length === 0) {
					allFoldersContent = (
						<tr>
							<td><h6>No upcoming deadlines</h6></td>
							<td><h6> in-order to see deadlines you have to accept the lor Request</h6></td>
						</tr>
					);
				} else {
					const currentFolder = facultyHome.upcomingDeadlines.slice(indexOfFirstTodo, indexOfLastTodo);
					const render = (currentFolder.map(lor => (
						// <ProductCard folder={land} key={land._id}/>
						<FacultyDashboardItem item={lor} key={lor.lor_details.id}/>
					)));
					for (let i = 1; i <= Math.ceil(facultyHome.upcomingDeadlines.length / todosPerPage); i++) {
						pageNumbers.push(i);
					}
					const renderPageNumbers = (
						pageNumbers.map(number => {
							return (
								<button className='page-item page-link'
												key={number}
												id={number}
												onClick={this.handleClick}
								>
									{number}
								</button>
							);
						}));
					allFoldersContent = render;
					renderpn = (
						<nav aria-label="...">
							<ul className="pagination pagination-sm">
								{renderPageNumbers}
							</ul>
						</nav>

					)

				}
				return (
					<div className="display ">
						<div className='App-content row d-flex justify-content-center'>
							<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>
								<SearchBar/>
							</nav>
						</div>
						<div className='row d-flex justify-content-between' style={{margin: '2px'}}>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#f44336', marginRight: '20px', padding: '5px', minWidth: '450px'//, maxHeight:
									// '100px',
									// maxWidth:
									// '250px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white'}}>New Lor Requests</p>
											<img style={{width: 'auto'}} src={require('../../img/facultyIcons/new.png')} alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{facultyHome.newRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#00acc1', marginRight: '20px', padding: '5px', minWidth: '450px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white'}}>Accepted Lor Requests</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/facultyIcons/pending.png')}
													 alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{facultyHome.acceptedRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#4caf50', marginRight: '20px', padding: '5px', minWidth: '450px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white'}}>Completed Lor</p>
											<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{facultyHome.completedRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
						</div>
						<div className='row' style={{background: '#cecece'}}>
							<div className='col-md-12 d-flex justify-content-between'>
								<h3 className="text-center grid--cell fl1 fs-headline1" style={{
									color: 'black', borderRadius: '7px', padding: '3px'
								}}>Upcoming Deadlines</h3>
								<div className=" input-group md-form form-sm form-2 pl-0" style={{
									width: '500px', maxWidth: '700px',
									maxHeight: '38px'
								}}>
									<div style={{minWidth: '100px'}}>
										<Select options={[{value: 'test', label: 'test'}]}
														className={classnames('isSearchable',
															{'is-invalid': errors.category})}
														placeholder="Type"
														name="category" value={null} onChange={this.onCatChange}>
										</Select>
										{errors.category && (
											<div className="invalid-feedback">{errors.category}</div>
										)}
									</div>
									<input type="text"
												 className={classnames('form-control my-0 py-1 lime-border ', {'is-invalid': errors.search})}
												 placeholder="Select type and Start typing..."
												 name="search"
												 value={this.state.search} onChange={this.onChange}/>
									{errors.search && (<div className="invalid-feedback">{errors.search}</div>
									)}
									<button type="submit" onClick={this.onSubmit} className='btn-sm'
													style={{background: 'white', borderStyle: 'none', margin: '0px'}}>
										Clear
									</button>
								</div>
							</div>
							<table className="table table-bordered table-striped mb-0">
								<thead>
								<tr>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Student Id</th>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>Student Email
									</th>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Purpose</th>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Requested On</th>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Deadline for Application</th>
									<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>View</th>
								</tr>
								</thead>
								<tbody>
								{allFoldersContent}
								</tbody>
							</table>
						</div>
						<div className='d-flex justify-content-end'>
							{renderpn}
						</div>
					</div>
				)
			}

		} else if (userRole === 'hod' || userRole === 'admin') {
			const {hodLoading, hodHome} = this.props.home;
			const {currentPage, todosPerPage} = this.state;
			const indexOfLastTodo = currentPage * todosPerPage;
			const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
			const pageNumbers = [];
			let renderpn;
			let allFoldersContent, heading;

			if (hodLoading || hodHome === null) {
				return (<Spinner/>)
			} else {
				function capitalizeFirstLetter(string) {
					return string.charAt(0).toUpperCase() + string.slice(1);
				}
				console.log({HOME: hodHome});
				if (hodHome.activeUserContent.length === 0) {
					allFoldersContent = (
						<h5>No currently active users</h5>
					);
				} else {
					const currentFolder = hodHome.activeUserContent.slice(indexOfFirstTodo, indexOfLastTodo);
					const render = (currentFolder.map(user => (
						<tr key={user.id}>
							<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{user.id}</span></td>
							<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{user.email}</span></td>
							<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{user.first_name}</span></td>
							<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{user.last_name}</span></td>
							<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{capitalizeFirstLetter(user.role)}</span></td>
						</tr>
					)));
					for (let i = 1; i <= Math.ceil(hodHome.activeUserContent.length / todosPerPage); i++) {
						pageNumbers.push(i);
					}
					const renderPageNumbers = (
						pageNumbers.map(number => {
							return (
								<button className='page-item page-link'
												key={number}
												id={number}
												onClick={this.handleClick}
								>
									{number}
								</button>
							);
						}));
					allFoldersContent = render;
					renderpn = (
						<nav aria-label="...">
							<ul className="pagination pagination-sm">
								{renderPageNumbers}
							</ul>
						</nav>

					)
				}
				return (
					<div className="display ">
						<div className='App-content row d-flex justify-content-center'>
							<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>
								<SearchBar/>
							</nav>
						</div>
						<div>
							<div className='d-flex justify-content-center'>
								<h2 className='text-center'
										style={{fontWeight: 'bold', color: '#ffa726', borderRadius: '5px', padding: '5px'}}>
									Welcome to Computer Science Head of the Department Dashboard
								</h2></div>
						</div>
						<div className='row d-flex justify-content-between' style={{margin: '2px'}}>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#f40058', marginRight: '20px', padding: '5px', margin: '3px'
									// '100px',
									// maxWidth:
									// '250px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>New Lor Requests</p>
											<img style={{width: 'auto'}} src={require('../../img/facultyIcons/new.png')} alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.newRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#00bcc1', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Accepted Lor Requests</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/facultyIcons/pending.png')}
													 alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.acceptedRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#24af2f', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Completed Lor</p>
											<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.completedRequests}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#24af2f', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Total Students</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/student.png')}
													 alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.studentCnt}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#f40058', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Total Faculty</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/professor.png')}
													 alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.facultyCnt}
											</h1>
										</div>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#00bcc1', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between'>
										<div className=' col-md-8'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Currently Active Users</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/activeUsers.png')}
													 alt=''/>
										</div>
										<div className='d-flex justify-content-end col-md-4'>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.activeUserCnt}
											</h1>
										</div>
									</div>
								</Card>
							</div>
						</div>
						<div className='row col-md-12 d-flex justify-content-center'>
							<h3>Currently Active Users</h3>
						</div>
						<table className="table table-bordered table-striped mb-0">

							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>User Id</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>Email</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>First Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Last Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Role of User</th>
							</tr>
							</thead>
							<tbody>
							{allFoldersContent}
							</tbody>
						</table>
						<div className='d-flex justify-content-end'>
							{renderpn}
						</div>
					</div>
				)
			}
		}
	}
}


Dashboard.propTypes = {
	home: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	studentHome: PropTypes.func.isRequired,
	facultyHome: PropTypes.func.isRequired,
	hodHome: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	home: state.home,
	auth: state.auth,
});
export default connect(mapStateToProps, {studentHome, facultyHome, hodHome})(Dashboard)
