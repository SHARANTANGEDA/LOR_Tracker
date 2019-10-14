import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from "classnames";
import getYearsForSelector from '../../../../utils/getYearsForSelector'
import TextFieldGroup from "../../../common/TextFieldGroup";

class ProjectsDone extends Component {
	constructor() {
		super();
		this.state = {
			projects: [{
				projectTitle: '',
				year: '',
			}],
			errors: {},
			projectCnt: 1,
			years: ['year-0'],
			projectTitles: ['project-0'],
			yearsControl: [],
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddProject = this.onAddProject.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}

	// changeHandler(e) {
	// 	console.log({[e.target.name]: e.target.value})
	// 	this.setState({[e.target.name]: e.target.value});
	// }
	changeHandler = (i, type) => e => {
		console.log({HANDLER_LOG: {i: i, type: type, e: e, eValue: e.target}});
		let projectHandler = this.state.projects;
		if (type === 'projectTitle') {
			projectHandler[i].projectTitle = e.target.value
		} else if (type === 'year') {
			projectHandler[i].year = e.value;
			let yearsChange = this.state.yearsControl;
			yearsChange[i] = e;
			this.setState({yearsControl: yearsChange})
		}
		this.setState({
			projects: projectHandler
		});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=projectHandler;
		this.props.checkbox.selected = getSelected;
		console.log({STATE_LOG:
				{projects: this.state.projects, handler: projectHandler, yearsControl: this.state.yearsControl}})
	};


	onAddProject() {
		let newProjectArray = this.state.projectTitles,newYearArray = this.state.years,
			newProjects = this.state.projects;
		newProjectArray.push('project-' + this.state.projectCnt);
		newYearArray.push('year-' + this.state.projectCnt);
		newProjects.push({
			projectTitle: '',
			year: ''
		});
		this.setState({
			projectCnt: this.state.projectCnt + 1,
			years: newYearArray,
			projectTitles: newProjectArray,
			projects: newProjects
		})

	}

	onSubmit(e) {
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
	}
	onRemove(index) {
		if(this.state.projectCnt===1) {
		this.setState({projects: [{
				projectTitle: '',
				year: '',
			}],
			years: ['year-0'],
			projectTitles: ['project-0'],});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
		}else {
		this.state.projects.splice(index,1);
		this.state.years.splice(index,1);
		this.state.projectTitles.splice(index, 1);
		this.setState({projects:this.state.projects,projectCnt:this.state.projectCnt-1,
		years: this.state.years,
			projectTitles: this.state.projectTitles,
		});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
		}
	}
	onUnSelect(e) {
		this.setState({selected: false});
		let unSelect = this.props.checkbox.selected;
		// let index=-1;
		unSelect = unSelect.filter(item => item.faculty_id !== e);
		// let index = unSelect.indexOf(e);
		// if (index !== -1) {
		//   unSelect.splice(index, 1);
		// }
		this.props.checkbox.selected = unSelect;
		console.log({selected: this.props.checkbox.selected})
	}

	render() {
		const {errors} = this.state;
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px',
				'min-width': '180px'
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px',
				minWidth: '180px'
			}),
		};
		let yearSelector = getYearsForSelector();
		let inputs = []
		for (let i = 0; i < this.state.projectCnt; i++) {
			let errors={};
			if(this.props.checkbox.errors && this.props.checkbox.errors.projects_done &&
				this.props.checkbox.errors.projects_done[i]) {
				errors=this.props.checkbox.errors.projects_done[i]
			}
			inputs.push(<div className='row' style={{margin:'3px'}} key={i}>
				<div className='row d-flex justify-content-between col-md-12'>
								<h6>Project {i+1}:</h6>
										<button onClick={() => this.onRemove(i)}
									style={{background:'none', color:'black', borderStyle:'none'}}><i className="fas fa-times"/></button>

				</div>
				<div className='row col-md-12'>
					<TextFieldGroup placeholder="Enter Project Title" error={errors.projectTitle}
												type="text" onChange={this.changeHandler(i, 'projectTitle')}
												value={this.state.projects[i].projectTitle}
												name={this.state.projectTitles[i]}/>
				</div>
				<div className='row'>
						<Select options={yearSelector}
										className={classnames('isSearchable', {'is-invalid': errors.year})}
										styles={customSelectStyles}
										placeholder="Select year"
										name={this.state.years[i]} value={this.state.yearsControl[i]}
										onChange={this.changeHandler(i, 'year')}>
						</Select>
					{errors.year && (
              <div className="invalid-feedback">{errors.year}</div>
					)}
				</div>
				<hr/>
			</div>)
		}
		return (
			<div className="ProjectsDone container-fluid col-md-12">
					{/*<h3>Add Courses, projects or thesis done with faculty</h3>*/}
					{/*<div className="row text-center">*/}
					{/*	<p>*/}
					{/*		It is recommended that you do at least one of the following for Lor Request to be accepted*/}
					{/*	</p>*/}
					{/*	<hr/>*/}
					{/*</div>*/}
					{inputs}
					<hr/>
					<div className="row text-center d-flex justify-content-center">
						<button type="submit" onClick={this.onAddProject} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px'}}>
							<i className="fas fa-plus"/>Add another Project
						</button>

					</div>
			</div>
		);
	}
}

ProjectsDone.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	facultyId: PropTypes.number.isRequired,
	checkbox: PropTypes.object.isRequired,
	selectionIndex: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(ProjectsDone);
