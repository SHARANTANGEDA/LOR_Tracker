import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from "classnames";
import getYearsForSelector from '../../../../utils/getYearsForSelector'
import TextFieldGroup from "../../../common/TextFieldGroup";

class CoursesDone extends Component {
	constructor() {
		super();
		this.state = {
			courses: [{
				courseCode: '',
				sem: '',
				year: ''
			}],
			courseCnt: 1,
			semesters: ['sem-0'],
			years: ['year-0'],
			courseCodes: ['course-0'],
			yearsControl: [],
			semControl: []
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddCourse = this.onAddCourse.bind(this);
		this.onRemove=this.onRemove.bind(this)
	}

	componentDidMount() {
		if(this.props.data.length !== 0) {
			let data = this.props.data;
			let yearsControl=[], semControl=[];
			data.map(item => {
				console.log(item.year, item.sem);
				yearsControl.push({label: item.year,value: item.year});
				semControl.push({label: item.sem,value: item.sem})
			});
			this.setState({courses: this.props.data, courseCnt: this.props.data.length+1, yearsControl: yearsControl,
				semControl: semControl});
			let years=[], courseCodes = [], semesters=[];
			for(let i=0; i<=this.props.data.length; i++) {
				courseCodes.push('course-' + this.state.courseCnt);
				years.push('year-' + this.state.courseCnt);
				semesters.push('sem-' + this.state.courseCnt);
			}
			this.setState({years: years, courseCodes: courseCodes, semesters:semesters})
		}
	}

	changeHandler = (i, type) => e => {
		console.log({HANDLER_LOG: {i: i, type: type, e: e, eValue: e.target}})
		let coursesHandler = this.state.courses;
		if (type === 'courseCode') {
			coursesHandler[i].courseCode = e.target.value
		} else if (type === 'year') {
			coursesHandler[i].year = e.value;
			let yearsChange = this.state.yearsControl;
			yearsChange[i] = e;
			this.setState({yearsControl: yearsChange})
		} else if (type === 'sem') {
			coursesHandler[i].sem = e.value;
			let semChange = this.state.semControl;
			semChange[i] = e;
			this.setState({semControl: semChange})
		}
		this.setState({
			courses: coursesHandler
		});
		let getSelected = this.props.checkbox.editData;
		getSelected.courses_done=coursesHandler;
		this.props.checkbox.editData = getSelected;
		// console.log({
		// 	STATE_LOG: {
		// 		courses: this.state.courses, handler: coursesHandler, yearsControl: this.state.yearsControl,
		// 		semControl: this.state.semControl
		// 	}
		// })
	};




	onRemove(index) {
				console.log({Component:'mounted'})

		if(this.state.courseCnt===1) {
			this.setState({courses: [{
				courseCode: '',
				sem: '',
				year: ''
			}],
			semesters: ['sem-0'],
			years: ['year-0'],
			courseCodes: ['course-0'],});
		this.props.checkbox.editData.courses_done=this.state.courses;
		}else {
			this.state.courses.splice(index, 1);
			this.state.courseCodes.splice(index, 1);
			this.state.semesters.splice(index,1);
			this.state.years.splice(index,1);
			this.setState({courses:this.state.courses,
		years: this.state.years,courseCnt:this.state.courseCnt - 1,
			courseCodes: this.state.courseCodes,
			semesters: this.state.semesters
		});
		this.props.checkbox.editData.courses_done=this.state.courses;
		}

	}
	// componentWillReceiveProps(nextProps, nextContext) {
	// 	if (nextProps) {
	// 		this.setState({errors: nextProps.errors})
	// 	}
	// }

	onAddCourse() {
		let newCourseArray = this.state.courseCodes, newSemArray = this.state.semesters, newYearArray = this.state.years,
			newCourses = this.state.courses;
		newCourseArray.push('course-' + this.state.courseCnt);
		newYearArray.push('year-' + this.state.courseCnt);
		newSemArray.push('sem-' + this.state.courseCnt);
		newCourses.push({
			courseCode: '',
			sem: '',
			year: ''
		});
		this.setState({
			courseCnt: this.state.courseCnt + 1,
			semesters: newSemArray,
			years: newYearArray,
			courseCodes: newCourseArray,
			courses: newCourses
		})

	}

	onSubmit(e) {
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].courses_done=this.state.courses;
		this.props.checkbox.selected = getSelected
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
		let inputs = [];
		for (let i = 0; i < this.state.courses.length; i++) {
			let errors={};
			console.log({EDIT: this.state.courses[i],LEN: this.state.courses.length})
			if(this.props.checkbox.errors && this.props.checkbox.errors.courses_done &&
				this.props.checkbox.errors.courses_done[i]) {
				errors=this.props.checkbox.errors.courses_done[i]
			}
			inputs.push(<div className='row' style={{margin:'3px'}} key={i}>
				<div className='row d-flex justify-content-between col-md-12'>
								<h6>Course {i+1}:</h6>
					<button onClick={() => this.onRemove(i)}
									style={{background:'none', color:'black', borderStyle:'none'}}><i className="fas fa-times"/></button>
				</div>
				<div className='row col-md-12'>
					<TextFieldGroup placeholder="Enter Course Code" error={errors.courseCode}
												type="text" onChange={this.changeHandler(i, 'courseCode')}
												value={this.state.courses[i].courseCode}
												name={this.state.courseCodes[i]}/>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<Select options={yearSelector}
										className={classnames('isSearchable', {'is-invalid':errors.year})}
										styles={customSelectStyles}
										placeholder="Select year"
										name={this.state.years[i]} value={this.state.yearsControl[i]}
										onChange={this.changeHandler(i, 'year')}>
						</Select>
						{errors.year && (
              <div className="invalid-feedback">{errors.year}</div>
            )}
					</div>
					<div className='col-md-6'>
						<Select options={[{value: 'Sem-I', label: 'Sem-I'}, {value: 'Sem-II', label: 'Sem-II'}]}
										className={classnames('isSearchable', {'is-invalid': errors.sem})}
										styles={customSelectStyles}
										placeholder="Select semester"
										name={this.state.semesters[i]} value={this.state.semControl[i]}
										onChange={this.changeHandler(i, 'sem')}>
						</Select>
						{errors.sem && (
              <div className="invalid-feedback">{errors.sem}</div>
            )}
					</div>

				</div>

				<hr/>
			</div>)
		}
		return (
			<div className="LoginModal container-fluid col-md-12">
					{/*<h3>Add Courses, projects or thesis done with faculty</h3>*/}
					{/*<div className="row text-center">*/}
					{/*	<p>*/}
					{/*		It is recommended that you do at least one of the following for Lor Request to be accepted*/}
					{/*	</p>*/}
					{/*	<hr/>*/}
					{/*</div>*/}
					{inputs}
					<div className="row text-center d-flex justify-content-center">
						<button type="submit" onClick={this.onAddCourse} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px'}}>
							<i className="fas fa-plus"/>Add another Course
						</button>

					</div>
			</div>
		);
	}
}

CoursesDone.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	facultyId: PropTypes.number.isRequired,
	checkbox: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(CoursesDone);
