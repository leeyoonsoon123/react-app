import React, {Component} from 'react'

class Warning extends Component {
    render() {
        if(this.props.warningMessage === '') {
            return null;
        }
        else {
            return <p><span style={{color: 'red'}}>Error: </span>{this.props.warningMessage}</p>
        }
    }
}

export default Warning;