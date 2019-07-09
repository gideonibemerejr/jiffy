import React, { Component } from 'react'
import Header from './components/Header/Header'
import './App.css'

class App extends Component {

  state = {
    gifs: [],
    searchTerm: '',
    hintText: '',
    loading: false
  }


  // TODO: Make API call from Giphy
  handleChange = event => {
    const { value } = event.target
    // run set state with the previous state and props
    this.setState((prevState, props) => ({
      // spread out all the previous state
      ...prevState,
      // overwrite the searchTerm with whatever's in the input
      searchTerm: value,

      // if the input value is longer than 2 characters, set the hintText, otherwise just set it to be empty
      hintText: value.length > 2 ? `Hit enter to see ${value}` : ''
    }))
  }

  handleKeyPress = event => {
    const { value } = event.target
    if (event.key === 'Enter' && value.length > 2) {
      event.preventDefault()

      this.searchGiphy(value)
    }
  }
  render() {
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.searchTerm}
          />
        </div>
      </div>
    )
  }
}

export default App
