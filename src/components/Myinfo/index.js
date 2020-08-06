import React, { Component } from 'react';
import Auth, { AuthContext } from '../AuthContext';
import Myinfo_nav from './Myinfo_nav';
import Myinfo_main from './Myinfo_main';
import Myinfo_common from './Myinfo_common';
import InfoFix from './InfoFix'

import '../../stylesheets/Myinfo/Myinfo.css'

class Myinfo extends Component {
    constructor() {
        super();
        this.state = {
            infoFix: false
        }
        this.handleInfoFix = this.handleInfoFix.bind(this)
        this.baseURL = 'https://storage.googleapis.com/delius-original/profile'
    }

    componentDidMount() {
        const newAuth = new Auth();
        newAuth.Auth_initialize().then(() => {
            this.context.setAuth(newAuth)
        })
    }

    handleInfoFix() {
        const prevInfoFix = this.state.infoFix;
        this.setState({infoFix: !prevInfoFix})
    }

    render() {
        const motive = ['동네친구 찾아요', '연애하고 싶어요', '삶이 지루해요', '미팅 하고 싶어요', '언어 교환해요', '혼자 밥먹기 싫어요', '취미 공유해요', '기타']
        const personality = ['재밌어요', '귀여워요', '로맨틱해요', '털털해요', '소심해요', '신중해요', '독특해요', '기타'];
        const interest = ['여행/소풍', '운동/스포츠관람', '미술/공예', '음악/악기', '영화/공연관람', '게임/오락', '요리/식도락', '기타'];
        const idealType = ['연상이 좋아요', '연하가 좋아요', '가까우면 좋겠어요', '거리는 상관없어요', '밝은사람이 좋아요', '생각이 건강하면 좋겠어요', '활동적인 사람이 좋아요', '정적인 사람이 좋아요']
        return (
            <AuthContext.Consumer>
                {value => {
                    const Metadata = value.Auth.Metadata
                    const User = value.Auth.User
                    if(Metadata.authStatus === '') {
                        return (
                            <div>
                            </div>
                        )
                    }
                
                    this.uid = Metadata.uid;
                    this.mainIm = User.im[0]? User.im[0] : null;
                    User.im.forEach(img => {
                        if (img.isMain === 'true' && img.tp > this.mainIm.tp) {
                            this.mainIm = img;
                        }
                    })
                    if(!this.state.infoFix) {
                        const messageText = '내정보 수정하기'
                        return (
                            <div>
                                <Myinfo_nav
                                    mainURL={`${this.baseURL}/${this.uid}/${this.mainIm.imgNa}`}
                                    handleInfoFix={this.handleInfoFix}
                                    messageText={messageText}
                                    history={this.props.history}
                                />
                                <Myinfo_main
                                    mainURL={`${this.baseURL}/${this.uid}/${this.mainIm.imgNa}`}
                                    job={User.job}
                                    st={User.st}
                                    ex={User.ex}
                                    info_1={motive[User.fo1]}
                                    info_2={personality[User.fo2]}
                                    info_3={interest[User.fo3]}
                                    info_4={idealType[User.fo4]}
                                />
                                <Myinfo_common />
                            </div>
                        )
                    }
                    else {
                        const messageText = '돌아가기'
                        return (
                            <div>
                                <Myinfo_nav
                                    mainURL={`${this.baseURL}/${this.uid}/${this.mainIm.imgNa}`}
                                    handleInfoFix={this.handleInfoFix}
                                    messageText={messageText}
                                    history={this.props.history}
                                />
                                <InfoFix
                                    handleInfoFix={this.handleInfoFix}
                                    history={this.props.history}
                                />
                            </div>
                            
                        )
                    }
                    
                }}
            </AuthContext.Consumer>
        )
    }
}

Myinfo.contextType = AuthContext;

export default Myinfo;