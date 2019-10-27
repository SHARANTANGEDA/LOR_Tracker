import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getSavedLor} from "../../../actions/lorActions";
import getLocalDate from "../../../utils/getLocalDate";

class LorSelector extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			todosPerPage: 25,
			focusedInput: null,
			filter: null,
			state: null
		};
		this.handleClick = this.handleClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
    this.onUnSelect = this.onUnSelect.bind(this);
	}

	// componentDidMount() {
	// 	if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
	// 		this.props.getSavedLor(this.props.match.params.id)
	// 	}
	// }

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	onSelect (e) {
		console.log(e)
		this.props.lor.selectLor=e;
		this.setState({selected:e});

  }

  onUnSelect (e) {
		this.props.lor.selectLor=null;
		this.setState({selected:null});
	}

	render() {
		function sort_by_key(array, key) {
			return array.sort(function (a, b) {
				let x = a[key].toUpperCase();
				let y = b[key].toUpperCase();
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}

		const {lorLoading, savedLor} = this.props.lor;
		const {currentPage, todosPerPage} = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const pageNumbers = [];
		let renderpn, checkbox;
		let allFoldersContent, heading;
		// if(this.props.lor.selectLor!==this.props.lorItem.id) {
    //   checkbox=(<td>
    //     <button onClick={this.onSelect} style={{background:'white', color:'blue', borderStyle:'none'}}>
    //       <i className="far fa-check-square fa-2x"/></button></td>)
    // }else {
    //   checkbox=(<td onClick={this.onUnSelect}
    //   ><button style={{background:'white', color:'blue', borderStyle:'none'}}>
    //     <i className="fas fa-check-square fa-2x"/></button></td>)
		//
    // }
		if (lorLoading || savedLor === null) {
			allFoldersContent = (<Spinner/>)
		} else {
			if (savedLor.length === 0) {
				allFoldersContent = (
					<h5>You haven't created any LOR yet!!</h5>
				);
			} else {
				const currentFolder = savedLor.slice(indexOfFirstTodo, indexOfLastTodo);
				const render = (currentFolder.map(lor => (
					<tr key={lor.id}>
						{/*<td>{checkbox}</td>*/}
						{this.state.selected !== lor.id ?
							<td><button onClick={() => this.onSelect(lor.id)} style={{background:'white', color:'blue', borderStyle:'none'}}>
          <i className="far fa-check-square fa-2x"/></button></td> :
						<td onClick={this.onUnSelect}><button style={{background:'white', color:'blue', borderStyle:'none'}}>
        <i className="fas fa-check-square fa-2x"/></button></td>}
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lor.purpose}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lor.university_name}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lor.program_name}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{getLocalDate(lor.deadline)}</span></td>
					</tr>
				)));
				for (let i = 1; i <= Math.ceil(savedLor.length / todosPerPage); i++) {
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
		}
		return (
			<div className='container' style={{margin:'10px'}}>
				<div className="displayFolder ">
					<div className="App-content row d-flex justify-content-between">
						<table className="table table-bordered table-striped mb-0 col-md-12">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Select a Lor</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Purpose</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1', minWidth: '200px'}}>University Name
								</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Program Name</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>deadline</th>
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
			</div>
		);
	}
}

LorSelector.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	getSavedLor: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	lor: state.lor
});
export default connect(mapStateToProps, {getSavedLor})(LorSelector)
