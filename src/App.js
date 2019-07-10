import React, { Component } from 'react'
import Header from './components/Header/Header'
import Gif from './components/Gif/Gif'
import './App.css'

import loader from './images/loader.svg'

/****************************
 * Components
 *****************************/
const randomChoice = arr => {
  const randomIdx = Math.floor(Math.random() * arr.length)
  return arr[randomIdx]
}
const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {loading ? (
      <img src={loader} className="block mx-auto" alt="Loader" />
    ) : (
      hintText
    )}
  </div>
)
/****************************
 * App
 *****************************/
class App extends Component {
  state = {
    gifs: [],
    searchTerm: '',
    hintText: '',
    loading: false
  }
  // TODO: Make API call from Giphy
  searchGiphy = async searchTerm => {
    this.setState({
      // set the loading state to be true
      // and this will show the spinner at the bottom
      loading: true
    })
    try {
      const API_KEY = process.env.REACT_APP_API_KEY
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
      const response = await fetch(url)
      const { data } = await response.json()

      if (!data.length) {
        throw new Error(`Nothing found for ${searchTerm}`)
      }
      const randomGif = randomChoice(data)

      console.log({ randomGif })
      console.log({ data })

      this.setState((prevState, props) => ({
        ...prevState,
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }))
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }))
    }
  }

  handleChange = event => {
    const { value } = event.target
    // run set state with the previous state and props
    this.setState((prevState, props) => ({
      // spread out all the previous state
      ...prevState,
      // overwrite the searchTerm with whatever is in the input
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

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }))
    // here we grab the input and then focus the cursor back into it
    this.textInput.focus()
  }

  render() {
    const hasResults = this.state.gifs.length
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <div className="search grid">
          {/* our stack of gif images */}

          {/* here we loop over our array of gif images from our state
          and we create multiple videos from it */}

          {this.state.gifs.map((gif, i) => (
            // we spread out all of our properties onto our Gif component
            <Gif key={i} {...gif} />
          ))}

          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.searchTerm}
            ref={input => {
              this.textInput = input
            }}
          />
        </div>
        <UserHint {...this.state} />
      </div>
    )
  }
}

export default App
