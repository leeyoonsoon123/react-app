import React, {Component} from 'react';
import deliusLogo from '../../images/high_quality/main-delius.jpg';
import phoneImg from '../../images/high_icon/phone_IMG.png';
import emailImg from '../../images/high_icon/msg_IMG.png';

class Main extends Component {

    render()  {
        return (
            <div className="popup">
                <img src={deliusLogo} className="delius-mainImg1" width="25%"/>
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                
                <div className="content">
                    <h3 className="h3-1">딜리어스 시작하기</h3>
                    <div className="button-sec">
                        <button className="loginPhone">
                            <img src={phoneImg} width="23%" className="btn_icon" onClick={this.props.changeStep.bind(this,'PhoneLogin')}/>
                            &nbsp;전화번호 로그인 &nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <br />
                        <button className="loginEmail" onClick={this.props.changeStep.bind(this,'EmailLogin')}>
                            <img src={emailImg} width="23%" className="btn_icon"/>
                            &nbsp;이메일 로그인 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;