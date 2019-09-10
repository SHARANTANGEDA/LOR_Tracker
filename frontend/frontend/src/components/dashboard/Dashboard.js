import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Select from 'react-select'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import SearchBar from "./SearchBar";

class Dashboard extends Component {
  constructor () {
    super();
    this.state = {
      modalIsOpen: false,
      uploadModal: false,
      currentPage: 1,
      todosPerPage: 25,
      errors:{}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    if (this.props.auth.user.role === 'admin') {
    }else if(this.props.auth.user.role === 'student') {

    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectType (e) {
    this.setState({category: e})
  }

  render () {
    let userRole=this.props.auth.user.role;
    if(userRole==='student') {
      const { loading, studentHome } = this.props.home;
      let getFacultyList;
      if (loading || studentHome===null) {
        getFacultyList = <Spinner/>
      } else {

      }
      return (
        <div className="display ">
          <div className='App-content row d-flex justify-content-center'>
            <nav className='navbar navbar-expand-sm  col-md-12' style={{background:'#ffa726', width:'100%'}}>
              {/*<div className='row col-md-8 d-flex justify-content-start'>*/}
              {/*  <div className='col-md-4'>*/}
              {/*    <Select options={[{ value: 'all', label: 'All' },{value:'today', label: 'today'},*/}
              {/*      {value:'yesterday', label: 'yesterday'},*/}
              {/*      {value: 'lastweek', label: 'Last Week'}, {value: 'lastMonth', label: 'Last Month'},*/}
              {/*      {value: 'earlier', label: 'earlier'}]} className={classnames('isSearchable',*/}
              {/*      { 'is-invalid': errors.category })}*/}
              {/*            placeholder="Category"*/}
              {/*            name="category" value={category} onChange={this.onSelectType}>*/}
              {/*    </Select>*/}
              {/*  </div>*/}
              {/*  <button onClick={this.onConfirmSelect} className="input-group-text cyan lighten-2">*/}
              {/*    <i className="fas fa-search text-grey" aria-hidden="true"/>*/}
              {/*  </button>*/}
              {/*  <div className='col-md-4'>*/}
              {/*    <Select*/}
              {/*      options={[{ value: 'all', label: 'All' },{ value: 'karmn', label: 'KAR' },*/}
              {/*        { value: 'kvcmn', label: 'KVC' }, { value: 'gmrmn', label: 'GMRV' }, { value: 'blvmn', label: 'MTC' }]}*/}
              {/*      className={classnames('isSearchable', { 'is-invalid': errors.campusCode })}*/}
              {/*      placeholder="Campus Code"*/}
              {/*      name="campusCode" value={campusCode} onChange={this.codeSelect}>*/}
              {/*    </Select>*/}
              {/*  </div>*/}

              {/*</div>*/}
              <SearchBar/>
            </nav>
          </div>

          <div className="App-content row d-flex justify-content-center">
              <h1 className="grid--cell fl1 fs-headline1 text-center" style={{
                color: 'black'
              }}>Welcome {this.props.auth.user.first_name} + {' '}+{this.props.auth.user.last_name}</h1>
          </div>


            {allFoldersContent}
          </div>
      )
    }
    return (
        <div>
        </div>
    )
  }
}

Dashboard.propTypes = {
  home: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard)
