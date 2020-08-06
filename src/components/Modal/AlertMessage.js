import React, { Component } from 'react'
import '../../stylesheets/Modal/AlertMessage.css'
import loginIMG from '../../images/high_icon/delius-logo.png';
class AlertMessage extends Component{
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.warningMessage === '') {
            return null;
        }
        else {
            return (
                <div className="mod-alert">
                <div className ="popup-alert">
                <img src={loginIMG} className="delius-mainImg"/>
                <div className='alert-message'>
                    {this.props.warningMessage} <br/>
                    <button type='button' onClick={this.props.clearMessage} className="button-div-btn">확인</button>
                </div>
                </div>
                </div>
            )   
        }
    }
}

export default AlertMessage;