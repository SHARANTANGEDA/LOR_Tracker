import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ModalTabContents from "./ModalTabContents";


class AcceptLorModal extends Component {
	constructor() {
		super();
		this.onReject = this.onReject.bind(this);
		this.onAccept = this.onAccept.bind(this);
	}

	onReject() {

	}

	onAccept() {

	}

	render() {

		const {content} = this.props;

		return (
			<div>
				<ModalTabContents content={content}/>
			</div>
		);
	}

}

AcceptLorModal.propTypes = {
	content: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(AcceptLorModal);