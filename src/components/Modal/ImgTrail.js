import React, {Component} from 'react'
import ImgController from './ImgController'
import Warning from './Warning'
const { v4: uuidv4 } = require('uuid')

class ImgTrail extends Component{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            uploadToggle: false,
            inputErrorMessage: '',
        }
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {
        
        // Add code block when number of image is more than 5
        const inputFile = e.target.files[0];
        if(!inputFile) {
            return true;
        }

        const inputFileType = inputFile.type
        const prevInputErrorMessage = this.state.inputErrorMessage;
        let nextInputErrorMessage = prevInputErrorMessage;

        if (!inputFileType.includes('image')) {
            nextInputErrorMessage = 'Not an image';
            this.setState({ inputErrorMessage: nextInputErrorMessage })
        }
        if (!inputFileType.includes('jpeg')) {
            nextInputErrorMessage = 'Image but not jpeg';
            this.setState({ inputErrorMessage: nextInputErrorMessage })
        }
        else {
            //When no error(MIME type: image/jpeg), this block is executing
            const fileReader_url = new FileReader();
            fileReader_url.readAsDataURL(inputFile);

            fileReader_url.onload = () => {
                console.log('URL load success')
                
                const imgFile = {};
                imgFile.name = inputFile.name;
                imgFile.src = fileReader_url.result;
                if(this.props.imgs.length === 0) {
                    imgFile.isMain = true;
                }
                else{
                    imgFile.isMain = false;
                }
                
                this.props.getImg(imgFile);
            }
            fileReader_url.onabort = () => {console.log('Load aborted')}
            fileReader_url.onerror = () => {console.log('Load error')}
            
            const fileReader_arrayBuf = new FileReader();
            fileReader_arrayBuf.readAsArrayBuffer(inputFile);

            fileReader_arrayBuf.onload = () => {
                const imgFile = {}
                imgFile.name = uuidv4();
                imgFile.data = fileReader_arrayBuf.result;
                if(this.props.imgT.length === 0) {
                    imgFile.isMain = true;
                }
                else{
                    imgFile.isMain = false;
                }
                imgFile.tp = Math.ceil(Date.now() / 1000);

                this.props.getImgT(imgFile)
            }
            fileReader_arrayBuf.onabort = () => {console.log('Load aborted')}
            fileReader_arrayBuf.onerror = () => {console.log('Load error')}

        }
    }

    render() {
        function makeImgList(props) {
            if(props.imgs.length > 0) {
                let counter = 0;
                const imgs = props.imgs.map((_img, i) => {
                    counter++;
                    return <ImgController
                            key={counter}
                            index={i}
                            setToProfile={props.setToProfile}
                            deleteImg={props.deleteImg}
                            src={_img.src}
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
                <div>
                    {I}
                </div>
                <form onInput={this.handleInput}>
                    <div className='img_btn'>
                        <input ref={this.inputRef} id='profileImg' type='file' accept='image/*'/>
                        <label htmlFor='profileImg'>+</label>        
                    </div>
                </form>
                <Warning 
                warningMessage={this.state.inputErrorMessage}
                />
            </div>
        )
    }
}

export default ImgTrail;