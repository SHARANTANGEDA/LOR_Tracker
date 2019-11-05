import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../utils/getLocalDate"
import {deleteLor} from "../../../actions/lorActions";
import Modal from "react-modal";
import EditLorModal from "./EditLorModal";

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

class SavedLorItem extends Component {
  constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			editModal: false
		};
		this.openModal = this.openModal.bind(this)
		this.editModal = this.editModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}
	openModal() {
    this.setState({modalIsOpen: true})
  }
  editModal() {
  	this.setState({editModal: true, modalIsOpen: true})
	}
  closeModal() {
    this.setState({modalIsOpen: false, editModal: false})
  }
  afterOpenModal() {}
	onDelete() {
    this.props.deleteLor(this.props.lorItem.id)
  }
  render () {
    const {lorItem} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let status = (<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color: 'green'}}>Active</span></td>);
    if(lorItem.expired===true) {
      status = (<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color: 'red'}}>Expired</span></td>);
    }
    let modalContent = null;
    if(this.state.editModal) {
    	modalContent = (<EditLorModal lorItem={this.props.lorItem} univ={this.props.univ}/>)
		}else {
    	modalContent = (
				<div className='row container-fluid'>
          <h5>Do you wish to delete the Lor?</h5>
					<div className="col-md-12 d-flex justify-content-end">
						<button type="submit" onClick={this.onDelete} className="btn-sm  text-center"
										style={{background: 'red', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
							Delete <i className="fas fa-trash-alt"/>
						</button>
            <button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
							Cancel
						</button>
					</div>
				</div>
			)
		}

    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.university_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.program_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.deadline)}</span></td>
        {status}
        <td>
          <button  style={{color:'blue'}} onClick={this.editModal} className='btn btn-sm'>
            <i className="fas fa-edit fa-2x"/></button>
        </td>
        <td>
          <button  style={{color:'red'}} onClick={this.openModal} className='btn btn-sm'>
            <i className="fas fa-trash-alt fa-2x"/></button>
        </td>
        <Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Select Courses and Projects"
					ariaHideApp={false}
				>{modalContent}</Modal>
      </tr>

    )
  }
}

SavedLorItem.propTypes = {
  lorItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteLor: PropTypes.func.isRequired,
	univ: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {deleteLor})(SavedLorItem);