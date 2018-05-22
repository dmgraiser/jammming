import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults: [
        {
          name: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          id: 1
        },
        {
          name: "Tiny Dancer",
          artist: "Tim McGraw",
          album: "Love Story",
          id: 2
        },
        {
          name: "Tiny Dancer",
          artist: "Rockabye Baby!",
          album: "Lullaby Renditions of Elton John",
          id: 3
        },
        {
          name: "Tiny Dancer",
          artist: "The White Raven",
          album: "Tiny Dancer",
          id: 4
        },
        {
          name: "Tiny Dancer",
          artist: "Ben Folds",
          album: "Ben Folds Live",
          id: 5
        },
        {
          name: "Dammit",
          artist: "Blink 182",
          album: "Dude Ranch",
          id: 6
        }
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        {
          name: "Stronger",
          artist: "Britney Spears",
          album: "Oops!... I Did It Again",
          id: 7
        },
        {
          name: "So Emotional",
          artist: "Whitney Houston",
          album: "Whitney",
          id: 8
        },
        {
          name: "It's Not Right But It's Okay",
          artist: "Whitney Houston",
          album: "My Love Is Your Love",
          id: 9
        },
        {
          name: "Ironic",
          artist: "Alanis Morrisette",
          album: "Jagged Little Pill",
          id: 10
        }
      ]
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
