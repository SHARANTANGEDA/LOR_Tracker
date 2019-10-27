import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from 'classnames'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      category: { value: 'title', label: 'Title' },
      errors: {},
      search: ''
    }
    this.onCatChange = this.onCatChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const newSearch = {
      category: this.state.category.value,
      search: this.state.search,
    }
    // console.log({search:newSearch})
    window.location.href=`/search/${newSearch.category}/${newSearch.search}`
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    // console.log({ [e.target.name]: e.target.value })

  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onCatChange (e) {
    this.setState({ category: e })
    console.log({value: this.state.category.value })

  }



  render () {
    const { category, errors } = this.state
    const options =[
      { value: 'title', label: 'Title' },
      {value:'author',label:'Author/Publication'}
    ]
    return (
        <div className="row container-fluid d-flex justify-content-between col-md-6">
          <div className=" input-group md-form form-sm form-2 pl-0" style={{ width: '500px', maxWidth: '700px' }}>
            <div style={{ minWidth: '100px' }}>
              <Select options={options}
                      className={classnames('isSearchable',
                        { 'is-invalid': errors.category })}
                      placeholder="Category"
                      name="category" value={category} onChange={this.onCatChange}>
              </Select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
            <input type="text"
                   className={classnames('form-control my-0 py-1 lime-border', { 'is-invalid': errors.search })}
                   placeholder="Search"
                   name="search"
                   value={this.state.search} onChange={this.onChange}/>
            {errors.search && (<div className="invalid-feedback">{errors.search}</div>
            )}
            <div className="input-group-append">
              <button type="submit" onClick={this.onSubmit} className="input-group-text cyan lighten-2">
                <i className="fas fa-search text-grey" aria-hidden="true"/>Search
              </button>
            </div>
          </div>
        </div>
    )
  }
}

SearchBar.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

export default connect(mapStateToProps)(SearchBar)
