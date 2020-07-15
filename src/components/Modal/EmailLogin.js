import React, {Component} from 'react';
import deliusLogo from '../../images/high_quality/main-delius.jpg';
import emailImg from '../../images/high_icon/msg_IMG.png';

class EmailLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    async verifyEmail() {
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signIn'
        const response = await fetch(url,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        })
        console.log(response.result);
    }

    // Sample function
    async check() {
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signIn' 
        fetch(url,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            return res.json()
        })
        .then(res2 => {
            console.log(res2)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div className="popup">
                <img src={deliusLogo} className="delius-mainImg1" width="25%" />
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>

                <div className="content">
                    <h3 className="h3-1">이메일을 입력해주세요</h3>
                    <div className="insert_email_f">
                        <input type="email" className="fadeIn second" placeholder="이메일" value={this.state.email} onChange={this.handleEmailChange} />
                        <br />
                        <input type="password" className="fadeIn third" placeholder="비밀번호" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div className="button-sec2">
                        <button className="loginEmail" onClick={this.verifyEmail}>
                        <img src={emailImg} width="23%" className="btn_icon" />
                        &nbsp;&nbsp;이메일 로그인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                    </div>
                    <br />
                    <hr className="popUp-hr"/>
                    <br />
                    <div className="popup_bot">
                        <ul className="popup_bot_">
                            <li><button onClick={this.props.changeStep.bind(this,'SignUp_TOS')}>회원가입</button></li>
                            <li><button onClick={this.props.changeStep.bind(this,'EmailPasswordFind')}>ID/PW 찾기</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailLogin;