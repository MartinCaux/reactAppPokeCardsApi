import React, { Component } from 'react';
import SearchPage from './SearchPage';
import './App.css';
import {withRouter} from 'react-router';

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
      {props.nbItem > 1 ?
      `${props.nbItem} resultats` :
      `${props.nbItem} resultat`
      }

    </div>
  )
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


class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      cards: [],
      currentPage: 1,
      itemCount: 0,
      nbPage: 0,
      pokemonName: props.match.params.cardName !== undefined ? props.match.params.cardName.toLowerCase() : "",
      pokemonExactName: props.match.params.cardName !== undefined ? props.match.params.cardName.toLowerCase() : ""
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

          {this.state.cards.length !== 0
            ?
              <div>

              <NavigationBar
                currentPage={this.state.currentPage}
                firstPage={this.firstPage.bind(this)}
                previousPage={this.previousPage.bind(this)}
                nextPage={this.nextPage.bind(this)}
                lastPage={this.lastPage.bind(this)}
              />
              </div>
            :
              <p>No Result</p>
          }


            <br/>
      </div>
    )
  }


  handleNameChange = pokemonName => {
    if (this.state.pokemonExactName !== "") {
      this.props.history.push('/index')
    }
    this.setState({ pokemonName, pokemonExactName: "" });
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
    let request = null
    this.state.pokemonExactName !== "" ?
    request = new Request(`https://api.pokemontcg.io/v1/cards?page=${currentPage}&pageSize=32&name="${this.state.pokemonExactName}"`)
    :
    request = new Request(`https://api.pokemontcg.io/v1/cards?page=${currentPage}&pageSize=32&name=${this.state.pokemonName}`)

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

export default withRouter(App);
