import React from 'react';
import './Track.css';

export class Track extends React.Component {
  render() {
    return (
      <div class="Track">
        <div class="Track-information">
          <h3>{this.props.track.track_title}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a class="Track-action">+</a>
      </div>
    )
  };
}

export default Track;
