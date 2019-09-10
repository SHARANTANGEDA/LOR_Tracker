import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
// import FolderRow from '../display/Folders/FolderRow'

import Select from 'react-select'
import Spinner from '../common/Spinner'
import SearchBar from './SearchBar'

class SearchResults extends Component {
  constructor () {
    super()
    this.state = {
      category: { value: 'all', label: 'Choose book Category to filter' },
      currentPage: 1,
      todosPerPage: 25,
    };
    this.handleClick = this.handleClick.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
  }

  componentDidMount () {
    // console.log({ category: this.props.match.params.category, search: this.props.match.params.search })
    this.props.getSearchResults({ category: this.props.match.params.category, search: this.props.match.params.search })
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  onSelectType (e) {
    this.setState({category: e})
  }
  render () {
    function sort_by_key (array, key) {
      return array.sort(function (a, b) {
        let x = a[key].toUpperCase()
        let y = b[key].toUpperCase()
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    }

    let categoryArray = [{ value: 'School (I – V)', label: 'School (I – V)' },
      { value: 'School (VI – X)', label: 'School (VI – X)' },
      { value: 'Intermediate (XI & XII)', label: 'Intermediate (XI & XII)' },
      { value: 'Undergraduate', label: 'Undergraduate' },
      { value: 'Postgraduate', label: 'Postgraduate' },
      { value: 'Law', label: 'Law' },
      { value: 'Psychology', label: 'Psychology' },
      { value: 'Competitive Exam', label: 'Competitive Exam' },
      { value: 'English Grammar', label: 'English Grammar' },
      { value: 'Children Stories', label: 'Children Stories' },
      { value: 'Religious', label: 'Religious' },
      { value: 'Other', label: 'Other' }]

    const { results, loading } = this.props.search
    let allFoldersContent, noContent = null, heading = null, spinner = null, renderpn=null
    if (loading || results === null) {
      allFoldersContent = null
      spinner=(<Spinner/>)
    } else {
      if (!results.success || results.results.length === 0) {
        // console.log({res:results})
        // window.location.href = '/detailsNotFound'
      } else {
        // console.log({res:results})

        const { currentPage, todosPerPage } = this.state
        const indexOfLastTodo = currentPage * todosPerPage
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage
        const pageNumbers = []
        heading = null
        if (this.state.category === null || this.state.category.value === 'all') {
          const currentFolder = results.results.slice(indexOfFirstTodo, indexOfLastTodo)
          // const render = (currentFolder.map(land => (
          // {/*  <TableItem folder={land} key={land._id}/>*/}
          // {/*  //<ProductCard folder={land} key={land._id}/>*/}
          // {/*)))*/}
          for (let i = 1; i <= Math.ceil(results.results.length / todosPerPage); i++) {
            pageNumbers.push(i)
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
              )
            }))
          // allFoldersContent = render
          renderpn = (
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {renderPageNumbers}
              </ul>
            </nav>

          )

        } else {
          let newFolders = results.results.filter(folder => folder.category === this.state.category.value.toString())
          let currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo)
          // const sortByKey = (array, key) => array.sort(function (a, b) {
          //   let x = a[key];
          //   let y = b[key];
          //   // (x < y) ? -1 : ((x > y) ? 1 : 0)
          //   return (x<y);
          // })
          // console.log(currentFolder)
          currentFolder = sort_by_key(currentFolder, 'title')
          // const render = (currentFolder.map(folder => (
          //   <TableItem folder={folder} key={folder._id}/>
          // )))
          for (let i = 1; i <= Math.ceil(newFolders.length / todosPerPage); i++) {
            pageNumbers.push(i)
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
            )
          })
          // allFoldersContent = render
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
      <div className='container-fluid' style={{ minWidth: '100%', padding: '0px' }}>
        <div className="displayFolders ">
          <div className=" row d-flex justify-content-start">
            <nav className='navbar navbar-expand-sm justify-content-between col-md-12'
                 style={{ background: '#ffa726', width: '100%', height: '40px' }}>
              {heading}
              <div className='col-md-4'>
                <Select
                  options={categoryArray}
                  className='isSearchable' placeholder="Select a book category to filter"
                  name="category" value={this.state.category} onChange={this.onSelectType}>
                </Select>
              </div>
              <SearchBar/>
            </nav>
            <table className="table table-bordered  mb-0">
              <thead>
              <tr>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Category</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Book Title</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Number of Tracks</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Language</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Author</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Grade</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>View</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Rate</th>
                <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Share</th>
              </tr>
              </thead>
              <tbody>
              {allFoldersContent}
              </tbody>
            </table>
            {noContent}
            {spinner}
          </div>
          <div className='d-flex justify-content-end'>
            {renderpn}
          </div>
        </div>
      </div>
    )
  }
}

SearchResults.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  getSearchResults: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})
export default connect(mapStateToProps)(SearchResults)
