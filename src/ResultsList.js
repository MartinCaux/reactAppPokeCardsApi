import React from 'react'
import Result from './Result';
import chien from './chien.jpg';
import chat from './chat.jpg';

class ResultsList extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        return(
            <ul>
                <li><Result icone={chien} pokeName="Bulbizarre" pokeType="Plante" pokeGeneration="1ère génération" /></li>
                <li><Result icone={chat} pokeName="Pikachu" pokeType="Electrik" pokeGeneration="1ère génération" /></li>
            </ul>
        )
    }
}

export default ResultsList