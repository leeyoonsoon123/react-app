import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HP_ICON from '../../images/high_icon/delius-logo.png'
import '../../stylesheets/Policy/Policy.css'

class QnA extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openNav: true,
            screen: {},
        }
        this.checkNav = this.checkNav.bind(this)
    }

    checkNav() {
        const prevOpenNav = this.state.openNav;
        if(prevOpenNav) {
            document.getElementsByClassName('openmenu').display='block';
            if(this.state.screen.matches){
                document.getElementById('mysidenav').style.width = '100%';
            }
            else{
                document.getElementById('mysidenav').style.width = '25%';
            }

        }
        else{
            document.getElementById('mysidenav').style.width = '0';
        }
        this.setState({openNav: !prevOpenNav})
    } 
    
    clickQ(e) {
        const questionNum = e.target.getAttribute('id')[1];
        const answerEle = document.getElementById(`A${questionNum}`);
        if(answerEle.style.display === 'none') {
            answerEle.style.display = 'block'
        }
        else if(answerEle.style.display === 'block') {
            answerEle.style.display = 'none'
        }
    }


    componentDidMount() {
        this.setState({screen : window.matchMedia("screen and (max-width: 766px)")})
        const answers = document.getElementsByClassName('A')
        for(let i = 0; i < answers.length; i++) {
            answers[i].style.display = 'none'
        }
    }

render(){
    return (
        <div>
            <div className="QnA-title">
                <div className="Main-bar">
                    <div className="container">
                        <Link to='/'><img src={HP_ICON} id='bar-icon' /></Link>
                    </div>
                </div>

            </div>
            <div id='mysidenav' className='sidenav' >
                    <button className="contentClose" onClick={this.checkNav}>X</button>
                    
                    <ul>
                        <li className="show-menu">
                            <div className="DeliusTab">DELIUS</div>
                            <ul className="hide-menu">
                                <li className="tab endline">-공지사항</li>
                            </ul>
                        </li>
                        <li className="show-menu">
                            <div className="DeliusTab">법적고지</div>
                            <ul className="hide-menu">
                                <li className="tab"><Link to='/policy/terms'>-서비스 이용약관</Link></li>
                                <li className="tab"><Link to='/policy/privacy'>-개인정보 취급 방침</Link></li>
                                <li className="tab endline"><Link to='/policy/location'>-위치서비스 이용약관</Link></li>
                            </ul>
                        </li>
                        <li className="show-menu">
                            <div className="DeliusTab">FAQ</div>
                            <ul className="hide-menu">
                                <li className="tab endline"><Link to='/policy/QnA'>-자주하는 질문</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            
            <div className="container">
                <div className="box">
                <button className="contentOpen" onClick={this.checkNav}></button>
                    <div className="t-l f-L fw-L">
                        Delius Guide
                    </div>
                    <div className="t-l f-m mg-bt-3">
                        고객님들께서 자주하시는 질문들을 정리하였습니다.
                    </div>
                    <div className="row-col justify-content-end">
                        <div className="cols">
                            <div className="M-title mg-bt-1">
                                Delius 이용
                            </div>
                            <div className="Q mg-bt-05" id="Q1" onClick={this.clickQ}>
                                라이크와 딜리는 어떻게 충전되나요?
                            </div>
                            <div className="A" id="A1" >
                                매일 충전되는 라이크와 딜리의 할당량을 모두 최초 소진 시점을 기준으로 24시간 후에 충전됩니다. 별도로 구매한 딜리의 개수와는 무관합니다.
                            </div>
                            <div className="Q mg-bt-05" id="Q3" onClick={this.clickQ}>
                                환불은 어떻게 받나요?   
                            </div>
                            <div className="A" id="A3" >
                                딜리어스가 제공하는 서비스 내에서 이루어진 구매들은 환불이 불가능합니다. 단, 관계자가 인정하는 예외의 상황이라면 환불 신청을 할 수 있으며 이는 delius@delius-company.com으로 문의해주십시오.
                            </div>
                            <div className="Q mg-bt-05" id="Q7" onClick={this.clickQ}>
                                홈화면에서 보이는 리스트에는 필터기능이 없나요? 
                            </div>
                            <div className="A" id="A7" >
                                홈화면 왼쪽 상단 메뉴에서 검색필터를 설정하시면 사용자에게 더욱 적합한 데이터를 제공합니다.
                            </div>
                            <div className="Q mg-bt-05" id="Q8" onClick={this.clickQ}>
                                부스터는 무엇인가요?    
                            </div>
                            <div className="A" id="A8" >
                                사용자의 위치를 고려하여 현재 접속해 있는 유저들에게 우선적으로 사용자의 프로필이 노출됩니다.   
                            </div>
                        </div>
                        <div className="cols">
                            <div className="M-title mg-bt-1">
                                계정관리
                            </div>
                            <div className="Q mg-bt-05" id="Q2" onClick={this.clickQ}>
                                제 정보를 잘못 입력했는데 어떻게 변경하나요?    
                            </div>
                            <div className="A" id="A2">
                                이름, 나이, 성별은 변경이 불가합니다. 단, 딜리어스 관계자가 인정하는 사유에 한해서는 변경이 가능하며 이는 delius@delius-company.com으로 문의해주십시오.
                            </div>
                            <div className="Q mg-bt-05" id="Q6" onClick={this.clickQ}>
                                탈퇴과정에 대해 알고 싶어요
                            </div>
                            <div className="A" id="A6">
                                사용자의 탈퇴와 함께 사용자의 데이터 활용,분석,배포는 즉시 중지됩니다. 다만, 이미 배포된 데이터를 완전히 삭제하는 것은 일정 시간을 소요합니다. 이 기간은 보장하기 위하여 탈퇴한 사용자의 가입은 탈퇴 시점을 기준으로 15일 이후부터 가능합니다.
                            </div>
                            <div className="Q mg-bt-05" id="Q9" onClick={this.clickQ}>
                                이용중지는 무엇인가요?
                            </div>
                            <div className="A" id="A9">
                                사용자의 데이터가 다른 유저들에게 배포되는 것을 중지합니다. 서비스 이용 중지를 해재하는 것은 언제든 가능합니다
                            </div>
                        </div>
                        <div className="cols">
                            <div className="M-title mg-bt-1">
                                사용자 차단
                            </div>
                            <div className="Q mg-bt-05" id="Q4" onClick={this.clickQ}>
                                앱 내에서 지인을 보거나 지인이 저를 볼 수 있는 상황을 피할 수 있나요?
                            </div>
                            <div className="A" id="A4">
                                홈 화면 왼쪽 상단 메뉴에서 ‘사용자 차단’ 기능을 사용하면, 사용자와 차단된 사용자는 서로 앱 내 서비스에서 서로에게 추천되지 않습니다.
                            </div>
                            <div className="Q mg-bt-05" id="Q5" onClick={this.clickQ}>
                                불쾌감을 주는 유저에 대해서는 어떻게 하나요?
                            </div>
                            <div className="A" id="A5">
                                모든 유저 또는 그룹 프로필 하단에는 다양한 상황에 대한 신고하기 기능이 준비되어있습니다. 
                            </div>   
                            
                        </div>
                        <div className="cols"></div>
                    </div>
                </div>
            </div>
        </div>

    )
    }
}

export default QnA;
