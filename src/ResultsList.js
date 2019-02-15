import React from 'react'
import Result from './Result';
import florizarre from './florizarre.png';
import pikachu from './pikachu.png';

class ResultsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards : []
        }
    }

    render() {
        return(
            <ul>
                {this.state.cards != [] ? this.state.cards.map(element => (
                        <Result name={element.name} url={element.imageUrl} description={element.text} />
                    )) : null }    
            </ul>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            cards:nextProps.cards.cards
        })
    }

}

export default ResultsList