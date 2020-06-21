import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

import Spotify from '../../util/Spotify';

// ---------------- Delete later (this is the searchResults Tracklist hardplugged)
// const result1 = {
//   name: 'Name1',
//   artist: 'Artist1',
//   album: 'Album1',
//   id: 1
// };
//
// const result2 = {
//   name: 'Name2',
//   artist: 'Artist2',
//   album: 'Album2',
//   id: 2
// };
//
// const result3 = {
//   name: 'Name3',
//   artist: 'Artist3',
//   album: 'Album3',
//   id: 3
// };
//
// const result4 = {
//   name: 'Name4',
//   artist: 'Artist4',
//   album: 'Album4',
//   id: 4
// };
//
// const result5 = {
//   name: 'Name5',
//   artist: 'Artist5',
//   album: 'Album5',
//   id: 5
// };
//
// const result6 = {
//   name: 'Name6',
//   artist: 'Artist6',
//   album: 'Album6',
//   id: 6
// };
//
// const arrayResults = [result1, result2, result3];
// const arrayList = [result4, result5, result6];
// ---------------- Delete later


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'A Name',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  updatePlaylistName(name)
  {
    this.setState({playlistName: name});
  }

  //Important caveat here (given that we receive a promis we then
  //need to update the state based on the promise once it was resolved)
  savePlaylist()
  {
    //Create new array using map that extracts the uri for each
    //track in the playlistTracks array
    const trackUris = this.state.playlistTracks.map(track => {
      return track.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, trackUris)
    .then( () => {
      this.setState(
        {
          playlistTracks: [],
          playlistName: 'New Playlist'
        })
    });
  }

  //Important caveat here (given that we receive a promis we then
  //need to update the state based on the promise once it was resolved)
  search(term)
  {
    Spotify.search(term)
    .then( (searchResults) => {
      this.setState({searchResults: searchResults})
    });
  }

  render()
  {
    return (
      <div>
        <h1>Create <span className="highlight"> SPOTIFY </span> Playlists</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />

          </div>
        </div>
      </div>
    );
  }
};

export default App;
