import React, { Component } from 'react';
import SearchPage from './SearchPage';
import './App.css';

function Search(props) {
  return (
    <div>
          <input
        className="searchBar"
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
        placeholder="Entrez votre recherche"
      />
      &emsp;
      {props.nbItem}

    </div>
  );
}

function NavigationBar(props) {
  return (
    <div className="buttonContainer">
    <button onClick={props.firstPage} className="previous">&#8249;&#8249;</button>
    <button onClick={props.previousPage} className="previous">&#8249;</button>
        {props.currentPage}
    <button onClick={props.nextPage} className="next">&#8250;</button>
    <button onClick={props.lastPage} className="next">&#8250;&#8250;</button>
    </div>
  )
}



function PageNumber(props) {
  return
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      myInputValue : "",
      cards: [],
      currentPage: 1,
      itemCount: 0,
      nbPage: 0,
      pokemonName: ""
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search value={this.state.pokemonName} onChange={this.handleNameChange} nbItem={this.state.itemCount}/>
        </header>

          <NavigationBar
          currentPage={this.state.currentPage}
          firstPage={this.firstPage.bind(this)}
          previousPage={this.previousPage.bind(this)}
          nextPage={this.nextPage.bind(this)}
          lastPage={this.lastPage.bind(this)}
          />



          <SearchPage cards={this.state.cards} />

          <NavigationBar
            currentPage={this.state.currentPage}
            firstPage={this.firstPage.bind(this)}
            previousPage={this.previousPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            lastPage={this.lastPage.bind(this)}
          />

            <br/>
      </div>
    );
  }

  onSearch = (event) => {
    this.setState({myInputValue : event.target.value})

    // Méthode pour filtrer en fonction du nom du pokémon
  }

  handleNameChange = pokemonName => {
    this.setState({ pokemonName });
  };

  firstPage = () => {
    this.fetchData(1)
  }


  lastPage = () => {
    this.fetchData(this.state.nbPage)
  }

  nextPage = () => {
    let currentPage = this.state.currentPage
    if(currentPage < this.state.nbPage) {
      currentPage++
      this.fetchData(currentPage)
    }
  }

  previousPage = () => {
    let currentPage = this.state.currentPage
    if(currentPage > 1) {
      currentPage--
      this.fetchData(currentPage)
    }
  }

  fetchData = (currentPage) => {
    let request = new Request(`https://api.pokemontcg.io/v1/cards?page=${currentPage}&pageSize=32&name=${this.state.pokemonName}`);

    fetch(request, )
    .then(results => {
      const itemCount = results.headers.get("Total-Count")
      const totalPage = Math.trunc(itemCount/results.headers.get("Page-Size")) + 1
      this.setState({nbPage:totalPage, itemCount:itemCount})
      return results.json()
    }).then(data => {
      this.setState({cards:data.cards})
    })
    this.setState({currentPage})

  }

  // Fetch de l'api
  componentDidMount() {
    this.fetchData(1)
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.pokemonName !== this.state.pokemonName) {
      this.fetchData(1);
    }
  }
}

export default App;
