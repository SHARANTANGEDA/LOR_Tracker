import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../../utils/getLocalDate"
import AcceptLorModal from "../AcceptLorModal";
import Modal from "react-modal";

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

class CompletedLorItem extends Component {
	constructor() {
		super()
		this.state = {
			modalIsOpen: false,
		}
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onComplete = this.onComplete.bind(this)
	}

	openModal(e) {
		this.setState({modalIsOpen: true, currentData: e})
	}

	closeModal() {
		this.setState({modalIsOpen: false, rejectionModal: false})
	}

	afterOpenModal() {

	}


	onComplete() {
		console.log(this.props.lorItem.application_details.lor, this.props.lorItem.application_details.faculty)
		this.props.markAsComplete(this.props.lorItem.application_details.lor, this.props.lorItem.application_details.faculty)
	}

	render() {
		const {lorItem} = this.props;
		let modalContent = (
			<div id="mainbar" className='row d-flex justify-content-start'>
				<div className="col-md-12 d-flex justify-content-between" style={{width: '100%', margin: '5px'}}>
					<h5>Complete Details:</h5>
					<button onClick={this.closeModal} className='btn btn-sm' style={{background: 'white', color: 'red'}}>
						<i className="fas fa-times fa-2x"/>
					</button>
				</div>
				<AcceptLorModal content={this.props.lorItem}/>
			</div>
		);

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		return (
			<tr>
				<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lorItem.student_details_profile.student_id}</span>
				</td>
				<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lorItem.student_details_general.email}</span></td>
				<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{lorItem.lor_details.purpose}</span></td>
				<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{getLocalDate(lorItem.lor_details.created_at)}</span>
				</td>
				<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{getLocalDate(lorItem.lor_details.deadline)}</span>
				</td>
				<td>
					<button onClick={this.openModal} className='btn btn-sm btn-primary'>View Complete Details</button>
				</td>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Student Details"
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>{modalContent}</Modal>
			</tr>

		)
	}
}

CompletedLorItem.propTypes = {
	lorItem: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(CompletedLorItem);