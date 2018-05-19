import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults.js';
import Playlist from './components/Playlist/Playlist.js'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <div class="SearchBar">
            <input placeholder="Enter A Song Title" />
            <a>SEARCH</a>
          </div>
          <div class="App-playlist">
            <SearchResults />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
