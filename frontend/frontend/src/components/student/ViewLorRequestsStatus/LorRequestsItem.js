import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../utils/getLocalDate"
import Modal from "react-modal";
import validateLorSubmission from "../../../validation/validateLorSubmission";
import isEmpty from "../../../validation/is-empty";
import CPTEditSelector from "./CPT/CPTEditSelector";

const customStyles = {
	content: {
		top: '5%',
		left: '5%',
		right: '5%',
		bottom: '5%',
		marginRight: '0',
		transform: 'translate(-0%, -0%)',
		backgroundColor: 'rgba(255,167,38,0.8)'
	},
	// overlay: {
  //     position: 'fixed',
  //     top: '5px',
  //     left: '1px',
  //     right: '1px',
  //     bottom: '1px',
  //     backgroundColor: '#a0a79f'
  //   },
};
class LorRequestsItem extends Component {
  constructor() {
		super();
		this.state = {
			modalIsOpen: false,
		};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

	}

  openModal (e) {
    // let getSelected = this.props.checkbox.selected;
    // this.setState({selected: true});
		// let data = {
		// 	faculty_id:e,
		// 	courses_done:[],
		// 	projects_done: [],
		// 	thesis_done: [],
		// 	status: false,
		// 	others: ''
		// };
    // getSelected.push(data);
    // this.props.checkbox.selected = getSelected;
    // console.log(this.props.checkbox.selected);
    this.setState({ modalIsOpen: true });

  }
	afterOpenModal () {

  }
  	closeModal () {
		const errors=validateLorSubmission(this.props.checkbox.selected);
		if(!isEmpty(errors)) {
			this.props.checkbox.errors=errors;
		}else {
			this.setState({ modalIsOpen: false });
		}
  }
  render () {
    const {application} = this.props;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let app_status=null;
    if(application.application_status==='AP') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'blue'}}>Applied</span></td>)

    }else if(application.application_status==='AC') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'green'}}>Accepted</span></td>)
    }else if(application.application_status==='RE') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'red'}}>Rejected</span></td>)
    }else if(application.application_status==='CO') {
      app_status=(<td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:'white', background:'green', padding: '2px',
        borderRadius: '5px'}}>
        Done</span></td>)
    }
    let modalContent = (
				<div className='row container-fluid'>
					<div className="col-md-12 d-flex justify-content-end">
						<button type="submit" onClick={this.closeModal} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px', fontSize:'18px'}}>
							Done
						</button>

					</div>
					<div className='row'>
						<CPTEditSelector facultyId={application.faculty} lor_id={application.lor} editData={application}/>
					</div>
				</div>
			)
    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>
          {capitalizeFirstLetter(application.faculty.first_name+application.faculty.last_name)}
        </span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.faculty.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.lor.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{getLocalDate(application.lor.created_at)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{application.lor.university_name}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(application.lor.deadline)}</span></td>
        <td>
          <button  style={{color:'blue'}} onClick={this.openModal} className='btn btn-sm'>
            <i className="fas fa-edit fa-2x"/></button>
        </td>
				{app_status}
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Select Courses and Projects"
					shouldCloseOnOverlayClick={false}
					modalOptions={{ dismissible: false }}
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>{modalContent}</Modal>
      </tr>

    )
  }
}

LorRequestsItem.propTypes = {
  application: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LorRequestsItem);