import React, {Component} from 'react'

class Warning extends Component {
    

    render() {
        if(this.props.warningMessage === '') {
            return null;
        }
        else {
            return <div className='warning-msg'>{this.props.warningMessage}</div>
        }
    }
}

export default Warning;