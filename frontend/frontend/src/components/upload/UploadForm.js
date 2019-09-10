import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import TextFieldGroup from '../common/TextFieldGroup'
import Spinner from '../common/Spinner'
import UploadFiles from './UploadFiles'
import Modal from 'react-modal'
import Select from 'react-select'

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

class UploadForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      language: null,
      grade: '',
      organization: '',
      modalIsOpen: false,
      uploadModal: false,
      category: null,
      discard: false,
      errors: {}
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeFlushModal = this.closeFlushModal.bind(this)
    this.openNextModal = this.openNextModal.bind(this)
    this.onDiscard = this.onDiscard.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.onSelectLang = this.onSelectLang.bind(this)

  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.home.patientData!==null) {
      if(nextProps.home.patientData.mid!== null) {
        this.setState({ modalIsOpen: true })
      }
    }
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  openModal () {
    this.setState({ modalIsOpen: true, discard: false })
  }

  openNextModal () {
    this.setState({ uploadModal: true })
    const userData = {
      patient: this.state.patient
    }
    this.props.continueToUpload(userData)
  }
  onSelectType (e) {
    this.setState({category: e})
  }
  onSelectLang (e) {
    this.setState({language: e})
  }
  afterOpenModal () {

  }

  onDiscard () {
    this.setState({ modalIsOpen: false, discard: true })
    const mid = {
      mid: this.props.home.patientData.mid
    }
    this.props.deleteResidual(mid)
  }

  closeFlushModal () {
    this.setState({ modalIsOpen: false })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }


  onSubmit (e) {
    e.preventDefault()
    if(this.state.language!==null && this.state.category!==null) {
      const userData = {
        title: this.state.title,
        author: this.state.author,
        language: this.state.language.value,
        grade: this.state.grade,
        organization: this.state.organization,
        category: this.state.category.value,
      }
      this.props.getUploadModal(userData)
    }else {
      this.setState({errors:{title: 'make sure all inputs are entered'}})
    }

  }



  render () {
    const { errors } = this.state
    let showModal, categoryArray=[{value: 'School (I – V)', label: 'School (I – V)'},
      {value: 'School (VI – X)', label: 'School (VI – X)'},
      {value: 'Intermediate (XI & XII)', label: 'Intermediate (XI & XII)'},
      {value: 'Undergraduate', label: 'Undergraduate'},
      {value: 'Postgraduate', label: 'Postgraduate'},
      {value: 'Law', label: 'Law'},
      {value: 'Psychology', label: 'Psychology'},
      {value: 'Competitive Exam', label: 'Competitive Exam'},
      {value: 'English Grammar', label: 'English Grammar'},
      {value: 'Children Stories', label: 'Children Stories'},
      {value: 'Religious', label: 'Religious'},
      {value: 'Other', label: 'Other'}]
    let langArray=[{value: 'Arabic', label: 'Arabic'},
      {value: 'Bengali', label: 'Bengali'},
      {value: 'Chinese', label: 'Chinese'},
      {value: 'English', label: 'English'},
      {value: 'French', label: 'French'},
      {value: 'German', label: 'German'},
      {value: 'Hindi', label: 'Hindi'},
      {value: 'Japanese', label: 'Japanese'},
      {value: 'Kannada', label: 'Kannada'},
      {value: 'Korean', label: 'Korean'},
      {value: 'Marathi', label: 'Marathi'},
      {value: 'Portuguese', label: 'Portuguese'},
      {value: 'Russian', label: 'Russian'},
      {value: 'Spanish', label: 'Spanish'},
      {value: 'Tamil', label: 'Tamil'},
      {value: 'Telugu', label: 'Telugu'},
      {value: 'Urdu', label: 'Urdu'}]
    if (this.state.modalIsOpen) {
      const { loading2, patientData } = this.props.home
      if (loading2 || patientData === null) {
        showModal = <Spinner/>
      } else {
          showModal = (
            <div >
                <div className='row text-center'>
                  <UploadFiles bookId={this.props.home.patientData.mid}/>
                </div>
              <button onClick={this.onDiscard} className='btn btn-warning'
                      style={{ background: 'red', color: 'white' }}>discard
              </button>
            </div>
          )
        }
    }
    if(this.state.discard && !this.state.modalIsOpen){
      if(this.props.home.patientData.mid===null) {
        showModal=<Spinner/>
      }else {
        showModal = (
          <div>
            <UploadFiles bookId={this.props.home.patientData.mid}/>
            <div className='row d-flex justify-content-around'>
              <button onClick={this.onDiscard} className='btn btn-warning'
                      style={{ background: 'red', color: 'white' }}>discard
              </button>
            </div>
          </div>
        )
      }
    }
    return (
      <div className="container-fluid uploadForm d-flex justify-content-center" >
        <div className="col-md-6" style={{ width: '100%' }}>
          <h3 className='text-center' style={{
            borderStyle: 'solid', borderWidth: '2px', background: 'green',
            color: 'white', borderRadius: '2px'
          }}>Enter Book details to upload book</h3>

          <form noValidate onSubmit={this.onSubmit}>
            <div style={{ minWidth: '100px', margin: '10px' }}>
              <Select options={categoryArray}
                      className={classnames('isSearchable',
                        { 'is-invalid': errors.category })}
                      placeholder="Category"
                      name="category" value={this.state.category} onChange={this.onSelectType}>
              </Select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
            <TextFieldGroup placeholder="Enter book title" error={errors.title}
                            type="text" onChange={this.changeHandler} value={this.state.title} name="title"
            />
            <TextFieldGroup placeholder="Enter book author/publication" error={errors.author}
                            type="text" onChange={this.changeHandler} value={this.state.author} name="author"
            />
            <div style={{ minWidth: '100px', margin: '10px'  }}>
              <Select options={langArray}
                      className={classnames('isSearchable',
                        { 'is-invalid': errors.language })}
                      placeholder="Language"
                      name="category" value={this.state.language} onChange={this.onSelectLang}>
              </Select>
              {errors.language && (
                <div className="invalid-feedback">{errors.language}</div>
              )}
            </div>
            <TextFieldGroup placeholder="Preferred Grade" error={errors.grade}
                            type="text" onChange={this.changeHandler} value={this.state.grade} name="grade"
            />
            <TextFieldGroup placeholder="Organization" error={errors.organization}
                            type="text" onChange={this.changeHandler} value={this.state.organization} name="organization"
            />

            <input type="submit" className="btn btn-info btn-block mt-4"/>
          </form>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Patient Data"
          shouldCloseOnOverlayClick={false}
          modalOptions={{ dismissible: false }}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
        >{showModal}</Modal>

      </div>
    )
  }
}

UploadForm.propTypes = {
  getUploadModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  continueToUpload: PropTypes.func.isRequired,
  deleteResidual: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  home: state.home
})

export default connect(mapStateToProps)(UploadForm)
