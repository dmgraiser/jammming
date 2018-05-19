import React from 'react';
import '../Track/Track.css';
import Track from '../Track/Track.js';
import './SearchResults.css';

const searchResultsTracks = [
  {
    track_title: "Tiny Dancer",
    artist: "Elton John",
    album: "Madman Across The Water"
  },
  {
    track_title: "Tiny Dancer",
    artist: "Tim McGraw",
    album: "Love Story"
  },
  {
    track_title: "Tiny Dancer",
    artist: "Rockabye Baby!",
    album: "Lullaby Renditions of Elton John"
  },
  {
    track_title: "Tiny Dancer",
    artist: "The White Raven",
    album: "Tiny Dancer"
  },
  {
    track_title: "Tiny Dancer",
    artist: "Ben Folds",
    album: "Ben Folds Live"
  },
  {
    track_title: "Dammit",
    artist: "Blink 182",
    album: "Dude Ranch"
  }
];

class SearchResults extends React.Component {
  render() {
    return (
      <div class="SearchResults">
        <h2>Results</h2>
        <div class="TrackList">
          {
            searchResultsTracks.map(function(track) {
              return <Track track={track}/>
            })
          }
        </div>
      </div>
    )
  };
}

export default SearchResults;
