import React, {Component} from 'react';
import '../../stylesheets/Modal/EmailProvider.css';
class EmailProvider extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password_1: '',
            password_2: '',
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword_1 = this.handlePassword_1.bind(this)
        this.handlePassword_2 = this.handlePassword_2.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.clickNext = this.clickNext.bind(this)
        this._clickNext = this._clickNext.bind(this)
    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({email: e.target.value})
    }

    handlePassword_1(e) {
        e.preventDefault();
        this.setState({password_1: e.target.value})
    }

    handlePassword_2(e) {
        e.preventDefault();
        this.setState({password_2: e.target.value})
    }

    async clickNext() {
        const isPasswordIdentical = this.checkPassword();
        if(!isPasswordIdentical) {
            return true;
        }
        const data = {
            email: this.state.email,
            password: this.state.password_1,
            uid: this.props.uid
        };
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signUp/emailProvider'
        const response = await fetch(url,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            },
            credentials: 'omit',
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).catch(err => {
            return err
        })

        if(response.result === 'SUCCESS') {
            this.props.changeStep('SetProfile')
        }
    }

    _clickNext() {
        this.props.changeStep('SetProfile')
    }

    checkPassword() {
        const password_1 = this.state.password_1;
        const password_2 = this.state.password_2;
        if(Object.is(password_1, password_2)) {
            return true;          
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div className='popup'>
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                <div className='content'>
                    <div className='insert_email'>
                        <h5>이메일 주소를 입력해주세요</h5>
                        <div className='inputphone_number'>
                            <input type='email' className='userEmail' placeholder='Delius@company.com' onChange={this.handleEmail}/>
                        </div>
                        <h5>비밀번호 입력</h5>
                        <input type='password' className='userPassword' maxLength='20' minLength='8' onChange={this.handlePassword_1}/>
                        <br/>
                        <div className="pwRule">8자리 이상 영문과 숫자를 혼합하여 사용.</div>
                        <h5>비밀번호 확인</h5>
                        <input type='password' className='ConfirmuserPassword' maxLength='20' minLength='8' onChange={this.handlePassword_2}/>
                    </div>
                </div>
                <div className='signUp-downward'>
                        <button type='button' className='next' onClick={this.clickNext}>다음</button>
                        <br />
                        <h6>3/5</h6>
                    </div>
            </div>
        )
    }
}

export default EmailProvider;