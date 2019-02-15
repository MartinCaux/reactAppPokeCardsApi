import React, { Component } from 'react';
import SearchPage from './SearchPage';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state={
        myInputValue : "",
        cards: []
    
      }
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" value={this.state.myInputValue} placeholder="Entrez votre recherche" onChange={this.onSearch}  /> 
        </header>
        <div className="listContainer" >
          <SearchPage
              cards={this.state.cards} />
        </div>
      </div>
    );
  }

  onSearch = (event) => {
    this.setState({myInputValue : event.target.value})

    // Méthode pour filtrer en fonction du nom du pokémon
  }

  // Fetch de l'api
  componentDidMount() {
    fetch('https://api.pokemontcg.io/v1/cards', )
    .then(results => {
      return results.json()
    }).then(data => {
      this.setState({cards:data})
    })
  }
}

export default App;
