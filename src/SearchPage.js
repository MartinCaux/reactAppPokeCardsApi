import React from 'react'
import ResultsList from './ResultsList';

class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards : []
        }
    }

    render() {
        return (
            <div>
                <ResultsList cards={this.props.cards} />
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cards:nextProps.cards
        })
    }
}



export default SearchPage
