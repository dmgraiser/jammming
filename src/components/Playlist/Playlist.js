import React from 'react';
import '../Track/Track.css';
import Track from '../Track/Track.js';
import './Playlist.css';

const playlistTracks = [
  {
    track_title: "Stronger",
    artist: "Britney Spears",
    album: "Oops!... I Did It Again"
  },
  {
    track_title: "So Emotional",
    artist: "Whitney Houston",
    album: "Whitney"
  },
  {
    track_title: "It's Not Right But It's Okay",
    artist: "Whitney Houston",
    album: "My Love Is Your Love"
  },
  {
    track_title: "Ironic",
    artist: "Alanis Morrisette",
    album: "Jagged Little Pill"
  }
];

class Playlist extends React.Component {
  render() {
    return (
      <div class="Playlist">
        <input value='New Playlist' />
        <div class="TrackList">
          {
            playlistTracks.map(function(track) {
              return <Track track={track}/>
            })
          }
        </div>
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  };
}

export default Playlist;
