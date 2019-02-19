import React from 'react'
import {Link} from "react-router-dom";

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
                    <img className="itemImg" src={this.state.cards[0].imageUrl} alt="" />
                    <p>{this.state.text}</p>

                    <table>
                    <tbody>
                        <tr>
                            <th colSpan="2">Card Informations</th>
                        </tr>
                        {this.state.cards[0].name !== undefined ?
                          <tr>
                              <td>Name</td>
                              <td>{this.state.cards[0].name}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].supertype !== undefined ?
                          <tr>
                              <td>Card Type</td>
                              <td>{this.state.cards[0].supertype}
                              {this.state.cards[0].subtype !== undefined ?
                                ` - ${this.state.cards[0].subtype}` : null
                              }</td>
                          </tr> : null
                        }
                        {this.state.cards[0].hp !== "None" ?
                          <tr>
                              <td>Health Points</td>
                              <td>{`${this.state.cards[0].hp} hp`}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].types !== undefined ?
                          <tr>
                          <td>Type</td>
                          <td>{this.state.cards[0].types}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].evolvesFrom !== undefined ?
                          <tr>
                          <td>Evolves from</td>
                          <td><Link className="itemImg" to={`/index/${ this.state.cards[0].evolvesFrom}`}>
                            {this.state.cards[0].evolvesFrom}
                          </Link></td>

                          </tr> : null
                        }
                        {this.state.cards[0].nationalPokedexNumber !== undefined ?
                          <tr>
                              <td>Pokedex Number</td>
                              <td>{this.state.cards[0].nationalPokedexNumber}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].attacks !== undefined ?
                          <tr>
                              <td>Attacks</td>
                              <td>{this.state.cards[0].attacks.map(attack => (
                                          <p key={attack.name}> <b>{attack.name}</b> {attack.damage !== "" ?
                                          <text><b>|</b>  {attack.damage} damage </text> : null}<br/>{attack.text}</p>
                                      ))}
                              </td>
                          </tr> : null
                        }
                        {this.state.cards[0].weaknesses !== undefined ?
                          <tr>
                              <td>Weaknesses</td>
                              <td>{this.state.cards[0].weaknesses.map(weakness => (
                                    <p key={weakness.type}> <b>{weakness.type} </b>{weakness.value}</p>
                                  ))}
                              </td>
                          </tr> : null
                        }

                        {this.state.cards[0].resistances !== undefined ?
                          <tr>
                              <td>Resistances</td>
                              <td>{this.state.cards[0].resistances.map(resistance => (
                                    <p key={resistance.type}> <b>{resistance.type} </b>{resistance.value}</p>
                                  ))}
                              </td>
                          </tr> : null
                        }
                        {this.state.cards[0].ability !== undefined ?
                          <tr>
                              <td>Ability</td>
                              <p> <b>{`${this.state.cards[0].ability.name} | `}</b>  {this.state.cards[0].ability.type}<br/>{this.state.cards[0].ability.text}</p>
                          </tr> : null
                        }
                        {this.state.cards[0].set !== undefined ?
                          <tr>
                              <td>Set</td>
                              <td>{this.state.cards[0].set}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].rarity !== undefined ?
                          <tr>
                              <td>Rarity</td>
                              <td>{this.state.cards[0].rarity}</td>
                          </tr> : null
                        }
                        {this.state.cards[0].artist !== undefined ?
                          <tr>
                              <td>Artist</td>
                              <td>{this.state.cards[0].artist}</td>
                          </tr> : null
                        }
                    </tbody>
                    </table>
                </div>
                : null
                }


            </div>
        )
    }



    fetchDetails(cardId) {
        fetch(`https://api.pokemontcg.io/v1/cards?id=${cardId}`)
        .then(results => {
            return results.json()
        }).then(data => {
            this.setState({cards:data.cards})
        })
    }


}



export default DetailsPage
