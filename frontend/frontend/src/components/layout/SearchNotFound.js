import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import NotFound from '../../img/404.gif'

class SearchNotFound extends Component {


  render() {

    return (
      <div className="detailsNotFound">
        <div className="App-content row d-flex justify-content-center" >
          <div className="grid text-center col-md-12">
            <div className='row '>
              <div style={{margin: '10px'}}>
                <Link to='/dashboard' className='btn' style={{background: 'white', color: 'green'}}>
                  <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"/></Link>
              </div>
              {/*`<h2 className="grid--cell fl1 fs-headline1 text-center" style={{*/}
              {/*  color: 'black'*/}
              {/*}}> Welcome to L V Prasad Cloud</h2>`*/}
            </div>
            <div className='row'>
              <img
                src={NotFound}
                style={{ width: '500px', margin: 'auto', display: 'block' }}
                alt="Loading..."
              />
            </div>
            <Link to='/dashboard' className='btn btn-primary'>Return to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }
}

SearchNotFound.propTypes = {
  folder: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder
})
export default connect(mapStateToProps)(SearchNotFound);