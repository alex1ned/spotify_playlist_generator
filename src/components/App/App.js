import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';


// ---------------- Delete later (this is the searchResults Tracklist hardplugged)
const result1 = {
  name: 'Name1',
  artist: 'Artist1',
  album: 'Album1',
  id: 1
};

const result2 = {
  name: 'Name2',
  artist: 'Artist2',
  album: 'Album2',
  id: 2
};

const result3 = {
  name: 'Name3',
  artist: 'Artist3',
  album: 'Album3',
  id: 3
};

const result4 = {
  name: 'Name4',
  artist: 'Artist4',
  album: 'Album4',
  id: 4
};

const result5 = {
  name: 'Name5',
  artist: 'Artist5',
  album: 'Album5',
  id: 5
};

const result6 = {
  name: 'Name6',
  artist: 'Artist6',
  album: 'Album6',
  id: 6
};

const arrayResults = [result1, result2, result3];
const arrayList = [result4, result5, result6];
// ---------------- Delete later


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: arrayResults,
      playlistName: 'A Name',
      playlistTracks: arrayList
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  //Remember find function (very useful)
  addTrack(track) {
    //IF the track we select is already in the PlayList, break out of function
    let currentPlaylist = this.state.playlistTracks;
    if (currentPlaylist.find(savedTrack => savedTrack.id === track.id))
    {
      return;
    }
    else {
      currentPlaylist.push(track);
      this.setState({playlistTracks: currentPlaylist});
    }
  }

  removeTrack(track) {
    let currentPlaylist = this.state.playlistTracks;

    currentPlaylist = currentPlaylist.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: currentPlaylist});
  }

  render()
  {
    return (
      <div>
        <h1>Create <span className="highlight"> SPOTIFY </span> Playlists</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            {/* Render a SearchResults component */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            {/* Render a PlayList component */}
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />

          </div>
        </div>
      </div>
    );
  }
};

export default App;
