import React, {Component} from 'react'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {PropTypes} from 'prop-types'

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      file: '',
      spinner: false,
      error: null,
      progress:  0

    }
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  fileChanged(event) {
    this.setState({ [event.target.name]: event.target.files });
  }
  myUploadProgress = () => (progress) => {
    let percentage = Math.floor((progress.loaded * 100) / progress.total)
    this.setState({progress:percentage})
  }
  uploadFile(event) {
    event.preventDefault();
    let data = new FormData()
    if(Array.from(this.state.files).length===0)
    {
      this.setState({error: 'Please choose at least one file to upload'})
      return
    }else if(Array.from(this.state.files).length>25) {
      this.setState({error: 'You can choose 25 files at maximum'})
      return
    }
    this.setState({spinner: true})
    Array.from(this.state.files).forEach((file, i) => {
      data.append("file", file, file.name);
    });
    axios.post(`/api/upload/upload/${this.props.bookId}`,data,{onUploadProgress: this.myUploadProgress()}).then(res => {
        this.setState({spinner: false})
        if (res.data.success) {
          window.location.href='/lvpBooks'
          // this.setState({picModal: true})
          // this.loadFiles();
        } else {
          alert('Upload failed');
        }
    })
  }


  render() {

      let spin = (
        <div>
          {/*<FileUpload/>*/}
          <ProgressBar striped variant="info" now={this.state.progress} label={`${this.state.progress}%`}/>
          <p style={{ color: 'white', background: 'green' }} className='btn w-100'>
            You will be notified once upload is completed</p>
        </div>
      )
      let downloadBut = (
        <button className='btn btn-success ' style={{background: 'green'}}
                onClick={this.uploadFile.bind(this)}>Upload</button>
      )
      let info;
      if(this.state.error!==null) {
        info = (
          <div>
            <p style={{ color: 'red', fontStyle: 'italic'}} className='w-100'>
              {this.state.error}</p>
          </div>
        )
      } else {
        info = (
          <p style={{ color: 'green',fontStyle: 'italic'}} className='w-100'>
            You can choose multiple Tracks at same time</p>
        )
      }
      return (
        <div className="uploadMultipleFiles" style={{minWidth: '330px', margin:'5px'}}>
          <div className="App-content row d-flex justify-content-center" >
            <div className="grid text-center col-md-12">
              <h3 className="grid--cell fl1 fs-headline1 text-center" style={{
                color: 'black'
              }}>Select the MP3 Tracks to upload</h3>
              {info}
            </div>
            <div className="col-md-12 text-center" style={{width: '100%', margin:'5px'}}>
              <div className='row col-md-12 d-flex justify-content-center'>
                <input type="file" onChange={this.fileChanged.bind(this)} required multiple name='files'
                       style={{border: '1.5px', borderStyle: 'solid',
                         borderRadius:'5px', margin: '5px',minWidth:'100%'}}/>
              </div>
              {!this.state.spinner ? downloadBut : null}
              {this.state.spinner ? spin : null}
            </div>
          </div>
        </div>
      );
    }
}

UploadFiles.propTypes = {
  bookId: PropTypes.string.isRequired,
};


export default UploadFiles;