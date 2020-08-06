import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HP_ICON from '../../images/high_icon/delius-logo.png'
import '../../stylesheets/Policy/Policy.css'

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openNav: true,
            screen: {}
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
                document.getElementById('mysidenav').style.width = '30%';
            }

        }
        else{
            document.getElementById('mysidenav').style.width = '0';
        }
        this.setState({openNav: !prevOpenNav})
    } 

    componentDidMount() {
        this.setState({screen : window.matchMedia("screen and (max-width: 766px)")})
    }

    render() {
        return (
            <div>
            <div className='term-title'>
                <div className='Main-bar'>
                    <div className='container'>
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
                <div className='container' >
                    <div className='box'>
                <button className="contentOpen" onClick={this.checkNav}></button>
                        <div className='f-m'>제 1조 (목적)</div>
                        <div className='f-s mg-top-1'>
                        본 약관은 딜리어스(이하 “당사”)가 제공하는 위치기반서비스에 대해 회사와 위치기반서비스를 이용하는 개인위치정보주체(이하 “이용자”)간의 권리,의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다.
                        </div><br /><br />
                        <div className="f-m">제 2조 (이용약관의 효력 및 변경)</div>
                        <div className="f-s mg-top-1">
                        본 약관은 이용자가 본 약관에 동의하고 당사가 정한 절차에 따라 위치기반서비스를 이용함으로써 효력이 발생합니다.
                         회사는 법률이나 위치기반서비스의 변경사항을 반영하기 위해 약관을 수정할 수 있으며 이를 회사의 공지사항에 게시합니다. 약관에 중대한 변경이 발생하는 경우에는 변경 1주일 전에 게시합니다.
                        </div><br /><br />
                        <div className="f-m">제 3조 (서비스의 내용)</div>
                        <div className="f-s mg-top-1">
                        당사는 이용자로부터 수집한 이용자의 위치 또는 위치가 포함된 지역을 이용하여 다음과 같은 위치기반서비스를 제공합니다.
                        1.	다른 이용자들과의 물리적 거리를 계산하기 위하여 사용되며, 이는 프로필 열람 권한을 가진 이용자들에게 위치 정보를 포함한 콘텐츠로 제공됩니다.<br />
                        2.	당사는 적합한 콘텐츠를 제공하기 위하여 당사가 제공하는 서비스를 사용중인 이용자들의 위치 정보를 활용합니다.<br />
                        <br /><br />
                        귀하는 서비스 내의 설정을 통해 본인의 정보를 일부 수정할 수 있습니다. 단, 서비스의 제공 및 관리
                        를 위해 필요한 ID,단말기 식별번호 등 일부 정보는 수정이 불가할 수 있습니다.<br /><br />
                        </div>
                        <div className="f-m">제 4조 (서비스 이용요금)</div>
                        <div className="f-s mg-top-1">
                        당사는 이용자의 위치기반서비스에 별도의 요금을 부과하지 않습니다.<br /><br />
                        
                        </div>
                        <div className="f-m">제 5조 (이용자 위치 정보의 이용 또는 제공)</div>
                        <div className="f-s mg-top-1">
                        1.	당사는 개인위치정보를 이용하여 위치기반서비스를 제공하는 경우 본 약관에 고지하고 동의를 받습니다.<br />
                        2.	당사는 이용자의 개인위치정보를 제 3자에게 제공하지 않습니다.<br />
                        3.	당사는 이용자의 마지막 위치정보만 보관하며, 지속적으로 이용자의 위치정보를 기록하지 않습니다.

                       <br /><br />
                        </div>
                        <div className="f-m">제 6조 (손해배상)</div>
                        <div className="f-s mg-top-1">
                        당사는 이용자의 위치정보를 활용한 서비스를 제공하는 과정 중 당사의 고의 또는 과실에 의해 발생한 피해에 경우에만 당사와 손해배상 협의를 할 수 있으며, 
                        그 외에는 당사는 책임을 면할 수 있습니다.<br /><br />
                        </div>
                        <div className="f-m">제 8조 (분쟁의 조정 및 기타)</div>
                        <div className="f-s mg-top-1">
                        당사는 위치정보와 관련된 분쟁의 해결을 위해 이용자와 성실히 협의합니다.<br /><br />
                        </div>
                        <div className="f-m">부칙</div><br />
                        <div className="f-m">제 1조 (시행일)</div>
                        <div className="f-s mg-top-1">
                        본 약관은 2020년 00월 00일부터 시행됩니다.<br /><br />
                        </div>
                        <div className="f-m">제 2조 (위치정보관리책임자 정보) </div>
                        <div className="f-s mg-top-1">
                        이용자의 위치정보를 관리하는 책임자는 다음과 같습니다.<br />
                        -	이름 : 정윤환<br />
                        -	이메일 : delius-company.com<br /><br />
                        <br /><br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Location;
