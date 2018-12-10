import React from 'react'

class SearchBar extends React.Component {
    state={
        myInputValue : ""
    }

    render() {
        return (
            <input type="text" value={this.state.myInputValue} placeholder="Entrez votre recherche" onChange={this.onSearch}  />
        )
    }

  onSearch = (event) => {
    this.setState({myInputValue : event.target.value})
    console.log(this.state.myInputValue)
  }
}

export default SearchBar