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
			}],
			errors: {},
			thesisCnt: 1,
			years: ['year-0'],
			thesisTitles: ['thesis-0'],
			yearsControl: [],
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddThesis = this.onAddThesis.bind(this);
		this.onRemove = this.onRemove.bind(this)
	}

	componentDidMount() {
		if(this.props.data.length!==0) {
			this.setState({thesis: this.props.data, thesisCnt: this.props.data.length+1})
			let years=[], thesisTitles = [];
			for(let i=0; i<=this.props.data.length; i++) {
				thesisTitles.push('thesis-' + i);
				years.push('year-' + i);
			}
			this.setState({years: years, thesisTitles: thesisTitles})
		}
	}
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
		}
		this.setState({
			thesis: thesisHandler
		});
				let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].thesis_done=thesisHandler;
		this.props.checkbox.selected = getSelected
		console.log({STATE_LOG:
				{thesis: this.state.thesis, handler: thesisHandler, yearsControl: this.state.yearsControl}})
	};


	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps) {
			this.setState({errors: nextProps.errors})
		}
	}

	onAddThesis() {
		let newThesisArray = this.state.thesisTitles,newYearArray = this.state.years,
			newThesis = this.state.thesis;
		newThesisArray.push('thesis-' + this.state.thesisCnt);
		newYearArray.push('year-' + this.state.thesisCnt);
		newThesis.push({
			thesisTitle: '',
			year: ''
		});
		this.setState({
			thesisCnt: this.state.thesisCnt + 1,
			years: newYearArray,
			thesisTitles: newThesisArray,
			thesis: newThesis
		})

	}
	onRemove(index) {
		if(this.state.thesisCnt===1) {
			this.setState({thesis: [{
				thesisTitle: '',
				year: '',
			}],years: ['year-0'],
			thesisTitles: ['thesis-0'],});
		this.props.checkbox.editData.thesis_done=this.state.thesis;
		}else {
		this.state.thesis.splice(index,1);
		this.state.years.splice(index,1);
		this.state.thesisTitles.splice(index, 1);
		this.setState({thesis:this.state.thesis,thesisCnt:this.state.thesisCnt-1,
		years: this.state.years,
			thesisTitles: this.state.thesisTitles,
		});
		this.props.checkbox.editData.thesis_done=this.state.thesis;
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
				<div className='row col-md-12'>
					<TextFieldGroup placeholder="Enter Thesis Titles" error={errors.thesisTitle}
												type="text" onChange={this.changeHandler(i, 'thesisTitle')}
												value={this.state.thesis[i].thesisTitle}
												name={this.state.thesisTitles[i]}/>
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
			<div className="ThesisDone container-fluid col-md-12">
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
	data: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(ThesisDone);
