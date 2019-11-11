import React, {Component} from 'react'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {PropTypes} from 'prop-types'
import {tokenHeader} from "../../utils/headers";

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      spinner: false,
      error: null,
      image: null,
      loading: true,
      progress:  0,
      status: true,
			imageContentType: null
    };
    this.changeHandler = this.changeHandler.bind(this)
  }
  // componentDidMount() {
  //    axios.get(`api/student/getProfilePicture`,tokenHeader()).then(res => {
  //               console.log(res.data);
  //               this.setState({image: res.data});
  //           })
  //           .catch(err =>{
  //             console.log(err);
  //           });
  // }
componentDidMount(){
    let imageData=null
    axios.get(`api/student/getProfilePhoto`,tokenHeader())
    .then((response) => {
      console.log(response.data, response);
      imageData= response.data;
      if(imageData.status===false) {
        this.setState({status: false})
      }
      this.setState( {image:imageData})
    })
}
  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  fileChanged(event) {
    this.setState({ file: event.target.files[0] });
  }
  myUploadProgress = () => (progress) => {
    let percentage = Math.floor((progress.loaded * 100) / progress.total)
    console.log({progress:progress.loaded});
    this.setState({progress:percentage})
  }
  uploadFile(event) {
    event.preventDefault();
    let data = new FormData();
    this.setState({spinner: true});
    // data.append(fileName, this.state.file);
    let file_extension = this.state.file.name.substring(this.state.file.name.lastIndexOf('.'), this.state.file.name.length);
    let fileName = this.props.email.substring(0, this.props.email.indexOf('@'))+ file_extension;
    data.append('picture', this.state.file, fileName);
    let headers = {headers: {
    Authorization: tokenHeader().headers.Authorization,
  },onUploadProgress: this.myUploadProgress()};
    axios.post(`api/student/uploadPicture`,data,  headers).then(res => {
        this.setState({spinner: false});
        if (res.data) {
          this.setState({progress:100});
          alert('success!!');
          window.location.reload();
        } else {
          alert('Upload failed');
        }
    }).catch(err => {
      console.log(err)
    })
  }


  render() {

      let spin = (
        <div>
          <ProgressBar striped variant="info" now={this.state.progress} label={`${this.state.progress}%`}/>
          <p style={{ color: 'white', background: 'green' }} className='btn w-100'>
            Uploading</p>
        </div>
      );
      let uploadBtn=null, imageContent=null;
      if(this.state.status) {
        uploadBtn = (
          <button className='btn btn-success ' style={{background: 'blue'}}
                onClick={this.uploadFile.bind(this)}>Update</button>
        )
					imageContent = (
           <img src={`data:;base64,${this.state.image}`}
								height='150px' width='150px' alt={require('../../img/landingIcons/student.png')}
                   style={{maxHeight:'250px', width:'225px'}}/>
        )
      } else {
        uploadBtn = (
          <button className='btn btn-success ' style={{background: 'blue'}}
                onClick={this.uploadFile.bind(this)}>Upload</button>
        )
        imageContent = (
           <img src={localStorage.getItem('google_avatar_url')}  height='150px' width='150px' alt=''
                   style={{maxHeight:'250px', width:'225px', borderRadius:'50%'}}/>
        )
      }
      let info=null;
      if(this.state.error!==null) {
        info = (
          <div>
            <p style={{ color: 'red', fontStyle: 'italic'}} className='w-100'>
              {this.state.error}</p>
          </div>
        )
      }
      return (
          <div className="row d-flex justify-content-center" style={{margin:'2px'}}>
            <div className='col-md-12 ' style={{
								borderRadius: '5px', borderColor: 'black', borderStyle: 'solid',
								padding: '0px'
							}}>
            <div className="grid text-center col-md-12">
              <button onClick={this.toggleProfile}
														className="rounded border
                                                d-flex justify-content-between align-items-center
                                                flex-grow-1 pl-1 w-100 my-3"
														style={{
															boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
																'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
															fontSize: '25px', background: '#000d69', color: 'white'
														}}>
											Profile Picture</button>
              <p className="row text-center d-flex justify-content-center" style={{
                color: 'black', fontStyle:'italic'
              }}>Profile Picture helps faculty recognize you faster</p>
              {imageContent}
              {info}
            </div>
            <div className="row col-md-12 d-flex justify-content-center" style={{width: '100%', margin:'5px'}}>
              <div className='row '>
                <input type="file" id='picture' onChange={this.fileChanged.bind(this)} required name='file'
                       accept="image/png, image/jpeg, image/jpg"
                       style={{border: '1.5px', borderStyle: 'solid',
                         borderRadius:'5px', margin: '5px'}}/>
                         {!this.state.spinner ? uploadBtn : null}
              </div>
            </div>
            <div className="row col-md-12 d-flex justify-content-center" style={{width: '100%', margin:'5px'}}>
            {this.state.spinner ? spin : null}
            </div>
            </div>
          </div>
      );
    }
}

UploadFiles.propTypes = {
  user: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired
};


export default UploadFiles;