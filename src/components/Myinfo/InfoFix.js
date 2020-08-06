import React, { Component } from 'react'
import { AuthContext } from '../AuthContext'
import '../../stylesheets/Myinfo/MyinfoFix.css'
import ImgController from '../Modal/ImgController'
import AlertMessage from '../Modal/AlertMessage'
import Warning from '../Modal/Warning'
import WebIndicator_view from '../../stylesheets/Indicator/Webindicator'
const { v4: uuidv4 } = require('uuid')

class Infofix extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        this.state = {
            st: {
                text: '',
                length: 0
            },
            inputCheck: {
                st: true,
                job: true,
                ex: true,
            },
            ex: {
                text: '',
                length: 0
            },
            job: '',
            updateIm: [],
            imgs: [],
            imgT: [],
            info1: '0',
            info2: '0',
            info3: '0',
            info4: '0',
            inputErrorMessage: '',
            errorMsg: {
                img: '',
                st: '',
                job: '',
                ex: '',
            },
            alertMessage: '',
            toggleIndicator: false
        }

        this.baseURL = 'https://storage.googleapis.com/delius-original/profile'

        this.handleEx = this.handleEx.bind(this);
        this.handleJob = this.handleJob.bind(this);
        this.handleSt = this.handleSt.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.retrieveImg = this.retrieveImg.bind(this);
        this.setToProfile = this.setToProfile.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.getImgT = this.getImgT.bind(this);
        this.getImgs = this.getImgs.bind(this);
        this.clickNext = this.clickNext.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({toggleIndicator: !this.state.toggleIndicator})
    }

    handleEx(e) {
        let charSum = 0;
        for(let i = 0; i < e.target.value.length; i++ ) {
            if(e.target.value.charCodeAt(i) >= 0xAC00 && e.target.value.charCodeAt(i) <= 0xD7AF) {
                charSum = charSum + 2;
            }
            else {
                charSum++;
            }
        }

        const _ex = {
            text: e.target.value,
            length: charSum
        }

        let _inputCheck = Object.assign({}, this.state.inputCheck)

        if(charSum > 150) {
            _inputCheck.ex = false;
            this.setState({
                ex: _ex,
                inputCheck: _inputCheck
            })
        }

        else if(charSum === 0) {
            _inputCheck.ex = false;
            this.setState({
                ex: _ex,
                inputCheck: _inputCheck
            })
        }

        else {
            _inputCheck.ex = true;
            this.setState({
                ex: _ex,
                inputCheck: _inputCheck
            })
        }
    }

    handleJob(e) {
        let _inputCheck = Object.assign({}, this.state.inputCheck);
        if(e.target.value.length === 0) {
            _inputCheck.job = false;
        }
        else {
            _inputCheck.job = true;
        }
        this.setState({
            inputCheck: _inputCheck,
            job: e.target.value
        })
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
    
        const _st = {
            text: e.target.value,
            length: charSum
        }

        let _inputCheck = Object.assign({}, this.state.inputCheck);

        if(charSum > 40) {
            _inputCheck.st = false;
            this.setState({
                st: _st,
                inputCheck: _inputCheck
            })
        }
        else if(charSum === 0) {
            _inputCheck.st = false;
            this.setState({
                st: _st,
                inputCheck: _inputCheck
            })
        }
        else {
            _inputCheck.st = true;
            this.setState({
                st: _st,
                inputCheck: _inputCheck
            })
        }
    }

    handleInfo(e) {
        let updateObj = {};
        updateObj[e.target.id] = e.target.value;
        this.setState(updateObj)
    }

    handleInput(e) {
        const inputFile = e.target.files[0];
        if(!inputFile) {
            e.target.value = null;
            return true;
        }

        const inputFileType = inputFile.type
        let _inputErrorMessage = Object.assign({},this.state.inputErrorMessage);
        
        if(this.state.imgs.length !== 0) {
            if(!this.state.imgs.every((img) => {
                if(img.name !== inputFile.name) {
                    e.target.value = null;
                    return true;
                }
            })) {
                _inputErrorMessage = '중복된 파일은 업로드 하실 수 없습니다.'
                this.setState({ inputErrorMessage: _inputErrorMessage})
                e.target.value = null;
                return true;
            }
        }

        if (!inputFileType.includes('image')) {
            _inputErrorMessage = '이미지 파일만 업로드 해주세요.';
            this.setState({ inputErrorMessage: _inputErrorMessage })
            e.target.value = null;
            return true;
        }
        if (!inputFileType.includes('jpeg')) {
            _inputErrorMessage = '이미지 파일의 형식이 jpg가 아닙니다.';
            this.setState({ inputErrorMessage: _inputErrorMessage })
            e.target.value = null;
            return true;
        }

        if(this.state.updateIm.length >= 5) {
            _inputErrorMessage = '사진을 5장 이상 업로드 하실 수 없습니다.'
            this.setState({ inputErrorMessage: _inputErrorMessage});
            e.target.value = null;
            return true;
        }

        const imgNa = uuidv4();

            //When no error(MIME type: image/jpeg), this block is executing
            const fileReader_url = new FileReader();
            fileReader_url.readAsDataURL(inputFile);

            fileReader_url.onload = () => {                
                const imgFile = {};
                imgFile.name = inputFile.name;
                imgFile.imgNa = imgNa;
                imgFile.src = fileReader_url.result;
                if(this.state.updateIm.length === 0) {
                    imgFile.isMain = 'true';
                }
                else{
                    imgFile.isMain = 'false';
                }
                
                this.getImgs(imgFile);
            }
            fileReader_url.onabort = () => {console.log('Load aborted')}
            fileReader_url.onerror = () => {console.log('Load error')}
            
            const fileReader_arrayBuf = new FileReader();
            fileReader_arrayBuf.readAsArrayBuffer(inputFile);

            fileReader_arrayBuf.onload = () => {
                const imgFile = {}
                imgFile.name = inputFile.name;
                imgFile.imgNa = imgNa;
                imgFile.data = fileReader_arrayBuf.result;
                if(this.state.updateIm.length === 0) {
                    imgFile.isMain = 'true';
                }
                else{
                    imgFile.isMain = 'false';
                }
                imgFile.tp = Math.ceil(Date.now() / 1000);

                this.getImgT(imgFile)
            }
            fileReader_arrayBuf.onabort = () => {console.log('Load aborted')}
            fileReader_arrayBuf.onerror = () => {console.log('Load error')}
            e.target.value = null;
            this.setState({ inputErrorMessage: ''})
    }

    getImgs(imgObj) {
        const obj1 = Object.assign({}, imgObj)
        let obj2 = Object.assign({}, imgObj)

        let _imgs = Array.from(this.state.imgs);
        _imgs.push(obj1);

        let _updateIm = Array.from(this.state.updateIm)
        _updateIm.push(obj2);

        this.setState({
            imgs: _imgs,
            updateIm: _updateIm
        })
    }

    getImgT(imgObj) {
        const obj1 = Object.assign({}, imgObj)

        let _imgT = Array.from(this.state.imgT);
        _imgT.push(obj1);

        let _errorMsg = Object.assign({}, this.state.errorMsg);

        if(this.state.imgT.length !== 0) {
            _errorMsg.img = ''
        }
        this.setState({
            imgT: _imgT,
            errorMsg: _errorMsg,
        })
    }

    clearMessage() {
        this.setState({inputErrorMessage: ''})
    }

    setToProfile(i) {
        if(i === 0) {
            return true;
        }
        let _updateIm = Array.from(this.state.updateIm);

        let temp = _updateIm[i];
        let _imgs = Array.from(this.state.imgs)
        let _imgT = Array.from(this.state.imgT)

        if(temp.name) {
            for(let img of _imgs) {
                if(img.name === temp.name) {
                    img.isMain = true;
                }
                else {
                    img.isMain = false;
                }
            }
            for(let img of _imgT) {
                if(img.name === temp.name) {
                    img.isMain = true;
                }
                else {
                    img.isMain = false;
                }
            }
        }
        
        _updateIm[i] = _updateIm[0];
        _updateIm[0] = temp;
        _updateIm[0].isMain = 'true';
        _updateIm[i].isMain = 'false';
        this.setState({
            updateIm: _updateIm,
            imgs: _imgs,
            imgT: _imgT
        })   
        
    }

    deleteImg(i) {
        let _updateIm = Array.from(this.state.updateIm);
        let _imgs = Array.from(this.state.imgs);
        let _imgT = Array.from(this.state.imgT);

        if(i === 0) {
            if(_updateIm.length > 1) {
                _updateIm[1].isMain = 'true';
                _updateIm[1].tp = Math.ceil(Date.now() / 1000);
            }
        }

        const name = _updateIm[i].name;
        let _imgsNum, _imgTNum;

        _imgs.forEach((img, i) => {
            if(Object.is(name, img.name)) {
                _imgsNum = i;
            }
        })
        _imgT.forEach((img, i) => {
            if(Object.is(name, img.name)) {
                _imgTNum = i;
            }
        })

        _imgs.splice(_imgsNum, 1);
        _imgT.splice(_imgTNum, 1);        
        _updateIm.splice(i, 1);

        this.setState({
            imgs: _imgs,
            imgT: _imgT,
            updateIm: _updateIm
        })
    }

    retrieveImg() {
        if(this.state.updateIm.length === 0) {
            return null;
        }
        else {
            let _updateIm = Array.from(this.state.updateIm)
            _updateIm = this.reArrangeIm(_updateIm)
            const imgs = _updateIm.map((_img, i) => {
                if (!_img.src) {
                    let classname = 'thumbnail_img'
                    if (i === 0) {
                        classname += ' box-effect'
                    }
                    return (
                        <ImgController
                            classname={classname}
                            key={i}
                            index={i}
                            setToProfile={this.setToProfile}
                            deleteImg={this.deleteImg}
                            src={`${this.baseURL}/${this.context.Auth.Metadata.uid}/${_img.imgNa}`}
                            mode={'info-fix'}
                        />
                    )
                }
                else {
                    let classname = 'thumbnail_img'
                    if(i === 0) {
                        classname += ' box-effect'
                    }
                    return (
                        <ImgController
                            classname={classname}
                            key={i}
                            index={i}
                            setToProfile={this.setToProfile}
                            deleteImg={this.deleteImg}
                            src={_img.src}
                            mode={'info-fix'}
                        />
                    )   
                }
            })
            return imgs
        }
    }

    reArrangeIm(im) {
        let mainNum = 0;
        let _im = Array.from(im)
        _im.forEach((img, i) => {
            if(_im[mainNum].isMain === 'false' && img.isMain === 'true') {
                mainNum = i;
            }
            else if(_im[mainNum].isMain === 'true' && img.isMain === 'true') {
                if(_im[mainNum].tp < img.tp) {
                    mainNum = i;
                }
            }
        })
        const temp = _im[mainNum];
        _im[mainNum] = _im[0];
        _im[0] = temp;
        return _im;
    }

    componentDidMount() {
        const Auth = Object.assign({}, this.context.Auth);

        let charSum_st = 0;
        for(let i = 0; i < Auth.User.st.length; i++ ) {
            if(Auth.User.st.charCodeAt(i) >= 0xAC00 && Auth.User.st.charCodeAt(i) <= 0xD7AF) {
                charSum_st = charSum_st + 2;
            }
            else {
                charSum_st++;
            }
        }

        let charSum_ex = 0;
        for(let i = 0; i < Auth.User.ex.length; i++ ) {
            if(Auth.User.ex.charCodeAt(i) >= 0xAC00 && Auth.User.ex.charCodeAt(i) <= 0xD7AF) {
                charSum_ex = charSum_ex + 2;
            }
            else {
                charSum_ex++;
            }
        }

        this.setState({
            st: {
                text: Auth.User.st,
                length: charSum_st
            },
            ex: {
                text: Auth.User.ex,
                length: charSum_ex
            },
            job: Auth.User.job,
            updateIm: Auth.User.im,
            info1: Auth.User.fo1.toString(),
            info2: Auth.User.fo2.toString(),
            info3: Auth.User.fo3.toString(),
            info4: Auth.User.fo4.toString(),
            imgT: []
        })
    }

    validJob() {
        let err;
        if(this.state.inputCheck.job) {
            err = ''
        }
        else {
            err = '직업을 입력해주세요'
        }
        return err;
    }

    validImg() {
        let err;
        if(this.state.updateIm.length === 0) {
            err = '사진을 1개 이상 업로드 해주세요'
        }
        else {
            err = ''
        }
        return err;
    }

    validSt() {
        let err;
        if(this.state.st.length === 0) {
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

    validEx() {
        let err;
        if(this.state.ex.length === 0) {
            err = '자기소개를 입력해주세요'
        }
        else {
            if(this.state.inputCheck.ex) {
                err = ''
            }
            else {
                err = '글자수가 초과하였습니다'
            }
        }
        return err;
    }

    async clickNext() {
        const jobErr = this.validJob();
        const imgErr = this.validImg();
        const stErr = this.validSt();
        const exErr = this.validEx();
        
        if(!(jobErr === '' && imgErr === '' && stErr === '' && exErr === '')) {
            this.setState({
                alertMessage: '올바른 형식이 아닙니다',
                errorMsg: {
                    job: jobErr,
                    img: imgErr,
                    st: stErr,
                    ex: exErr
                }
            })
        }
        else {
            let _updateIm = Array.from(this.state.updateIm)

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

            _updateIm = _updateIm.filter((img) => {
                if(img.src) {
                    return false;
                }
                else {
                    return true;
                }
            })

            for(let img of _updateIm) {
                img.tp = Math.ceil(Date.now() / 1000);
            }

            const data = {
                info1: this.state.info1,
                info2: this.state.info2,
                info3: this.state.info3,
                info4: this.state.info4,
                imgT: imgT,
                st: this.state.st.text,
                ex: this.state.ex.text,
                job: this.state.job,
                im: _updateIm
            };

            const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/user/fixProfile'
            const response = fetch(url, {
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
            })
            this.handleToggle();
            
            const startWebInd = response.then(pr => {
                return pr.json();
            }).catch(err => {
                return err
            })

            const r = await startWebInd;
            

            if(r.result === 'SUCCESS') {
                setTimeout(()=>{this.context.Auth.Auth_initialize().then(() => {
                    this.handleToggle();
                    this.props.handleInfoFix();
                })}, 4000)
            }
        }
    }

    render() {
        const imgControllers = this.retrieveImg();
        let main_img = null;
        let arr_img =[]

        if(this.state.updateIm.length !== 0){
            main_img = imgControllers[0];
            for(let i=1; i < imgControllers.length; i++){
                arr_img.push(imgControllers[i])
            }
        }

        const motive = ['동네친구 찾아요', '연애하고 싶어요', '삶이 지루해요', '미팅 하고 싶어요', '언어 교환해요', '혼자 밥먹기 싫어요', '취미 공유해요', '기타']
        const personality = ['재밌어요', '귀여워요', '로맨틱해요', '털털해요', '소심해요', '신중해요', '독특해요', '기타'];
        const interest = ['여행/소풍', '운동/스포츠관람', '미술/공예', '음악/악기', '영화/공연관람', '게임/오락', '요리/식도락', '기타'];
        const idealType = ['연상이 좋아요', '연하가 좋아요', '가까우면 좋겠어요', '거리는 상관없어요', '밝은사람이 좋아요', '생각이 건강하면 좋겠어요', '활동적인 사람이 좋아요', '정적인 사람이 좋아요']

        const info = function(arr) {
            return arr.map((choice, i) => {
                return <option key={choice} value={i.toString()}>{choice}</option>
            })
        }    
        const info_1 = info(motive);
        const info_2 = info(personality);
        const info_3 = info(interest);
        const info_4 = info(idealType);

        return (
            <div>
                <div className="container-box">
                    <div className="fix-box">
                        <div className="fix-title">
                            내 사진
                     </div>
                        <div className='upload-btn'>
                            <div className='imgPreview-info'>
                                <div className="row">
                                    <div className="col-4 mainIMG">
                                        {main_img}
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-7 restIMG">
                                        {arr_img}
                                    </div>
                                </div>
                            </div>
                            <form onChange={this.handleInput}>
                                <div className='img_btn'>
                                    <input ref={this.inputRef} id='profileImg' className="img-upload-btn" type='file' accept='image/*' />
                                    <label htmlFor='profileImg'>사진 추가하기</label>
                                </div>
                            </form>
                            <AlertMessage
                                warningMessage={this.state.inputErrorMessage}
                                clearMessage={this.clearMessage}
                            />
                            <Warning
                                warningMessage={this.state.errorMsg.img}
                            />
                        </div>
                        <div className="fix-title">상태메세지&nbsp;&nbsp; <h6 style={{display: 'inline'}}>{this.state.st.length}/40</h6></div>
                        <input type="text" className="input-text" value={this.state.st.text} onChange={this.handleSt} />
                        <Warning 
                            warningMessage={this.state.errorMsg.st}
                        />
                        <div className="fix-title">직업</div>
                        <input type="text" className="input-text" value={this.state.job} onChange={this.handleJob} />
                        <Warning 
                            warningMessage={this.state.errorMsg.job}
                        />
                        <div className="fix-title">가입동기</div>
                        <span className='info-dropdown'>
                            <select className='info_select' id='info1' value={this.state.info1} onChange={this.handleInfo}>{info_1}</select>
                        </span>
                        <div className="fix-title">성격</div>
                        <span className='info-dropdown'>
                            <select className='info_select' id='info2' value={this.state.info2} onChange={this.handleInfo}>{info_2}</select>
                        </span>
                        <div className="fix-title">관심사</div>
                        <span className='info-dropdown' >
                            <select className='info_select' id='info3' value={this.state.info3} onChange={this.handleInfo}>{info_3}</select>
                        </span>
                        <div className="fix-title">이상형</div>
                        <span className='info-dropdown'>
                            <select className='info_select' id='info4' value={this.state.info4} onChange={this.handleInfo}>{info_4}</select>
                        </span>
                        <div className="fix-title">자기소개&nbsp;&nbsp;<h6 style={{display: 'inline'}}>{this.state.ex.length}/150</h6></div>
                        <textarea className="textArea" value={this.state.ex.text} onChange={this.handleEx} />
                        <Warning 
                            warningMessage={this.state.errorMsg.ex}
                        />
                        <AlertMessage
                            warningMessage={this.state.alertMessage}
                            clearMessage={() => { this.setState({ alertMessage: '' }) }}
                        />
                        <WebIndicator_view 
                            toggle={this.state.toggleIndicator}
                        />

                        <div className="button-div">
                            <button className="button-div-btn" onClick={this.clickNext}>수정하기</button> 
                            <button className="button-div-btn" onClick={this.props.handleInfoFix}>취소</button>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


Infofix.contextType = AuthContext;

export default Infofix;