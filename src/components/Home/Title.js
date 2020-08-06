import React, {Component} from 'react';
import HP_ICON from '../../images/high_quality/Delius-HP-ICON.png'
import YOUTUBE_ICON from '../../images/high_icon/youtubeLogoWhite.png'
import FACEBOOK_ICON from '../../images/high_icon/facebookLogoWhite.png'
import INSTAGRAM_ICON from '../../images/high_icon/instaLogoWhite.png'
import anime1 from '../../images/high_quality/deliusMainPage.jpg'
import anime2 from '../../images/high_quality/delius-2-1.jpg'
import Modal from '../Modal'
import deliusLogo from '../../images/high_icon/deliusLogoWhite.png';

import '../../stylesheets/Indicator/ani.css'
import wa, { WebIndicator } from '../../stylesheets/Indicator/Webindicator'

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            animeToggle: true,
            warningMessage: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleWarningMessage = this.handleWarningMessage.bind(this);
        this.clearWarningMessage = this.clearWarningMessage.bind(this);
    }

    toggleModal() {
        const prevIsClicked = this.state.isClicked;
        if(prevIsClicked) {
            document.body.style.overflow = 'auto'
        }
        else{
            document.body.style.overflow = 'hidden'
        }
        this.setState({isClicked:!prevIsClicked});
    }

    clearWarningMessage() {
        this.setState({warningMessage: ''})
        this.toggleModal();
    }

    handleWarningMessage() {
        this.setState({warningMessage: '서비스 준비중 입니다'})
    }

    componentDidMount() {
        // const titleSection = document.querySelector('.title')
        // titleSection.style.backgroundImage = `url(${anime1})`
        // this.animeTimer = setInterval(() => {
        //     const prevAnimeToggle = this.state.animeToggle
        //     if (prevAnimeToggle) {
        //         titleSection.style.backgroundImage = `url(${anime1})`
        //     }
        //     else {
        //         titleSection.style.backgroundImage = `url(${anime1})`
        //     }
        //     this.setState({ animeToggle: !prevAnimeToggle })
        // }, 10000)
        this.wa = wa
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
        // clearInterval(this.animeTimer);
    }

    render() {
        const isClicked = this.state.isClicked;
        let M;

        if (isClicked) {
            M = <Modal 
            setHomeStatus={this.props.setHomeStatus}
            toggleFunction={this.toggleModal}
            history={this.props.history}

            warningMessage={this.state.warningMessage}
            handleWarningMessage={this.handleWarningMessage}
            clearWarningMessage={this.clearWarningMessage}
            />;
        }
        else {
            M = null;
        }

        return (
            <section className='title'>
                    <div className="Main-navbar">
                        <div className="myTopnav topnav">
                            <div className="container">
                                <a><img src={deliusLogo} className="deliusLogo" /></a>
                                <a href="https://www.facebook.com/DELIUS-1399003440241319" className="menu"><img src={FACEBOOK_ICON} className="logo FBLogo" /></a>
                                <a href="https://www.instagram.com/delius_app/" className="menu"><img src={INSTAGRAM_ICON}className="logo"/></a>
                                <a href="" className="menu"><img src={YOUTUBE_ICON}className="logo"/></a>
                                <button className="loginButton" onClick={this.toggleModal}>로그인</button>
                            </div>
                        </div>

                    </div>
                    <div className='title-container'>
                        <h2 className="Regular-heading">친구와 함께하는 색다른 시간</h2>
                        <h2 className="Big-heading">딜리어스와 함께.</h2>
                        <h3 className="Small-heading">세계 최초 그룹 데이팅 앱</h3>

                        <button className="btn btn-outline-light btn-lg download-button"
                            onClick={this.toggleModal}>
                            <span>지금 시작하기 &nbsp;&nbsp;</span>
                        </button>
                    </div>
                    {M}
            </section>
        )
    }
}

export default Title;