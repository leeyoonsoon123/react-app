import React, {Component} from 'react'
import ImgController from './ImgController'
import AlertMessage from './AlertMessage'
import Warning from './Warning'
const { v4: uuidv4 } = require('uuid')

class ImgTrail extends Component{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            inputErrorMessage: '',
        }
        this.handleInput = this.handleInput.bind(this)
        this.clearMessage = this.clearMessage.bind(this)
    }

    handleInput(e) {
        
        // Add code block when number of image is more than 5
        const inputFile = e.target.files[0];
        if(!inputFile) {
            e.target.value = null;
            return true;
        }

        const inputFileType = inputFile.type
        let _inputErrorMessage = this.state.inputErrorMessage;
        
        if(this.props.imgs.length !== 0) {
            if(!this.props.imgs.every((img) => {
                console.log(img.name)
                console.log(inputFile.name)
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

        if(this.props.imgs.length >= 5) {
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
                console.log('URL load success')
                
                const imgFile = {};
                imgFile.name = inputFile.name;
                imgFile.src = fileReader_url.result;
                if(this.props.imgs.length === 0) {
                    imgFile.isMain = 'true';
                }
                else{
                    imgFile.isMain = 'false';
                }
                
                this.props.getImg(imgFile);
            }
            fileReader_url.onabort = () => {console.log('Load aborted')}
            fileReader_url.onerror = () => {console.log('Load error')}
            
            const fileReader_arrayBuf = new FileReader();
            fileReader_arrayBuf.readAsArrayBuffer(inputFile);

            fileReader_arrayBuf.onload = () => {
                const imgFile = {}
                imgFile.imgNa = imgNa;
                imgFile.data = fileReader_arrayBuf.result;
                if(this.props.imgT.length === 0) {
                    imgFile.isMain = 'true';
                }
                else{
                    imgFile.isMain = 'false';
                }
                imgFile.tp = Math.ceil(Date.now() / 1000);

                this.props.getImgT(imgFile)
            }
            fileReader_arrayBuf.onabort = () => {console.log('Load aborted')}
            fileReader_arrayBuf.onerror = () => {console.log('Load error')}
            e.target.value = null;
            this.setState({ inputErrorMessage: ''})
    }

    clearMessage() {
        this.setState({inputErrorMessage: ''})
    }

    render() {
        function makeImgList(props) {
            if(props.imgs.length > 0) {
                const imgs = props.imgs.map((_img, i) => {
                    let classname = 'thumbnail_img'
                    if(i === 0) {
                        classname += ' box-effect'
                    }
                    return <ImgController
                            classname={classname}
                            key={i}
                            index={i}
                            setToProfile={props.setToProfile}
                            deleteImg={props.deleteImg}
                            src={_img.src}
                            mode={'sign-up'}
                            />
               })
               return imgs;
            }
            else {
                return null
            }
        }
        const I = makeImgList(this.props);
        return (
            <div className='upload-btn'>
                <div className="imgPreview">
                    {I}
                </div>
                <form onChange={this.handleInput}>
                    <div className='img_btn'>
                        <input ref={this.inputRef} id='profileImg' className="img-upload-btn" type='file' accept='image/*'/>
                        <label htmlFor='profileImg'>+</label> 
                    </div>
                </form>
                <div style={{textAlign: 'center'}}>
                    <Warning
                        warningMessage={this.props.warningMessage}
                    />
                </div>
                
                
                <AlertMessage 
                warningMessage={this.state.inputErrorMessage}
                clearMessage={this.clearMessage}
                />
            </div>
        )
    }
}

export default ImgTrail;