import React from 'react'

const Search = props => {
  return (
    <div className="search grid">
      <input
        className="input grid-item"
        placeholder="Type something"
        onChange={props.handleChange}
        onKeyPress={props.handleKeyPress}
        value={this.state.searchTerm}
      />
    </div>
  )
}

export default Search
