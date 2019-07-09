import React from 'react'

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {loading ? (
      <img
        src={require('./images/loader.svg')}
        className="block mx-auto"
        alt="Loader"
      />
    ) : (
      hintText
    )}
  </div>
)
