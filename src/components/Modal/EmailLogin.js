import React, {Component} from 'react';
import loginIMG from '../../images/high_icon/loginIMG.png';
import '../../stylesheets/Modal/EmailLogin.css';
import { AuthContext } from '../AuthContext'
import WebIndicator_view from '../../stylesheets/Indicator/Webindicator'

class EmailLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toggleIndicator: false
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

    handleToggle() {
        this.setState({toggleIndicator: !this.state.toggleIndicator})
    }

    async verifyEmail() {
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signIn'
        this.handleToggle();
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
        if(response.result === 'LOGIN_SUCCESS') {
            setTimeout(() => {
                this.context.Auth.Auth_initialize().then(() => {
                    this.handleToggle();
                    this.props.history.push(this.context.Auth.getUid())
                })
            },1000)
        }
        else if(response.result === 'LOGIN_FAIL'){
        }
    }

    // Sample function
    async check() {
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/user'
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include'
        })

        response.text().then(res => {
            console.log(res)
        })
    }
    
    render() {
        return (
            <div className="popup">
                <img src={loginIMG} className="delius-mainImg1" />
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>

                <div className="content">
                    <div className="insert_email_f">
                        <input type="email" className="insertID" placeholder="이메일을 입력해주세요" value={this.state.email} onChange={this.handleEmailChange} />
                        <br />
                        <input type="password" className="insertPW" placeholder="비밀번호를 입력해주세요" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div className="button-sec2">
                        <button className="login" onClick={this.verifyEmail}>
                            로그인
                    </button>
                    </div>
                    <WebIndicator_view 
                        toggle={this.state.toggleIndicator}
                    />
                    <div className="loginUnderBar">
                        <button className="" onClick={this.props.changeStep.bind(this,'SignUp_TOS')}>회원가입</button>
                        <button className="">ID/PW찾기</button>
                    </div>
                </div>
            </div>
        );
    }
}
EmailLogin.contextType = AuthContext

export default EmailLogin;