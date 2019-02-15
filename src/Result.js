import React from 'react'

class Result extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return(
            <li className="itemClass">
                <img className="itemImg" src={this.props.url} alt="Image du pokémon" />
                <div className="itemDescription">
                    <p>{this.props.name}</p>
                    <p>{this.props.description}</p>
                </div> 
            </li>
        )
    }
}

export default Result