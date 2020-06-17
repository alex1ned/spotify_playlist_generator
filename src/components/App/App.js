import React from 'react';
import './App.css';

// Import components
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';


// ---------------- Delete later
// const result1 = {
//   name: 'Name',
//   artist: 'Artist',
//   album: 'Album',
//   id: 1
// };
//
// const result2 = {
//   name: 'Name',
//   artist: 'Artist',
//   album: 'Album',
//   id: 2
// };
//
// const result3 = {
//   name: 'Name',
//   artist: 'Artist',
//   album: 'Album',
//   id: 3
// };

// const arrayResults = [result1, result2, result3];
// ---------------- Delete later

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: [{name: 'Name1', artist: 'Artist1', album: 'Album1', id: 1},
                      {name: 'Name2', artist: 'Artist2', album: 'Album2', id: 2},
                      {name: 'Name3', artist: 'Artist3', album: 'Album3', id: 3}]
    };
  }

  render()
  {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
