import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import Warning from '../../layout/Warning'
import SearchBar from '../SearchBar'
import 'react-dates/initialize'
import {DateRangePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'

class StudentHomeFeedTable extends Component {
  constructor () {
    super();
    this.state = {
      patient: '',
      errors: {},
      modalIsOpen: false,
      uploadModal: false,
      category: { value: 'all', label: 'Choose book Category to filter' },
      campusCode: { value: 'all', label: 'Choose Campus' },
      currentPage: 1,
      todosPerPage: 25,
      startDate:   moment().subtract(2, "year"),
      endDate: moment(),
      focusedInput: null,
      dateFilter: false,
      filter: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeFlushModal = this.closeFlushModal.bind(this);
    this.openNextModal = this.openNextModal.bind(this);
    this.onDiscard = this.onDiscard.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.codeSelect = this.codeSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.filterDate = this.filterDate.bind(this)
  }

  componentDidMount () {
  if(this.props.auth.isAuthenticated) {
      this.props.getAllBooks(this.props.match.params.id);
      this.setState({category:{label: this.props.match.params.id, value: this.props.match.params.id}})
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  filterDate() {
    this.setState({dateFilter: true})
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  openNextModal () {
    this.setState({ uploadModal: true });
    const userData = {
      patient: this.state.patient
    };
    this.props.continueToUpload(userData)
  }


  afterOpenModal () {

  }

  onDiscard () {
    this.setState({ modalIsOpen: false, patient: '' });
    const mid = {
      mid: this.props.home.mid.mid
    };
    this.props.deleteResidual(mid)
  }

  closeFlushModal () {
    this.setState({ modalIsOpen: false, patient: '' })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectType (e) {
    this.setState({category: e})
  }
  codeSelect(e) {
    this.setState({campusCode: e})
  }

  isOutsideRange = () => false;

  render () {
    function sort_by_key(array, key)
    {
      return array.sort(function(a, b)
      {
        let x = a[key].toUpperCase(); let y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
      const {loading, land} = this.props.auth;
      const {  currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const pageNumbers = [];
      let allFoldersContent, heading, renderpn;
      if (loading || land===null) {
        allFoldersContent = (<Spinner/>)
      } else {
        if(land.all.length===0) {
          allFoldersContent = (
            <h5>Nothing is uploaded yet, please check back later</h5>
          );
          heading=null
        }else {
          // allFoldersContent = (
          heading = null;

          if(this.state.category===null || this.state.category.value==='all') {
            let newFolders;
            if(this.state.dateFilter) {
              land.all.map(folder =>
                console.log({1:moment(this.state.startDate).isBefore(folder.uploadAt),
                2: moment(this.state.endDate).isAfter(folder.uploadAt),3: folder.uploadAt}));
              newFolders = land.all.filter(folder => moment(this.state.startDate).isBefore(folder.uploadAt) &&
              moment(this.state.endDate).isAfter(folder.uploadAt))
            }else {
              newFolders = land.all
            }
            const currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(land => (
              // <ProductCard folder={land} key={land._id}/>
                <h1>g</h1>
            )));
            for (let i = 1; i <= Math.ceil(newFolders.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            const renderPageNumbers = (
              pageNumbers.map(number => {
                return (
                  <button className='page-item page-link'
                          key={number}
                          id={number}
                          onClick={this.handleClick}
                  >
                    {number}
                  </button>
                );
              }));
            allFoldersContent=render;
            renderpn = (
              <nav aria-label="...">
                <ul className="pagination pagination-sm">
                  {renderPageNumbers}
                </ul>
              </nav>

            )

          } else {

            let newFolders = land.all.filter(folder => folder.category === this.state.category.value.toString());
            if(this.state.dateFilter) {
              newFolders = newFolders.filter(folder => moment(this.state.startDate).isBefore(folder.uploadAt) &&
                moment(this.state.endDate).isAfter(folder.uploadAt))
            }
            let currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
            // const sortByKey = (array, key) => array.sort(function (a, b) {
            //   let x = a[key];
            //   let y = b[key];
            //   // (x < y) ? -1 : ((x > y) ? 1 : 0)
            //   return (x<y);
            // })
            currentFolder = sort_by_key(currentFolder, 'title');
            const render = (  currentFolder.map(land => (
              // <ProductCard folder={land} key={land._id}/>
                <h1>g</h1>
            )));
            for (let i = 1; i <= Math.ceil(newFolders.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
              return (
                <button className='page-item page-link'
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                >
                  {number}
                </button>
              );
            });
            allFoldersContent=render;
            renderpn = (
              <nav aria-label="...">
                <ul className="pagination pagination-sm">
                  {renderPageNumbers}
                </ul>
              </nav>

            )
          }
        }
      }
      return (
        <div className='container-fluid' style={{minWidth:'100%', padding: '0px'}}>
          <div className="displayFolder " >
            <div className="App-content row d-flex justify-content-between" >
              {!this.props.auth.user.verified && this.props.auth.user.role==='world'? <Warning/>: null}
              <nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{ background:'#ffa726',
                width:'100%', height:'50px'}}>
                {heading}
                <div className='row col-md-7 d-flex align-items-center'>
                    <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="startDate" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      isOutsideRange={this.isOutsideRange}
                      endDateId="endDate" // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) => {
                        console.log({ startDate:this.state.startDate,endDate: this.state.endDate,
                          fIn: this.state.focusedInput});
                        this.setState({ startDate, endDate })
                      }} // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                    <button type="submit" onClick={this.filterDate} className="input-group-text cyan lighten-2">
                      Apply Date filter
                    </button>
                </div>
                <SearchBar/>
              </nav>
              <div className="App-content row d-flex justify-content-center">
              <h1 className="grid--cell fl1 fs-headline1 text-center" style={{
                color: 'black'
              }}>Applied Letter of Recommendation</h1>
               </div>
              <table className="table table-bordered  mb-0">
                <thead>
                <tr>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Category</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1', minWidth:'200px'}}>Book Title</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Tracks</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Language</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Author</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Grade</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>View</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rating</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>
                </tr>
                </thead>
                <tbody>
                {allFoldersContent}
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-end'>
              {renderpn}
            </div>
          </div>
        </div>
      );
    }
}

StudentHomeFeedTable.propTypes = {
  home: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
});
export default connect(mapStateToProps)(StudentHomeFeedTable)
