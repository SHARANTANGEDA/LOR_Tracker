import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from "classnames";
import getYearsForSelector from '../../../../utils/getYearsForSelector'
import TextFieldGroup from "../../../common/TextFieldGroup";

class ThesisDone extends Component {
	constructor() {
		super();
		this.state = {
			thesis: [{
				thesisTitle: '',
				year: '',
				sem: '',
			}],
			errors: {},
			thesisCnt: 1,
			years: ['year-0'],
			thesisTitles: ['thesis-0'],
			yearsControl: [],
			semControl: [],
			semesters: ['sem-0'],
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddThesis = this.onAddThesis.bind(this);
		this.onRemove = this.onRemove.bind(this)
	}

	// changeHandler(e) {
	// 	console.log({[e.target.name]: e.target.value})
	// }
	changeHandler = (i, type) => e => {
		console.log({HANDLER_LOG: {i: i, type: type, e: e, eValue: e.target}});
		let thesisHandler = this.state.thesis;
		if (type === 'thesisTitle') {
			thesisHandler[i].thesisTitle = e.target.value
		} else if (type === 'year') {
			thesisHandler[i].year = e.value;
			let yearsChange = this.state.yearsControl;
			yearsChange[i] = e;
			this.setState({yearsControl: yearsChange})
		} else if (type === 'sem') {
			thesisHandler[i].sem = e.value;
			let semChange = this.state.semControl;
			semChange[i] = e;
			this.setState({semControl: semChange})
		}
		this.setState({
			thesis: thesisHandler
		});
				let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].thesis_done=thesisHandler;
		this.props.checkbox.selected = getSelected
		console.log({STATE_LOG:
				{thesis: this.state.thesis, handler: thesisHandler, yearsControl: this.state.yearsControl, semControl: this.state.semControl}})
	};


	// 	this.setState({[e.target.name]: e.target.value});
	componentDidMount(){
		this.setState({errors: this.props.front_errors})
	}

	onAddThesis() {
		let newThesisArray = this.state.thesisTitles,newYearArray = this.state.years, newSemArray = this.state.semesters,
			newThesis = this.state.thesis;
		newThesisArray.push('thesis-' + this.state.thesisCnt);
		newYearArray.push('year-' + this.state.thesisCnt);
		newSemArray.push('sem-' + this.state.courseCnt);
		newThesis.push({
			thesisTitle: '',
			year: '',
			sem: ''
		});
		this.setState({
			thesisCnt: this.state.thesisCnt + 1,
			years: newYearArray,
			thesisTitles: newThesisArray,
			thesis: newThesis,
			semesters: newSemArray
		})

	}
	onRemove(index) {
		if(this.state.thesisCnt===1) {
			this.setState({thesis: [{
				thesisTitle: '',
				year: '',
				sem: '',
			}],years: ['year-0'],
			thesisTitles: ['thesis-0'], semesters: ['sem-0'],});
			let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].thesis_done=this.state.thesis;
		this.props.checkbox.selected = getSelected
		}else {
		this.state.thesis.splice(index,1);
		this.state.years.splice(index,1);
		this.state.thesisTitles.splice(index, 1);
		this.state.semesters.splice(index,1);
		this.setState({thesis:this.state.thesis,thesisCnt:this.state.thesisCnt-1,
		years: this.state.years,
			thesisTitles: this.state.thesisTitles,
			semesters: this.state.semesters
		});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].thesis_done=this.state.thesis;
		this.props.checkbox.selected = getSelected
		}
	}
	onSubmit(e) {
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].thesis_done=this.state.thesis;
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
		let inputs = []
		for (let i = 0; i < this.state.thesisCnt; i++) {
			let errors={};
			if(this.props.checkbox.errors && this.props.checkbox.errors.thesis_done &&
				this.props.checkbox.errors.thesis_done[i]) {
				errors=this.props.checkbox.errors.thesis_done[i]
			}
			inputs.push(<div className='row' style={{margin:'3px'}} key={i}>
				<div className='row d-flex justify-content-between col-md-12'>
								<h6>Thesis {i+1}:</h6>
										<button onClick={() => this.onRemove(i)}
									style={{background:'none', color:'black', borderStyle:'none'}}><i className="fas fa-times"/></button>

				</div>
				<div className='row'>
					<div className='col-md-12'>
					<TextFieldGroup placeholder="Enter Thesis Titles" error={errors.thesisTitle}
												type="text" onChange={this.changeHandler(i, 'thesisTitle')}
												value={this.state.thesis[i].thesisTitle}
												name={this.state.thesisTitles[i]}/>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6' style={{marginRight:'2px'}}>
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

					<div className='col-md-6' >
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
			<div className="ThesisDone container-fluid col-md-12">
					{/*<h3>Add Courses, projects or thesis done with faculty</h3>*/}
					{/*<div className="row text-center">*/}
					{/*	<p>*/}
					{/*		It is recommended that you do at least one of the following for Lor Request to be accepted*/}
					{/*	</p>*/}
					{/*	<hr/>*/}
					{/*</div>*/}
					{inputs}
					<div className="row text-center d-flex justify-content-center">
						<button type="submit" onClick={this.onAddThesis} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px'}}>
							<i className="fas fa-plus"/>Add another Thesis
						</button>

					</div>
			</div>
		);
	}
}

ThesisDone.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	facultyId: PropTypes.number.isRequired,
	checkbox: PropTypes.object.isRequired,
	selectionIndex: PropTypes.number.isRequired,

};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(ThesisDone);
