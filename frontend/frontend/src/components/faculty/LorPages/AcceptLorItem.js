import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../utils/getLocalDate"
import AcceptLorModal from "./AcceptLorModal";
import Modal from "react-modal";
import {acceptLorRequest, rejectLorRequest} from "../../../actions/homeActions";

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

class AcceptLorItem extends Component {
  constructor() {
    super()
    this.state= {
      modalIsOpen: false,
      rejectionModal: false
    }
    this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onRejectionModal=this.onRejectionModal.bind(this);
    this.closeRejectionModal=this.closeRejectionModal.bind(this);
    this.onAcceptModal = this.onAcceptModal.bind(this)
  }
  openModal(e) {
		this.setState({modalIsOpen: true, currentData: e})
	}

	closeModal() {
		this.setState({modalIsOpen: false, rejectionModal: false})
	}

	afterOpenModal() {

	}
	onRejectionModal() {
    this.setState({rejectionModal: true})
  }
  closeRejectionModal() {
    this.setState({rejectionModal: false})
  }
  onAcceptModal() {
    this.props.acceptLorRequest(this.props.lorItem.application_details.lor, this.props.lorItem.application_details.faculty)
  }
  render () {
    const {lorItem} = this.props;
    let modalContent;
    if(!this.state.rejectionModal) {
      modalContent = (
        <div id="mainbar" className='row d-flex justify-content-start'>
          <div className="col-md-12 d-flex justify-content-between" style={{ width: '100%', margin:'5px' }}>
            <h5>Complete Details:</h5>
            <button onClick={this.closeModal} className='btn btn-sm' style={{ background: 'white', color: 'red' }}>
              <i className="fas fa-times fa-2x"/>
            </button>
          </div>
					<AcceptLorModal content={this.props.lorItem}/>
					<div className="col-md-12 d-flex justify-content-end" style={{ width: '100%', margin:'5px' }}>
            <button onClick={this.onAcceptModal} className='btn btn-sm' style={{ background: 'green', color: 'white' }}>
              Accept Request
            </button>
            <button onClick={this.onRejectionModal} className='btn btn-sm' style={{ background: 'red', color: 'white' }}>
              Reject Lor Request
            </button>
          </div>
        </div>
      );
    }else {
      modalContent = (
        <div id="mainbar" className='row d-flex justify-content-start'>
          <div className="col-md-12 d-flex justify-content-between" style={{ width: '100%', margin:'5px' }}>
            <h5>Confirm Rejection:</h5>
            <button onClick={this.closeModal} className='btn btn-sm' style={{ background: 'white', color: 'red' }}>
              <i className="fas fa-times fa-2x"/>
            </button>
          </div>
          <h6>Are you sure you want to reject the Lor Request?</h6>
					<div className="col-md-12 d-flex justify-content-end" style={{ width: '100%', margin:'5px' }}>
            <button onClick={this.closeModal} className='btn btn-sm btn-primary' >
              Confirm Reject
            </button>
            <button onClick={this.closeRejectionModal} className='btn btn-sm' style={{ background: 'green', color: 'white' }}>
             Go Back
            </button>
          </div>
        </div>
      )
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
     <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_profile.student_id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_general.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.lor_details.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.lor_details.created_at)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.lor_details.deadline)}</span></td>
        <td><button onClick={this.openModal} className='btn btn-sm btn-primary' >View Complete Details</button></td>
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

AcceptLorItem.propTypes = {
  lorItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  acceptLorRequest: PropTypes.func.isRequired,
  rejectLorRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {acceptLorRequest, rejectLorRequest})(AcceptLorItem);