import React from 'react'

class DetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.fetchDetails(props.match.params.cardId)
        this.state = {
            cards: []
        }
    }

    render() {
        return (
            <div className="tableClass">
                { this.state.cards.length !== 0
                ?
                <div>
                    <img className="itemImg" src={this.state.cards[0].imageUrl} alt="Pokemon Image" />
                    <p>{this.state.text}</p>

                    <table>
                    <tbody>
                        <tr>
                            <th colSpan="2">Card Informations</th>
                        </tr>
                        {this.state.cards[0].nationalPokedexNumber !== undefined ?
                          <tr>
                              <td>Pokedex number</td>
                              <td>{this.state.cards[0].nationalPokedexNumber}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].types !== undefined ?
                          <tr>
                              <td>Types</td>
                              <td>{this.state.cards[0].types}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].attacks !== undefined ?
                          <tr>
                              <td>Attacks</td>
                              <td>{this.state.cards[0].attacks.map(attack => (
                                          <p key={attack.name}> <b>{attack.name} </b><br/>{attack.text}</p>
                                      ))}
                              </td>
                          </tr> : null
                        }

                        {this.state.cards[0].weaknesses !== undefined ?
                          <tr>
                              <td>Weaknesses</td>
                              <td>{this.state.cards[0].weaknesses !== undefined ? this.state.cards[0].weaknesses.map(weakness => (
                                          <p key={weakness.type}> <b>{weakness.type} </b><br/>{weakness.value}</p>
                                      )) : null }
                              </td>
                          </tr> : null 
                        }
                    </tbody>
                    </table>
                </div>
                :
                    null
                }


            </div>
        )
    }



    fetchDetails(cardId) {
        console.log(cardId)
        fetch(`https://api.pokemontcg.io/v1/cards?id=${cardId}`)
        .then(results => {
            return results.json()
        }).then(data => {
            this.setState({cards:data.cards})
        })
    }


}



export default DetailsPage
