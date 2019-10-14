import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import Select from 'react-select'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import SearchBar from "./SearchBar";
import {facultyHome, studentHome} from "../../actions/homeActions";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			uploadModal: false,
			currentPage: 1,
			todosPerPage: 25,
			errors: {}
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSelectType = this.onSelectType.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.user.role === 'admin') {
		} else if (this.props.auth.user.role === 'student') {
			this.props.studentHome(this.props.match.params.id)
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
		let {errors}=this.state
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
				homeContent = <Spinner/>;
				console.log({Here: homeContent, hello: 'True'})
			} else {
				homeContent = facultyHome;
				console.log({Here: homeContent, hello: 'True'})
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
											0
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
										<img style={{width: '65px', maxHeight: '90px'}} src={require('../../img/facultyIcons/pending.png')}
												 alt=''/>
									</div>
									<div className='d-flex justify-content-end col-md-4'>
										<h1 style={{color: 'white', fontWeight: 'bold'}}>
											0
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
										<p style={{color: 'white'}}>Completed Lor Requests</p>
										<img style={{width: '60px'}} src={require('../../img/facultyIcons/email.png')} alt=''/>
									</div>
									<div className='d-flex justify-content-end col-md-4'>
										<h1 style={{color: 'white', fontWeight: 'bold'}}>
											0
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
							<div className=" input-group md-form form-sm form-2 pl-0" style={{width: '500px', maxWidth: '700px',
								maxHeight:'38px'}}>
								<div style={{minWidth: '100px'}}>
									<Select options={[{value:'test', label:'test'}]}
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
													style={{background:'white', borderStyle:'none', margin:'0px'}}>
										Clear
									</button>
							</div>
						</div>
						<table className="table table-bordered table-striped mb-0">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Faculty Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>Faculty Email
									Address
								</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor Purpose</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor created on</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Lor for University</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Deadline for Application</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Application Status</th>
							</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</div>
				</div>
			)
		}
	}
}

Dashboard.propTypes = {
	home: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	studentHome: PropTypes.func.isRequired,
	facultyHome: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	home: state.home,
	auth: state.auth,
});
export default connect(mapStateToProps, {studentHome, facultyHome})(Dashboard)
