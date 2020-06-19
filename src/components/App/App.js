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

const arrayResults = [result1, result2, result3];
// ---------------- Delete later


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: arrayResults
    };
  }

  render()
  {
    return (
      <div>
        <h1>Create <span className="highlight"> SPOTIFY </span> Playlists</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList searchResults={this.state.searchResults} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
