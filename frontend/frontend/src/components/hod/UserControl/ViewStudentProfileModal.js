import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import axios from "axios";
import {tokenHeader} from "../../../utils/headers";
import StudentProfilePanel from "./StudentProfilePanel";


class ViewStudentProfileModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
      image: null,
    };
		this.onReject = this.onReject.bind(this);
		this.onAccept = this.onAccept.bind(this);
	}

	componentDidMount(){
    let imageData=null
    axios.get(`api/hod/getProfilePhoto/${this.props.content.student_details_general.id}`,tokenHeader())
    .then((response) => {
      console.log(response.data, response);
      imageData= response.data;
      if(imageData.status===false) {
        this.setState({image: false})
      }
      this.setState( {image:imageData})
    })
}
	onReject() {

	}

	onAccept() {

	}

	render() {

		const {content} = this.props;
		let imgContent = null;
		if(this.state.image===false) {
			imgContent=(<img src={require('../../../img/landingIcons/student.png')}
								height='150px' width='150px' alt={require('../../../img/landingIcons/student.png')}
                   style={{maxHeight:'250px', width:'225px'}}/>)
		}else {
			imgContent=(<img src={`data:;base64,${this.state.image}`}
								height='180px' width='160px' alt=''
                   style={{maxHeight:'250px', maxWidth:'225px'}}/>)
		}
		return (
			<div className='row col-md-12' >
				<div className='col-md-3'>
					{imgContent}
				</div>
				<div  className='col-md-9'>
					<StudentProfilePanel studentProfile={content.student_details_profile}
												 user={content.student_details_general}/>
				</div>
			</div>
		);
	}

}

ViewStudentProfileModal.propTypes = {
	content: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(ViewStudentProfileModal);