import React from 'react'
import {Link} from "react-router-dom";

class ResultItem extends React.Component {

    render() {
        return(
            <span>
                <Link className="itemImg" to={`/details/${ this.props.id}`}>
                  <img className="itemImg" src={this.props.url} alt=""/>
                </Link>
            </span>
        )
    }
}

export default ResultItem
