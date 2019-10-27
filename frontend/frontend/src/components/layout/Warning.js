import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EnterPin from './EnterPin'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0',

    transform: 'translate(-50%, -50%)'
  }
}

class Warning extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }





  openModal () {
    this.setState({ modalIsOpen: true })
  }
  afterOpenModal () {

  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }



  render () {
    const { isAuthenticated, user } = this.props.auth
    let requestConfirmation = (
      <div className='row col-md-12 d-flex justify-content-between' >
        <p style={{color: 'white', margin: '5px'}}>Please confirm  your email address, If you didn't receive a Confirmation OTP click Send Again</p>
        <div className='d-flex justify-content-end' style={{margin: '5px'}}>
          <button onClick={this.openModal} className='btn btn-sm'
                  style={{ color: 'white', borderStyle: 'solid', borderRadius: '5px', borderColor:'white'}}>Confirm Now</button>

        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="OTP confirmation"
          shouldCloseOnOverlayClick={false}
          modalOptions={{ dismissible: false }}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
        >{<div className='d-flex justify-content-center'>
          <EnterPin/>
          <div>
            <button onClick={this.closeModal} className='btn btn-sm' style={{color:'white', background:'red'}}>
              <i className="fas fa-times"/></button>
          </div>
        </div>}</Modal>
      </div>
    )
    return (
      <nav className="navbar navbar-expand-sm  col-md-12 " style={{ background:'#ff5170', width:'100%', height:'40px'}}>
        <div className="row container-fluid d-flex justify-content-between col-md-12">
          <div className='row  d-flex justify-content-between col-md-12' >
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="row d-flex justify-content-between col-md-12" id="mobile-nav">
              {isAuthenticated && !user.verified ? requestConfirmation: null}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Warning.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps,  )(Warning)
