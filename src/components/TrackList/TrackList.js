import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

// within div in return you will add a map method that renders a set of Track components
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
    
      </div>
    );
  }
};

export default TrackList;

// {
//   this.props.tracks.map(track => {
//     return <Track track={track} key={track.id}/>
//   })
// }
