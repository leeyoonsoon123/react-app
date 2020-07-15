import React, {Component} from 'react'

class ImgController extends Component {
    constructor(props) {
        super(props);
    }
    // <button onClick={this.props.deleteImg.bind(this,this.props.index)}>삭제</button>
    render() {
        return (
            <div>
            <img src={this.props.src} className='thumbnail_img'></img>
            <button onClick={this.props.setToProfile.bind(this,this.props.index)}>프로필로 설정</button>
            <button onClick={() => console.log('삭제!')}>삭제</button>
            </div>
        )
    }
}

export default ImgController