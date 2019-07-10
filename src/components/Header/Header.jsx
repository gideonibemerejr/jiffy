import React from 'react'
import clearButton from '../../images/close-icon.svg'

const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {/* if we have results, show the clear button, otherwise show the title */}
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} alt="" />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
  </div>
)
export default Header
