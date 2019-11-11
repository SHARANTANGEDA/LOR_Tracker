import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {facultyHome, hodHome, markAsComplete, studentHome} from "../../actions/homeActions";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import formatFacultyDashboardData from "./formatFacultyDashboardData";
import Modal from "react-modal";
import AcceptLorModal from "../faculty/LorPages/AcceptLorModal";
import formatActiveUsersData from "./formatActiveUsersData";
import {googleLogoutAction} from "../../actions/googleAuthActions";

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


class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			uploadModal: false,
			errors: {},
			currentlyActiveRequest: null,
			rejectionModal: false,
			width: window.innerWidth
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onComplete = this.onComplete.bind(this)
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

	openModal(e) {
		this.setState({modalIsOpen: true, currentlyActiveRequest: e})
	}

	closeModal() {
		this.setState({modalIsOpen: false, rejectionModal: false, currentlyActiveRequest: null})
	}

	afterOpenModal() {

	}

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onComplete() {
		console.log(this.state.currentlyActiveRequest.application_details.lor_id, this.state.currentlyActiveRequest.application_details.faculty_id)
		this.props.markAsComplete(this.state.currentlyActiveRequest.application_details.lor_id, this.state.currentlyActiveRequest.application_details.faculty_id)
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


	render() {
		let userRole = this.props.auth.user.role;
		let {errors} = this.state;
		console.log({role: userRole});
		 const signOut = dispatch => {
		 	console.log(dispatch);
		 	this.props.googleLogoutAction()
    };
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
					<div className="App-content row d-flex justify-content-center">
						<button
							className="rounded border d-flex justify-content-center align-items-center  pl-1 w-50 my-3"
							style={{
								boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
									'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
								fontSize: '25px', background: '#000d69', color: 'white'
							}}>Welcome {this.props.auth.user.first_name} {this.props.auth.user.last_name}
						</button>
					</div>
					<div className='col-md-12 '
							 style={{background: '#c9c9c9', padding: '10px', borderRadius: '10px', margin: '5px'}}>
						<h5 className='row text-center fl1 fs-headline1' style={{margin: '5px', padding: '5px'}}>
							Guidelines to apply for Letter of Recommendation:</h5>
					</div>
				</div>
			)
		}
		else if (userRole === 'faculty') {
			const {facLoading, facultyHome} = this.props.home;
			const viewButton = row => {
				console.log({row: row.value});
				return <button onClick={() => this.openModal(row.value)} className='btn btn-sm btn-primary'
											 style={{overflow: 'wrap'}}>View Details</button>
			};
			let modalContent = (
				<div id="mainbar" className='row d-flex justify-content-center'>
					<div className="col-md-12 d-flex justify-content-between" style={{width: '100%', margin: '5px'}}>
						<h5>Complete Details:</h5>

						<button onClick={this.closeModal} className='btn btn-sm' style={{background: 'white', color: 'red'}}>
							<i className="fas fa-times fa-2x"/>
						</button>
					</div>
					<AcceptLorModal content={this.state.currentlyActiveRequest}/>
					<button onClick={this.onComplete} className='btn btn-sm btn-primary'
									style={{background: 'green', color: 'white'}}>Mark as Complete
					</button>
				</div>
			);
			let cards = null;
			if (facLoading || facultyHome === null) {
				return (<Spinner/>)
			} else {
				const isMobile = this.state.width <= 575;
				if (isMobile) {
						cards = (<div className='row d-flex justify-content-between' style={{marginTop: '2px'}}>
							<div className='col-md-4' style={{margin: '5px'}}>
								<Card style={{
									backgroundColor: '#f44336', marginRight: '20px', padding: '5px', minWidth: '450px'//, maxHeight:
									// '100px',
									// maxWidth:
									// '250px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'>
										<p style={{color: 'white'}}>New Lor Requests</p>
										<img style={{width: 'auto'}} src={require('../../img/facultyIcons/new.png')} alt=''/>
										<h1 style={{color: 'white', fontWeight: 'bold'}}>
											{facultyHome.newRequests}
										</h1>
									</div>

								</Card>
							</div>
							<div className='col-md-4' style={{margin: '5px'}}>
								<Card style={{
									backgroundColor: '#00acc1', marginRight: '20px', padding: '5px', minWidth: '450px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'>
										<p style={{color: 'white'}}>Accepted Lor Requests</p>
										<img style={{width: '65px', maxHeight: '90px'}}
												 src={require('../../img/facultyIcons/pending.png')}
												 alt=''/>
										<h1 style={{color: 'white', fontWeight: 'bold'}}>
											{facultyHome.acceptedRequests}
										</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4' style={{margin: '5px'}}>
								<Card style={{
									backgroundColor: '#4caf50', marginRight: '20px', padding: '5px', minWidth: '450px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'>
										<p style={{color: 'white'}}>Completed Lor</p>
										<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
										<h1 style={{color: 'white', fontWeight: 'bold'}}>
											{facultyHome.completedRequests}
										</h1>
									</div>
								</Card>
							</div>
						</div>)
					} else {
						cards = (
							<div className='row d-flex justify-content-between' style={{marginTop: '2px'}}>
								<div className='col-md-4' style={{overflow: 'auto'}}>
									<Card style={{
										backgroundColor: '#f44336', marginRight: '20px', padding: '5px', minWidth: '450px', margin: '1px'
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
								<div className='col-md-4' style={{overflow: 'auto'}}>
									<Card style={{
										backgroundColor: '#00acc1', marginRight: '20px', padding: '5px', minWidth: '450px', margin: '1px'
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
								<div className='col-md-4' style={{overflow: 'auto'}}>
									<Card style={{
										backgroundColor: '#4caf50', marginRight: '20px', padding: '5px', minWidth: '450px', margin: '1px'
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
						)
					}
				let heading = null, tableData = null, tableContent = null;
				if (facultyHome.upcomingDeadlines.length === 0) {
					heading = (<h4>No upcoming deadlines</h4>)

				} else {
					console.log({HOME: facultyHome, lines: facultyHome.upcomingDeadlines})
					tableData = formatFacultyDashboardData(facultyHome.upcomingDeadlines);
					tableContent = (
						<ReactTable
							data={tableData}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							style={{overflow: 'wrap', width: this.state.width}}
							minRows={1}
							columns={[
								{
									// Header: "Name",
									columns: [
										{
											Header: "Student ID",
											accessor: "studentId",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["studentId"]}),
											filterAll: true,
											style: {'whiteSpace': 'unset'}
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Student Name",
											accessor: "studentName",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["studentName"]}),
											filterAll: true,
											style: {'whiteSpace': 'unset'}
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Student Email",
											accessor: "email",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["email"]}),
											filterAll: true,
											style: {'whiteSpace': 'unset'}
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Lor Purpose",
											accessor: "purpose",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["purpose"]}),
											filterAll: true,
											style: {'whiteSpace': 'unset'}
										}
									]
								},

								{
									// Header: "Name",
									columns: [
										{
											Header: "Deadline to apply",
											accessor: "deadline",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["deadline"]}),
											filterAll: true,
											expander: false,
											style: {'whiteSpace': 'unset'}
										}
									]
								},
								{
									columns: [
										{
											Header: "View Requests",
											accessor: "viewButton",
											filterable: false,
											Cell: row => (viewButton(row)),
											style: {'whiteSpace': 'unset'}
										}
									]
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
					);


				}


				return (
					<div className='container-fluid' style={{minWidth: '100%', padding: '0px'}}>
						{cards}
						<div className='row d-flex justify-content-center'>
							<h3 className="text-center grid--cell fl1 fs-headline1" style={{
								color: 'black', borderRadius: '7px', padding: '3px'
							}}>Upcoming Deadlines</h3>
						</div>
						<div className='row d-flex justify-content-center'>
							{heading}
						</div>
						<div className='row d-flex justify-content-center'>
							{tableContent}
						</div>

						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={customStyles}
							contentLabel="Student Details"
							shouldCloseOnEsc={false}
							ariaHideApp={false}
						>{modalContent}</Modal>
					</div>
				)
			}

		} else if (userRole === 'hod') {
			const {hodLoading, hodHome} = this.props.home;
			let heading=null, tableData=null, tableContent=null;
			let cards = null;
			if (hodLoading || hodHome === null) {
				return (<Spinner/>)
			} else {
				const isMobile = this.state.width <= 575;
					if (isMobile) {
						cards = (<div className='row d-flex justify-content-between' style={{margin: '2px'}}>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#f40058', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'
											 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<p style={{color: 'white', fontWeight: 'bold'}}>New Lor Requests</p>
											<img style={{width: 'auto'}} src={require('../../img/facultyIcons/new.png')} alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.newRequests}
											</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#00bcc1', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'
											 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<p style={{color: 'white', fontWeight: 'bold'}}>Accepted Lor Requests</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/facultyIcons/pending.png')}
													 alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.acceptedRequests}
											</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#24af2f', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'
											 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<p style={{color: 'white', fontWeight: 'bold'}}>Completed Lor</p>
											<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.completedRequests}
											</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#f40058', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Total Students</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/student.png')}
													 alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.studentCnt}
											</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#00bcc1', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'>
											<p style={{color: 'white', fontWeight: 'bold'}}>Total Faculty</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/professor.png')}
													 alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.facultyCnt}
											</h1>
									</div>
								</Card>
							</div>
							<div className='col-md-4'>
								<Card style={{
									backgroundColor: '#24af2f', marginRight: '20px', padding: '5px', margin: '3px'
								}}>
									<div className='row d-flex justify-content-between col-md-12'
											 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<p style={{color: 'white', fontWeight: 'bold'}}>Currently Active Users</p>
											<img style={{width: '65px', maxHeight: '90px'}}
													 src={require('../../img/landingIcons/activeUsers.png')}
													 alt=''/>
											<h1 style={{color: 'white', fontWeight: 'bold'}}>
												{hodHome.activeUserCnt}
											</h1>
									</div>
								</Card>
							</div>
						</div>)
					} else {
						cards = (
							<div className='row d-flex justify-content-between' style={{margin: '2px'}}>
								<div className='col-md-4'>
									<Card style={{
										backgroundColor: '#f40058', marginRight: '20px', padding: '5px', margin: '3px'
									}}>
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=' '>
												<p style={{color: 'white', fontWeight: 'bold'}}>New Lor Requests</p>
												<img style={{width: 'auto'}} src={require('../../img/facultyIcons/new.png')} alt=''/>
											</div>
											<div className=' ' style={{marginRight: '5px'}}>
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
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=''>
												<p style={{color: 'white', fontWeight: 'bold'}}>Accepted Lor Requests</p>
												<img style={{width: '65px', maxHeight: '90px'}}
														 src={require('../../img/facultyIcons/pending.png')}
														 alt=''/>
											</div>
											<div className=''>
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
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=''>
												<p style={{color: 'white', fontWeight: 'bold'}}>Completed Lor</p>
												<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
											</div>
											<div className=''>
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
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=''>
												<p style={{color: 'white', fontWeight: 'bold'}}>Total Students</p>
												<img style={{width: '65px', maxHeight: '90px'}}
														 src={require('../../img/landingIcons/student.png')}
														 alt=''/>
											</div>
											<div className=' '>
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
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=' '>
												<p style={{color: 'white', fontWeight: 'bold'}}>Total Faculty</p>
												<img style={{width: '65px', maxHeight: '90px'}}
														 src={require('../../img/landingIcons/professor.png')}
														 alt=''/>
											</div>
											<div className=' '>
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
										<div className='row d-flex justify-content-between'
												 style={{paddingLeft: '10px', paddingRight: '10px'}}>
											<div className=''>
												<p style={{color: 'white', fontWeight: 'bold'}}>Currently Active Users</p>
												<img style={{width: '65px', maxHeight: '90px'}}
														 src={require('../../img/landingIcons/activeUsers.png')}
														 alt=''/>
											</div>
											<div className=' '>
												<h1 style={{color: 'white', fontWeight: 'bold'}}>
													{hodHome.activeUserCnt}
												</h1>
											</div>
										</div>
									</Card>
								</div>
							</div>
						)
					}
				if (hodHome.activeUserContent.length === 0) {
					heading = (
						<h5>No currently active users</h5>
					);
				} else {
					heading = null
					tableData = formatActiveUsersData(hodHome.activeUserContent);
					tableContent = (
						<ReactTable
							data={tableData}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							style={{overflow:'wrap', minWidth:'100%'}}
							minRows={1}
							columns={[
								{
									// Header: "Name",
									columns: [
										{
											Header: "User Id",
											accessor: "userId",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["studentId"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Email Address",
											accessor: "email",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["email"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "First Name",
											accessor: "firstName",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["firstName"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Last Name",
											accessor: "lastName",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["lastName"]}),
											filterAll: true,
											style: { 'whiteSpace': 'unset' }
										}
									]
								},
								{
									// Header: "Name",
									columns: [
										{
											Header: "Role",
											accessor: "role",
											filterMethod: (filter, rows) =>
												matchSorter(rows, filter.value, {keys: ["role"]}),
											filterAll: true,
											expander: false,
											style: { 'whiteSpace': 'unset' }
										}
									]
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
					);

				}
				return (
					<div className="container-fluid ">
						<button
							className="rounded border d-flex justify-content-center align-items-center flex-grow-1 pl-1 w-100 my-3"
							style={{
								boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
									'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
								fontSize: '25px', background: '#000d69', color: 'white'
							}}>Welcome to Computer Science Head of the Department Dashboard
						</button>
						{cards}
						<div className='row col-md-12 d-flex justify-content-center'>
							<h3>Currently Active Users</h3>
						</div>
						{heading}
						{tableContent}
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
	hodHome: PropTypes.func.isRequired,
	markAsComplete: PropTypes.func.isRequired,
	googleLogoutAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	home: state.home,
	auth: state.auth,
});
export default connect(mapStateToProps, {studentHome, facultyHome, hodHome, markAsComplete, googleLogoutAction})(Dashboard)

//
// {/*<div className=" input-group md-form form-sm form-2 pl-0" style={{*/}
// 								{/*	width: '500px', maxWidth: '700px',*/}
// 								{/*	maxHeight: '38px'*/}
// 								{/*}}>*/}
// 								{/*	<div style={{minWidth: '100px'}}>*/}
// 								{/*		<Select options={[{value: 'test', label: 'test'}]}*/}
// 								{/*						className={classnames('isSearchable',*/}
// 								{/*							{'is-invalid': errors.category})}*/}
// 								{/*						placeholder="Type"*/}
// 								{/*						name="category" value={null} onChange={this.onCatChange}>*/}
// 								{/*		</Select>*/}
// 								{/*		{errors.category && (*/}
// 								{/*			<div className="invalid-feedback">{errors.category}</div>*/}
// 								{/*		)}*/}
// 								{/*	</div>*/}
// 								{/*	<input type="text"*/}
// 								{/*				 className={classnames('form-control my-0 py-1 lime-border ', {'is-invalid': errors.search})}*/}
// 								{/*				 placeholder="Select type and Start typing..."*/}
// 								{/*				 name="search"*/}
// 								{/*				 value={this.state.search} onChange={this.onChange}/>*/}
// 								{/*	{errors.search && (<div className="invalid-feedback">{errors.search}</div>*/}
// 								{/*	)}*/}
// 								{/*	<button type="submit" onClick={this.onSubmit} className='btn-sm'*/}
// 								{/*					style={{background: 'white', borderStyle: 'none', margin: '0px'}}>*/}
// 								{/*		Clear*/}
// 								{/*	</button>*/}
// 								{/*</div>*/}