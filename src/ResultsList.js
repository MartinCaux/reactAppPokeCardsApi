import React from 'react'
import ResultItem from './ResultItem';

class ResultsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards : []
        }
    }

    render() {
        return(
          <div className="listContainer" >
                {this.state.cards !== [] ? this.state.cards.map(element => (
                        <ResultItem key={element.id} id={element.id} name={element.name} url={element.imageUrl} description={element.text} />
                    )) : null }
              </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cards:nextProps.cards
        })
    }


}

export default ResultsList
