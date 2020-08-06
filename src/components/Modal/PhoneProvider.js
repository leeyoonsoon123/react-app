import React, {Component} from 'react';
import {FirebaseContext} from '../Firebase'
import '../../stylesheets/Modal/PhoneProvider.css';
// Test phone number : +555685032357 ||  Verification code : 863806

class PhoneProvider extends Component {
    constructor(props) {
        //this.props = toggleFunction, changeStep
        super(props);
        this.state = {
            selectValue: 'default',
            phoneNum: '',
            verifyCode: '',
            isVerified: false,
            uid: ''
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.handlePhoneNum = this.handlePhoneNum.bind(this)
        this.handleVerifyCode = this.handleVerifyCode.bind(this)   
        this.getVerifyCode = this.getVerifyCode.bind(this)
        this.confirmVerifyCode = this.confirmVerifyCode.bind(this)
        this.clickNext = this.clickNext.bind(this)   
        this._clickNext = this._clickNext.bind(this)     
    }

    handleSelect(e) {
        e.preventDefault();
        this.setState({selectValue: e.target.value})
    }

    handlePhoneNum(e) {
        e.preventDefault();
        this.setState({phoneNum: e.target.value})
    }

    handleVerifyCode(e) {
        e.preventDefault();
        this.setState({verifyCode: e.target.value})
    }

    getVerifyCode() {
        const phoneNum = '+' + this.state.phoneNum;
        const appVerifier = window.recaptchaVerifier;
            
        this.firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult
                console.log('Verify code is send to your submitted phone number. Confirm by enter verify code!')
                return true
            })
            .catch(err => {
                console.log(err)
                return true
            })
    }

    confirmVerifyCode() {
        if (window.confirmationResult) {
            window.confirmationResult.confirm(this.state.verifyCode)
            .then(userCredential => {
                const uid = userCredential.user.uid
                this.props.setUid(uid)
                this.setState({
                    isVerified: true,
                    uid: uid
                });
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            console.log('Get verify code first!')
        }
    }

    async clickNext() {
        if(this.state.isVerified) {
            const data = {
                ph: this.state.phoneNum,
                uid: this.state.uid
            }
            const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signUp/phoneProvider'
            const response = await fetch(url, {
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
                return err;
            })

            if(response.result === 'SUCCESS') {
                this.props.changeStep('EmailProvider')
            }
            else{
                console.log(response)
            }
        }
    }

    _clickNext() {
        this.props.changeStep('EmailProvider')
    }

    componentDidMount() {
        this.firebase = this.context.app
        document.getElementsByClassName('phone_certification')[0].setAttribute('id', 'phoneNum-certification')
        if(!window.recaptchaVerifier) {
            window.recaptchaVerifier = new this.firebase.auth.RecaptchaVerifier('phoneNum-certification', { 'size': 'invisible' });
        }
    }

    render() {
        return (
            <div className='popup'>
                <button className='close' onClick={this.props.toggleFunction}>&times;</button>
                <div className='content'>
                    <div className='insert_phone'>
                        <h5>전화번호 입력</h5>
                        <div className='inputphone_number'>
                            <span className='custom-dropdown'>
                                <select value={this.state.selectValue} onChange={this.handleSelect}>
                                    <option value='default'>국가선택</option>
                                    <option value='KR'>KR</option>
                                    <option value='CHN'>CHN</option>
                                    <option value='USA'>USA</option>
                                    <option value='GER'>GER</option>
                                    <option value='JP'>JP</option>
                                </select>
                            </span>
                            <input type='number' className="insertPhoneNum" placeholder='-를 제외한 숫자만 입력하세요' onChange={this.handlePhoneNum}/>
                        </div>
                        <div className='certification'>
                            <button type='button' className='phone_certification' onClick={this.getVerifyCode}>인증받기</button>
                        </div>
                        <h5>인증번호 입력</h5>
                        <div className='wrapper'>
                            <input type='number' className='code_certification' placeholder='코드 입력' onChange={this.handleVerifyCode} />
                            <button type='button' className='codeNum_certification' onClick={this.confirmVerifyCode}>확인</button>
                        </div>
                    </div>
                </div>
                <div className='signUp-downward'>
                        <button type='button' className='next' onClick={this.clickNext}>다음</button>
                        <h6>2/5</h6>
                    </div>
            </div>
        )
    }
}

PhoneProvider.contextType = FirebaseContext

export default PhoneProvider;