import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    };
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      });
    }
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist',
                   playlistTracks: []});
  }

  async search(searchTerm) {
    const newResults = await Spotify.search(searchTerm)
    this.setState({
      searchResults: newResults
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
