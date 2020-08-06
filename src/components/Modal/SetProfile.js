import React, {Component} from 'react';
import ImgTrail from './ImgTrail';
import '../../stylesheets/Modal/SetProfile.css'
import Warning from '../Modal/Warning'
import AlertMessage from './AlertMessage'
import WebIndicator_view from '../../stylesheets/Indicator/Webindicator'

class SetProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userJob: '',
            userSex_M: false,
            userSex_F: false,
            birth: {
                year: '',
                month: '',
                day: '',
            },
            inputCheck: {
                year: false,
                month: false,
                day: false,
                st: false,
                sex: false,
                job: false,
                name: false,
            },
            info1:'1',
            info2:'1',
            info3:'1',
            info4:'1', 
            imgs: [],
            imgT: [], 
            st: {
                text: '',
                length: 0
            },
            errorMsg: {
                name: '',
                birth: '',
                st: '',
                sex: '',
                img: '',
                job: ''
            },
            alertMessage: '',
            toggleIndicator: false
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserJob = this.handleUserJob.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleInfo = this.handleInfo.bind(this);   
        this.handleBirth = this.handleBirth.bind(this);
        this.handleSt = this.handleSt.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.getImg = this.getImg.bind(this);
        this.getImgT = this.getImgT.bind(this);
        this.setToProfile = this.setToProfile.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        
        
        this.validBirth = this.validBirth.bind(this);
        this.validName = this.validName.bind(this);
        this.validJob = this.validJob.bind(this);
        this.validSex = this.validSex.bind(this);
        this.validImg = this.validImg.bind(this);
        this.validSt = this.validSt.bind(this);

        this.clickNext = this.clickNext.bind(this);
        this._clickNext = this._clickNext.bind(this);
    }

    handleToggle() {
        this.setState({toggleIndicator: !this.state.toggleIndicator})
    }

    handleUserName(e) {
        let _inputCheck = Object.assign({}, this.state.inputCheck);
        if(e.target.value !== '') {
            _inputCheck.name = true;
        }
        else {
            _inputCheck.name = false;
        }   
        this.setState({
            userName: e.target.value,
            inputCheck: _inputCheck
        })
    }

    handleUserJob(e) {
        let _inputCheck = Object.assign({}, this.state.inputCheck);
        if(e.target.value.length === 0) {
            _inputCheck.job = false;
        }
        else {
            _inputCheck.job = true;
        }   
        this.setState({
            userName: e.target.value,
            inputCheck: _inputCheck
        })
    }

    validBirth() {
        let _inputCheck = Object.assign({}, this.state.inputCheck);
        let err;
        if(_inputCheck.year && _inputCheck.month && _inputCheck.day) {
            err = '';
        }
        else {
            err = '생년월일을 확인해주세요 ex)1994 07 18'
        }
        return err;
    }

    validName() {
        let err;
        if(this.state.inputCheck.name) {
            err = '';
        }
        else {
            err = '이름을 입력해주세요'
        }
        return err;
    }

    validJob() {
        let err;
        if(this.state.inputCheck.job) {
            err = '';
        }
        else {
            err = '직업을 입력해주세요'
        }
        return err;
    }

    validSex() {
        let err;
        if(this.state.inputCheck.sex) {
            err = '';
        }
        else {
            err = '성별을 선택해주세요'
        }
        return err
    }

    validImg() {
        let err;
        if(this.state.imgT.length === 0) {
            err = '사진을 1개 이상 업로드 해주세요'
        }
        else {
            err = ''
        }
        return err;
    }

    validSt() {
        let err;
        if(this.state.st.length === 0 ) {
            err = '상태메세지를 입력해주세요'
        }
        else {
            if(this.state.inputCheck.st) {
                err = ''
            }
            else {
                err = '글자수가 초과하였습니다'
            }
        }
        return err;
    }


    async clickNext() {
        const birthErr = this.validBirth();
        const nameErr = this.validName();
        const jobErr = this.validJob();
        const sexErr = this.validSex();
        const imgErr = this.validImg();
        const stErr = this.validSt();

        if(!(birthErr === '' && nameErr === '' && jobErr === '' && sexErr === '' && imgErr === '' && stErr === '')) {
            this.setState({
                alertMessage: '올바른 형식이 아닙니다',
                errorMsg: {
                    name: nameErr,
                    birth: birthErr,
                    st: stErr,
                    sex: sexErr,
                    img: imgErr,
                    job: jobErr
                }
            })
        }
        else {
            const imgT = this.state.imgT.map((img) => {
                const uint8Arr = new Uint8Array(img.data)
                let imgData = [];
                uint8Arr.forEach(val => {
                    imgData.push(val)
                })
                return {
                    imgNa: img.imgNa,
                    data: imgData,
                    tp: img.tp,
                    isMain: img.isMain
                }
            })
    
            const data = {
                userName: this.state.userName,
                userJob: this.state.userJob,
                userSex: this.state.userSex_M ? true : false,
                birth: this.state.birth.year + this.state.birth.month + this.state.birth.day,
                info1: this.state.info1,
                info2: this.state.info2,
                info3: this.state.info3,
                info4: this.state.info4,
                imgT: imgT,
                uid: this.props.uid,
                st: this.state.st.text
            };
            
            const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signUp/initProfile'
            const response = fetch(url,{
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
            })
            
            this.handleToggle();

            const r = await response.then(res => {
                return res.json();
            }).catch(err => {
                return err
            })
    
            if(r.result === 'SUCCESS') {
                this.handleToggle();
                this.props.changeStep('Welcome')
            }
        }
    }

    _clickNext() {
        this.props.changeStep('Welcome')
    }

    handleBirth(e) {
        let validLength = {
            year: 4,
            month: 2,
            day: 2
        }
        let _inputCheck = Object.assign({}, this.state.inputCheck);
        let _birth = Object.assign({}, this.state.birth);
        
        _birth[e.target.id] = e.target.value

        if(e.target.value.length === validLength[e.target.id]) {
            _inputCheck[e.target.id] = true;
        }
        else {
            _inputCheck[e.target.id] = false;
        }
        this.setState({
            inputCheck: _inputCheck,
            birth: _birth
        })
    }

    handleSex(e) {
        let _userSex_M = this.state.userSex_M;
        let _userSex_F = this.state.userSex_F;
        let _inputCheck = Object.assign({}, this.state.inputCheck);

        if(e.target.id === 'userSex_M') {            
            if(!(_userSex_M || _userSex_F)) {
                _inputCheck.sex = true;
                this.setState({
                    userSex_M: true,
                    inputCheck: _inputCheck
                })
            }
            else if(_userSex_M) {
                _inputCheck.sex = false;
                this.setState({
                    userSex_M: false,
                    inputCheck: _inputCheck
                })
            }
            else if(_userSex_F) {
                this.setState({
                    userSex_M: true,
                    userSex_F: false
                })
            }
        }

        else if(e.target.id === 'userSex_F') {
            if(!(_userSex_M || _userSex_F)) {
                _inputCheck.sex = true;
                this.setState({
                    userSex_F: true,
                    inputCheck: _inputCheck
                })
            }
            else if(_userSex_M) {
                this.setState({
                    userSex_M: false,
                    userSex_F: true
                })
            }
            else if(_userSex_F) {
                _inputCheck.sex = false;
                this.setState({
                    userSex_F: false,
                    inputCheck: _inputCheck
                })
            }
        }
    }

    handleInfo(e) {
        let updateObj = {};
        updateObj[e.target.id] = e.target.value;
        this.setState(updateObj)
    }

    handleSt(e) {
        let charSum = 0;
        for(let i = 0; i < e.target.value.length; i++ ) {
            if(e.target.value.charCodeAt(i) >= 0xAC00 && e.target.value.charCodeAt(i) <= 0xD7AF) {
                charSum = charSum + 2;
            }
            else {
                charSum++;
            }
        }
    
        const newSt = {
            text: e.target.value,
            length: charSum
        }

        let _inputCheck = this.state.inputCheck;

        if(charSum > 40) {
            _inputCheck.st = false;
            this.setState({
                st: newSt,
                inputCheck: _inputCheck
            })
        }
        else if(charSum === 0) {
            _inputCheck.st = false;
            this.setState({
                st: newSt,
                inputCheck: _inputCheck
            })
        }
        else {
            _inputCheck.st = true;
            this.setState({
                st: newSt,
                inputCheck: _inputCheck
            })
        }
        
    }

    getImg(imgObj) {
        let _imgs = Array.from(this.state.imgs);
        _imgs.push(imgObj)
        this.setState({imgs: _imgs})
    }

    getImgT(imgObj) {
        let _imgT = Array.from(this.state.imgT);
        _imgT.push(imgObj);
        let _errorMsg = Object.assign({}, this.state.errorMsg);
        if(this.state.imgT.length !== 0 ) {
            _errorMsg.img = ''
        }
        this.setState({
            imgT: _imgT,
            errorMsg: _errorMsg
        })
    }

    setToProfile(i) {
        if(i === 0) {
            return true;
        }
        let _imgs = Array.from(this.state.imgs);
        let _imgT = Array.from(this.state.imgT);

        let temp = _imgs[0];
        _imgs[0] = _imgs[i];
        _imgs[i] = temp
        _imgs[0].isMain = 'true';
        _imgs[i].isMain = 'false';

        temp = _imgT[0];
        _imgT[0] = _imgT[i];
        _imgT[i] = temp;
        _imgT[0].isMain = 'true';
        _imgT[i].isMain = 'false';

        this.setState({
            imgs: _imgs,
            imgT: _imgT
        })        
    }

    deleteImg(i) {
        let _imgs = Array.from(this.state.imgs);
        let _imgT = Array.from(this.state.imgT);

        if(i === 0) {
            if(_imgs.length > 1) {
                _imgs[1].isMain = 'true';
                _imgT[1].isMain = 'true';
            }
        }
        
        _imgs.splice(i, 1);
        _imgT.splice(i, 1);

        this.setState({
            imgs: _imgs,
            imgT: _imgT
        })
    }

    render() {
        const motive = ['동네친구 찾아요', '연애하고 싶어요', '삶이 지루해요', '미팅 하고 싶어요', '언어 교환해요', '혼자 밥먹기 싫어요', '취미 공유해요', '기타']
        const personality = ['재밌어요', '귀여워요', '로맨틱해요', '털털해요', '소심해요', '신중해요', '독특해요', '기타'];
        const interest = ['여행/소풍', '운동/스포츠관람', '미술/공예', '음악/악기', '영화/공연관람', '게임/오락', '요리/식도락', '기타'];
        const idealType = ['연상이 좋아요', '연하가 좋아요', '가까우면 좋겠어요', '거리는 상관없어요', '밝은사람이 좋아요', '생각이 건강하면 좋겠어요', '활동적인 사람이 좋아요', '정적인 사람이 좋아요']
        
        const info = function(arr) {
            return arr.map((choice, i) => {
                return <option key={choice} value={i}>{choice}</option>
            })
        }    
        const info_1 = info(motive);
        const info_2 = info(personality);
        const info_3 = info(interest);
        const info_4 = info(idealType);
        
        return(
            <div className='popup'>
                 <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                <div className='content'>
                    <div className='insert_UserInfo'>
                        <div>
                            <h5 className="imgH5">대표사진</h5>
                            <ImgTrail 
                            imgs={this.state.imgs}
                            imgT={this.state.imgT}
                            setToProfile={this.setToProfile}
                            deleteImg={this.deleteImg}
                            getImg={this.getImg}
                            getImgT={this.getImgT}
                            warningMessage={this.state.errorMsg.img}
                            />
                        </div>
                        <div>
                            <h5>이름</h5>
                            <input type='text' className='userName' placeholder='이름' onChange={this.handleUserName}/>
                            <Warning 
                            warningMessage={this.state.errorMsg.name}
                            />
                        </div>
                        
                        <div>
                            <h5>직업</h5>
                            <input type='text' className='userName' placeholder='직업' onChange={this.handleUserJob}/>
                            <Warning 
                            warningMessage={this.state.errorMsg.job}
                            />
                        </div>
                        <div>
                            <h5>상태 메세지 <div className="text40">{this.state.st.length}/40</div></h5> 
                            <input type='text' className='userName' placeholder='오늘은 기분이 좋아요 :)' onChange={this.handleSt}/>
                            <Warning 
                            warningMessage={this.state.errorMsg.st}
                            />
                        </div>
                        <div>
                            <h5>성별</h5>
                            <div className='boxes'>
                                <div className='row'>
                                    <div className='col-5'>
                                        <div className="sexM">남성</div>
                                        <input type='checkbox' id='userSex_M' className="checkSex" checked={this.state.userSex_M} onChange={this.handleSex}/>
                                        <label htmlFor='userSex_M'></label>
                                    </div>
                                    <div className='col-5'>
                                        <div className='sexF'>여성</div>
                                        <input type='checkbox' id='userSex_F' className="checkSex" checked={this.state.userSex_F} onChange={this.handleSex}/>
                                        <label htmlFor='userSex_F'></label>
                                    </div>
                                </div>
                            </div>
                            <Warning 
                            warningMessage={this.state.errorMsg.sex}
                            />
                        </div>
                        <div>
                            <h5>생년월일</h5>
                            <div className='userBirth'>
                                <div className='year'>
                                    <input type='number' id='year' className="birth" placeholder='Year 4자리' onChange={this.handleBirth}/>
                                </div>
                                <div className='month'>
                                    <input type='number' id='month'  className="birth" placeholder='Month 2자리' onChange={this.handleBirth}/>
                                </div>
                                <div className='day'>
                                    <input type='number' id='day'  className="birth" placeholder='day 2자리' onChange={this.handleBirth}/>
                                </div>
                            </div>
                            <Warning 
                            warningMessage={this.state.errorMsg.birth}
                            />
                        </div>
                        <div>
                            <h5>가입동기</h5>
                            <span className='info-dropdown' onChange={this.handleInfo}>
                                <select className='info_select' id='info1'>{info_1}</select>
                            </span>
                            <h5>성격</h5>
                            <span className='info-dropdown' onChange={this.handleInfo}>
                                <select className='info_select' id='info2'>{info_2}</select>
                            </span>
                            <h5>관심사</h5>
                            <span className='info-dropdown' onChange={this.handleInfo}>
                                <select className='info_select' id='info3'>{info_3}</select>
                            </span>
                            <h5>이상형</h5>
                            <span className='info-dropdown' onChange={this.handleInfo}>
                                <select className='info_select' id='info4'>{info_4}</select>
                            </span>
                        </div>
                    </div>
                    <AlertMessage
                    warningMessage={this.state.alertMessage}
                    clearMessage={() => { this.setState({ alertMessage: '' }) }}
                    />
                </div>
                
                <WebIndicator_view 
                    toggle={this.state.toggleIndicator}
                />
                
                <div className='signUp-downward'>
                    <button type='button' className='next' onClick={this.clickNext}>다음</button>
                    <h6>4/5</h6>
                </div>
            </div>
        )
    }
}

export default SetProfile;  