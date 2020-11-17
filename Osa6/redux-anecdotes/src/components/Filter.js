import React from 'react'
import {connect} from 'react-redux'
import {setFilter, deleteFilter} from '../reducers/filterReducer'
const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value
    props.setFilter(filter.toLowerCase())
  }

  const handleReset = (event) => {
    props.deleteFilter()
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <p>Filter</p>
      <input type='text' onChange={handleChange} />
      <button onClick={handleReset}>Cancel</button>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter, 
  deleteFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
