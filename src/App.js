import React, { Component } from 'react';
import SearchPage from './SearchPage';
import './App.css';
import {withRouter} from 'react-router';
import Store from './Store';

function Search(props) {
  return (
    <div className="bar">
          <input
        type="text"
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
        placeholder="Entrez votre recherche"
      />
      <br />
      <span className="spanResult">
        {props.nbItem > 1 ?
          `${props.nbItem} results found`
        :
          `${props.nbItem} result found`
        }
      </span>

    </div>
  )
}

function NavigationBar(props) {
  return (
    <div className="buttonContainer">
        <div>
          {props.currentPage === 1 ? 
          <button onClick={props.firstPage} className="previous" disabled>&#8249;&#8249;</button>
          : 
          <button onClick={props.firstPage} className="previous">&#8249;&#8249;</button>
          }
          {props.currentPage === 1 ? 
          <button onClick={props.previousPage} className="previous" disabled>&#8249;</button>
          : 
          <button onClick={props.previousPage} className="previous">&#8249;</button>
          }
        </div>

        <span className="currentPage">{props.currentPage}</span>
        <div>
          {props.currentPage === props.nbPage ? 
          <button onClick={props.nextPage} className="next" disabled>&#8250;</button> 
          : 
          <button  onClick={props.nextPage} className="next" >&#8250;</button>
          }
          {props.currentPage === props.nbPage ? 
          <button onClick={props.lastPage} className="next" disabled>&#8250;&#8250;</button>
          : 
          <button onClick={props.lastPage} className="next">&#8250;&#8250;</button>
          }
        </div>
    
   
    </div>
  )
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      cards: [],
      currentPage: Store.currentPage,
      itemCount: 0,
      nbPage: 0,
      pokemonName: props.match.params.cardName !== undefined ? props.match.params.cardName.toLowerCase() : Store.pokemonName,
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
            nbPage={this.state.nbPage}
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
                nbPage={this.state.nbPage}
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
    Store.pokemonName = pokemonName
    if (this.state.pokemonExactName !== "") {
      this.props.history.push('/index')
    }
    this.setState({ pokemonName, pokemonExactName: "" });
  };

  firstPage = () => {
    let currentPage = this.state.currentPage
    if(currentPage > 1) {
      this.fetchData(1)
    }
  }


  lastPage = () => {
    let currentPage = this.state.currentPage
    if(currentPage < this.state.nbPage) {
      this.fetchData(this.state.nbPage)
    }
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
    Store.currentPage = currentPage
    this.setState({currentPage})

  }

  // Fetch de l'api
  componentDidMount() {
    this.fetchData(this.state.currentPage)
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.pokemonName !== this.state.pokemonName) {
      this.fetchData(1);
    }
  }
}

export default withRouter(App);
