import React from 'react'

class Result extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        return(
            <div className="itemClass">
                <img src={this.props.icone} alt="Image du pokémon" />
                <div>
                    <p>{this.props.pokeName} - {this.props.pokeType} </p>
                    <p>{this.props.pokeGeneration}</p>
                </div> 
            </div>
        )
    }
}

export default Result