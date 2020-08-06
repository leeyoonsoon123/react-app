import React, {Component} from 'react';
import deliusLogo from '../../images/high_icon/delius-logo.png';
import phoneImg from '../../images/high_icon/phone_IMG.png';
import emailImg from '../../images/high_icon/msg_IMG.png';
import '../../stylesheets/Modal/Main.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.changeToTemp = this.changeToTemp.bind(this)
    }

    changeToTemp() {
        this.props.handleWarningMessage();
        this.props.changeStep('Temp')
    }

    render()  {
        return (
            <div className="popup">
                <img src={deliusLogo} className="delius-mainImg" />
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                
                <div className="content">
                    <h3 className="h3-1">딜리어스 시작하기</h3>
                    <div className="button-sec">
                        <button className="loginPhone">
                            <img src={phoneImg} width="5%" className="btn-icon" onClick={this.props.changeStep.bind(this,'PhoneLogin')}/>
                            &nbsp;전화번호 로그인 &nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <br />
                        <button className="loginEmail" onClick={this.props.changeStep.bind(this,'EmailLogin')}>
                            <img src={emailImg} width="5%" className="btn-icon"/>
                            &nbsp;&nbsp;&nbsp;이메일 로그인 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <div className="h3-2">
                            지금 '전화번호 로그인', '이메일 로그인' 클릭은 'Delius 이용약관'에 동의하는 것으로 간주되며
                            당사에서 개인정보를 처리하는 방식은 '개인정보 취급방침' 에서 확인하시면 됩니다.
                        </div>
                    </div>
                    <div className="underBar">
                            <button className="" onClick={this.changeToTemp}>회원가입</button>
                            <button className="" onClick={this.changeToTemp}>ID/PW찾기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;