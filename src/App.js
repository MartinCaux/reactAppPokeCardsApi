import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchPage from './SearchPage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {  
    return (
      <div className="App">
        <SearchBar />
        <header className="App-header">
          <SearchPage />
        </header>
      </div>
    );
  }
}


export default App;
