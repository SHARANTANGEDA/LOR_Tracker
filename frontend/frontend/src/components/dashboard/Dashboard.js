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
import {studentHome} from "../../actions/homeActions";

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
      this.props.studentHome(this.props.match.params.id)
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
    console.log({role: userRole});
    if(userRole==='student') {
      const { loading, studentHome } = this.props.home;
      let homeContent;
      if (loading || studentHome===null) {
        homeContent = <Spinner/>;
        console.log({Here:homeContent,hello:'True'})
      } else {
        homeContent = studentHome;
        console.log({Here:homeContent,hello:'True'})
      }
      return (
        <div className="display ">
          <div className='App-content row d-flex justify-content-center'>
            <nav className='navbar navbar-expand-sm  col-md-12' style={{background:'#ffa726', width:'100%'}}>
              <SearchBar/>
            </nav>
          </div>

          <div className="App-content row d-flex justify-content-center">
              <h1 className="grid--cell fl1 fs-headline1 text-center" style={{
                color: 'black'
              }}>Welcome {this.props.auth.user.first_name} {this.props.auth.user.last_name}</h1>
          </div>

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
  studentHome: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
});
export default connect(mapStateToProps,{studentHome})(Dashboard)
