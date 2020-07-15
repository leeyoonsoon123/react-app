import React, {Component} from 'react';
import ImgTrail from './ImgTrail';


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
            },
            info1:'1',
            info2:'1',
            info3:'1',
            info4:'1', 
            imgs: [],
            imgT: [], 
            main: 0,
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserJob = this.handleUserJob.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleInfo = this.handleInfo.bind(this);   
        this.handleBirth = this.handleBirth.bind(this);
        this.getImg = this.getImg.bind(this);
        this.getImgT = this.getImgT.bind(this);
        this.setToProfile = this.setToProfile.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        this.clickNext = this.clickNext.bind(this);
        this._clickNext = this._clickNext.bind(this);
    }

    handleUserName(e) {
        this.setState({userName : e.target.value})
    }

    handleUserJob(e) {
        this.setState({userJob: e.target.value})
    }

    async clickNext() {        
        const imgT = this.state.imgT.map((img) => {
            const uint8Arr = new Uint8Array(img.data);
            const dataArr = [];
            uint8Arr.forEach(ele => {
                dataArr.push(ele);
            })
            console.log(dataArr);

            return {
                name: img.name,
                data: dataArr,
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
            uid: this.props.uid
        };
        
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/signUp/initProfile'
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
            this.props.changeStep('Welcome')
        }
    }

    _clickNext() {
        this.props.changeStep('Welcome')
    }

    handleBirth(e) {
        let updateObj = {};
        let validLength = {
            year: 4,
            month: 2,
            day: 2
        }
        const prevInputCheck = this.state.inputCheck;
        const prevBirth = this.state.birth;
        
        let nextInputCheck = prevInputCheck;
        let nextBirth = prevBirth
        if(e.target.value.length === validLength[e.target.id]) {
            nextBirth[e.target.id] = e.target.value
            nextInputCheck[e.target.id] = true;
        }
        else {
            nextBirth[e.target.id] = e.target.value
            nextInputCheck[e.target.id] = false;
        }
        this.setState(updateObj)
    }

    handleSex(e) {
        if(e.target.id === 'userSex_M') {
            const userSex_M = this.state.userSex_M;
            let new_userSex_M, new_userSex_F;
            new_userSex_M = !userSex_M;
            new_userSex_F = false;
            this.setState({
                userSex_M: new_userSex_M,
                userSex_F: new_userSex_F
            })
        }
        else if(e.target.id === 'userSex_F') {
            const userSex_F = this.state.userSex_F;
            let new_userSex_M, new_userSex_F;
            new_userSex_F = !userSex_F;
            new_userSex_M = false
            this.setState({
                userSex_M: new_userSex_M,
                userSex_F: new_userSex_F
            })
        }
    }

    handleInfo(e) {
        let updateObj = {};
        updateObj[e.target.id] = e.target.value;
        this.setState(updateObj)
    }

    getImg(imgObj) {
        const prevImgs = this.state.imgs;
        let nextImgs = prevImgs;
        nextImgs.push(imgObj)
        this.setState({imgs: nextImgs})
    }

    getImgT(imgObj) {
        const prevImgT = this.state.imgT;
        let nextImgT = prevImgT;
        nextImgT.push(imgObj);
        this.setState({imgT: nextImgT})
    }

    setToProfile(i) {
        const prevImgs = this.state.imgs;
        const prevMain = this.state.main;

        const nextMain = i;
        let nextImgs = prevImgs;
        nextImgs[nextMain].isMain = true;
        nextImgs[prevMain].isMain = false;

        this.setState({
            imgs: nextImgs,
            main: nextMain
        })
    }

    deleteImg(i) {
        const prevImgs = this.state.imgs;
        const prevMain = this.state.main;

        let nextImgs = prevImgs;
        nextImgs.splice(i, 1)
        if(i === prevMain) {
            const nextMain = 0;
            this.setState({
                imgs: nextImgs,
                main: nextMain
            })
        }
        else {
            this.setState({
                imgs: nextImgs
            })
        }
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
                <div className='popup_signUp'>
                    <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                    <div className='insert_UserInfo'>
                        <div>
                            <h5>대표사진</h5>
                            <ImgTrail 
                            imgs={this.state.imgs}
                            imgT={this.state.imgT}
                            setToProfile={this.setToProfile}
                            deleteImg={this.deleteImg}
                            getImg={this.getImg}
                            getImgT={this.getImgT}
                            />
                        </div>
                        <div>
                            <h5>이름</h5>
                            <input type='text' className='userName' placeholder='홍길동' onChange={this.handleUserName}/>
                        </div>
                        
                        <div>
                            <h5>직업</h5>
                            <input type='text' className='userName' placeholder='학생' onChange={this.handleUserJob}/>
                        </div>
                        
                        <div>
                            <h5>성별</h5>
                            <div className='boxes'>
                                <div className='row'>
                                    <div className='col-5'>
                                        <input type='checkbox' id='userSex_M' checked={this.state.userSex_M} onChange={this.handleSex}/>
                                        <label htmlFor='userSex_M'>남성</label>
                                    </div>
                                    <div className='col-5'>
                                        <input type='checkbox' id='userSex_F' checked={this.state.userSex_F} onChange={this.handleSex}/>
                                        <label htmlFor='userSex_F'>여성</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5>생년월일</h5>
                            <div className='row'>
                                <div className='col-4'>
                                    <input type='number' id='year' placeholder='4자리 입력 ex)1994' onChange={this.handleBirth}/>
                                </div>
                                <div className='col-4'>
                                    <input type='number' id='month' placeholder='2자리 입력 ex) 03, 12' onChange={this.handleBirth}/>
                                </div>
                                <div className='col-4'>
                                    <input type='number' id='day' placeholder='2자리 입력 ex) 05, 23' onChange={this.handleBirth}/>
                                </div>
                            </div>
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
                        <div className='signUp-downward'>
                            <button type='button' className='button-signUp' onClick={this._clickNext}>다음</button>
                            <h6>4/5</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetProfile;  