import React, {Component} from 'react'
import AlertImg from '../Myinfo/AlertImg'
import STAR from '../../images/high_icon/starYes.png'
import NOSTAR from '../../images/high_icon/starNo.png'

class ImgController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.changeProfile = this.changeProfile.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    

    changeProfile(e) {   
        this.props.setToProfile(parseInt(e.target.value))
    }

    deleteProfile(e) {
        this.props.deleteImg(parseInt(e.target.value))
    }

    handleToggle() {
        this.setState({toggle: !this.state.toggle})
    }

    render() {
        let starimg
        if(this.props.index === 0) {
            starimg = STAR;
        }
        else {
            starimg = NOSTAR;
        }
        if(this.props.mode === 'sign-up') {
            return (
                <div className="imgdiv">
                    <img src={this.props.src} className={this.props.classname} />
                    <img src={starimg} className="img-star" />
                    <button className="button-profile" value={this.props.index.toString()} onClick={this.changeProfile}></button>
                    <button className="button-delete" value={this.props.index.toString()} onClick={this.deleteProfile}></button>
                </div>
            )
        }
        else if(this.props.mode === 'info-fix') {
            return (
                <div className="web-img">
                    <div className='imgdiv'>
                        <img src={this.props.src} className={this.props.classname} onClick={this.handleToggle} />
                    </div>
                    <AlertImg
                        index={this.props.index}
                        src={this.props.src}
                        handleToggle={this.handleToggle}
                        toggle={this.state.toggle}
                        setToProfile={this.props.setToProfile}
                        deleteImg={this.props.deleteImg}
                    />
                </div>
            )
        }
    }
}

export default ImgController