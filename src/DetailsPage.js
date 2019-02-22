import React from 'react'

class DetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.fetchDetails(props.match.params.cardId)
        this.state = {
            card: null
        }
    }

    render() {
        return (
            <div className="tableClass">
                { this.state.card !== null
                ?
                <div className="pokemonInformations">
            
                  <div>
                    <img className="imgDetail" src={this.state.card.imageUrlHiRes} alt="" />
                  </div>

                  <div>
                    <div className="cardName">
                      <p><span className="nameChanges">{this.state.card.name}</span></p>
                      <p>{this.state.card.supertype} - {this.state.card.subtype}  {this.state.card.types !== undefined && `| ${this.state.card.types}`  }</p>
                      <p>{this.state.card.hp} HP</p>
                    </div>
                      
                    {this.state.card.ability !== undefined &&
                          <div>
                            <p><span className="infoChanges">{`${this.state.card.ability.name}`}</span> - {this.state.card.ability.type}</p>
                            <p>{this.state.card.ability.text}</p>
                          </div>
                             
                    }

                    {this.state.card.text !== undefined ?
                          <div>
                            <p><span className="infoChanges">Rules</span></p>
                            <p>{this.state.card.text}</p>
                          </div>
                             : null
                    }
                    
                    <div className="attacks">
                      {this.state.card.attacks !== undefined &&
                            this.state.card.attacks.map(attack => (
                        <div className="attack" key={attack.name}>
                              <p > <span className="infoChanges">{attack.name}</span> - {attack.cost} {attack.damage !== "" &&
                              <span><span className="infoChanges">|</span> {attack.damage} damage</span>  }<br/>{attack.text}</p>
                        </div>
                              ))
                      }
                    </div>

                    <div className="weakness-resistance-retreat">
                      <div className="box">
                          {this.state.card.weaknesses !== undefined &&
                            <div className="elementWeaknessResistanceRetreat">
                                <span><span className="infoChanges">Weaknesses </span><br/>
                                {this.state.card.weaknesses.map(weakness => (
                                      <p key={weakness.type}> {weakness.type} {weakness.value}</p>
                                    ))}
                                </span>
                            </div>
                          }
                      </div>

                      <div className="box">
                          {this.state.card.resistances !== undefined &&
                            <div className="elementWeaknessResistanceRetreat">
                                <span><span className="infoChanges">Resistances </span><br/>
                                {this.state.card.resistances.map(resistance => (
                                      <p key={resistance.type}>{resistance.type} {resistance.value}</p>
                                    ))}
                                </span>
                            </div>
                          }
                      </div>
                    
                      <div className="box">
                          {this.state.card.retreatCost !== undefined &&
                            <div className="elementWeaknessResistanceRetreat">
                                <span><span className="infoChanges">Retreat </span><br/>
                                  <p>{this.state.card.retreatCost}</p>
                                </span>
                            </div>
                          }
                      </div>
                    </div>

                    <div className="artist-rarity-set">
                      <div className="box">
                        {this.state.card.artist !== undefined &&
                          <div className="elementArtistRaritySet">
                              <span><span className="infoChanges">Artist </span><br/>
                                <p>{this.state.card.artist}</p>
                              </span>
                          </div>
                        }
                      </div>

                      <div className="box">
                        {this.state.card.rarity !== undefined &&
                          <div className="elementArtistRaritySet">
                              <span><span className="infoChanges">Rarity </span><br/>
                                <p> {this.state.card.rarity}</p>
                              </span>
                          </div>
                        }
                      </div>

                      <div className="box">
                        {this.state.card.set !== undefined &&
                          <div className="elementArtistRaritySet">
                            <span><span className="infoChanges">Set </span><br/>
                            <p>{this.state.card.set}</p>
                            </span>
                          </div>
                        }
                      </div>
                     
                    </div>
                  </div>
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
            this.setState({card:data.cards[0]})
        })
    }


}



export default DetailsPage
