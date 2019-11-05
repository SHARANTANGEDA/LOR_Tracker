import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import CoursesDone from "./CoursesDone";
import ProjectsDone from "./ProjectsDone";
import ThesisDone from "./ThesisDone";
import TextAreaFieldGroup from "../../../common/TextAreaGroupField";

class CPTEditSelector extends Component {
	constructor() {
		super();
		this.state = {
			courses: [],
			projects: [],
			thesis: [],
			status: false,
			others: '',
			errors: {},
			showOthers: false
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.codeSelect = this.codeSelect.bind(this);
		this.onClickOthers=this.onClickOthers.bind(this);
		this.onBack=this.onBack.bind(this)
	}

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	componentDidMount() {
		this.setState({others:this.props.editData.others})
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps) {
			this.setState({errors: nextProps.errors})
		}
	}
	onClickOthers() {
		this.setState({showOthers: true});
		this.props.checkbox.editData.courses_done=[];
		this.props.checkbox.editData.projects_done=[];
		this.props.checkbox.editData.thesis_done=[];
		this.props.checkbox.editData.status=true;
	}
	onSubmit(e) {
		//Enter Update data
	}

	onBack() {
		this.setState({showOthers: false});
		this.props.checkbox.editData.courses_done=[];
		this.props.checkbox.selected[this.props.selectionIndex].projects_done=[];
		this.props.checkbox.selected[this.props.selectionIndex].thesis_done=[];
		this.props.checkbox.selected[this.props.selectionIndex].status=false;
		this.props.checkbox.selected[this.props.selectionIndex].others='';
	}


	codeSelect(e) {
		this.setState({campusCode: e})
	}

	render() {
		const {errors} = this.state;
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px',
				'min-width': '250px'
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px',
				minWidth: '250px'
			}),
		};
		let normalHeaders = (
			<div className="row text-center">
						<p>
							You have not done anything under the faculty?, but want to apply for LOR,<button type="submit" onClick={this.onClickOthers} className="  text-center"
										style={{border: 'none', color: 'blue', borderStyle:'none', background:'none', margin:'0', padding:'0'}}>
							Click Here
						</button>
						</p>
						<hr/>
					</div>
		);
		let normalContent = (
			<div className='row col-md-12 d-flex justify-content-between'>
						<div className='col-md-4'>
							<div className='row d-flex justify-content-center'>
								<h4 	style={{

										fontSize: '20px', background: '#000d69', color: 'white', borderRadius:'5px', padding:'5px'
									}}>Add Courses</h4>
							</div>
							<CoursesDone facultyId={this.props.facultyId} data={this.props.editData.courses_done}/>
						</div>
						{/*<div className='verticalLine'/>*/}
						<div className='col-lg-3'>
							<div className='row d-flex justify-content-center'>
								<h4 	style={{

										fontSize: '20px', background: '#000d69', color: 'white', borderRadius:'5px', padding:'5px'
									}}>Add Projects</h4>
							</div>
							<ProjectsDone facultyId={this.props.facultyId} data={this.props.editData.projects_done}/>
						</div>
						{/*<div className='verticalLine'/>*/}
						<div className='col-md-4'>
							<div className='row d-flex justify-content-center'>
								<h4 	style={{

										fontSize: '20px', background: '#000d69', color: 'white', borderRadius:'5px', padding:'5px'
									}}>Add Thesis</h4>
							</div>
							<ThesisDone facultyId={this.props.facultyId} data={this.props.editData.thesis_done}/>
						</div>
					</div>
		);
		let othersContent = (
			<div className='row col-md-12 d-flex justify-content-between'>
							<div className='col-md-12'>
					<TextAreaFieldGroup placeholder="Please describe, the matter clearly" error={errors.others}
												type="text" onChange={this.changeHandler} rows={60} cols="150"
												value={this.state.others}
												name='others'/>
				</div>
			</div>
		);
		let othersHeaders = (
			<div className="row col-md-12 d-flex justify-content-start">
				<button className='btn btn-sm' onClick={this.onBack} style={{background:'none', color: 'green'}}>
								<i className="fas fa-3x fa-chevron-circle-left"/></button>
						<hr/>
			</div>
		);
		return (
			<div className="LoginModal container-fluid col-md-12" style={{margin:'0px'}}>
				<div className="row d-flex justify-content-center">
					<h3 style={{background:'#000d69', color:'white', borderRadius:'10px', padding:'5px'}}>Add Courses, projects or thesis done with faculty</h3>
					{this.state.showOthers ? othersHeaders : normalHeaders}
					{this.state.showOthers ? othersContent : normalContent}
				</div>
			</div>
		);
	}
}

CPTEditSelector.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	facultyId: PropTypes.number.isRequired,
	lor_id: PropTypes.number.isRequired,
	checkbox: PropTypes.object.isRequired,
	editData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(CPTEditSelector);
