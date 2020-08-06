import React, { Component } from 'react'
import '../../stylesheets/Modal/AlertMessage.css'

class AlertImg extends Component{
    constructor(props){
        super(props);

        this.changeProfile = this.changeProfile.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    changeProfile(e) {
        this.props.handleToggle();
        this.props.setToProfile(parseInt(e.target.value))
    }

    deleteProfile(e) {
        this.props.handleToggle();
        this.props.deleteImg(parseInt(e.target.value))
    }

    render() {
        let imgTag;

        if(!this.props.toggle) {
            return null;
        }
        else {
            return (
                <div className="mod-img-alert">
                <div className ="popup-img-alert">
                <button className="close" onClick={this.props.handleToggle}>&times;</button>
                <div className='alert-img-message'>
                    프로필 사진 수정하기 <br/>
                <img src={this.props.src} className="user-sel-img" />
                    
                </div>
                <button className="profile-set-btn" value={this.props.index.toString()} onClick={this.changeProfile}>프로필 사진으로 설정</button> <br/>
                <button className="profile-del-btn" value={this.props.index.toString()} onClick={this.deleteProfile}>삭제하기</button>
                </div>
                </div>
            )   
        }
    }
}

export default AlertImg;