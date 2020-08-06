import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HP_ICON from '../../images/high_quality/Delius-HP-ICON.png'
import '../../stylesheets/Policy/Policy.css'

class Privacy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openNav: false
        }
    }

    checkNav() {
        const prevOpenNav = this.state.openNav;
        if(prevOpenNav) {
            document.getElementById('mysidenav').style.width = '230px';
            document.getElementsByClassName('openmenu').display='block';
        }
        else{
            document.getElementById('mysidenav').style.width = '0';
        }
        this.setState({openNav: !prevOpenNav})
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
                    <a href="" className='closebtn'>x</a>
                    <a href="#">homepage</a>
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                </div>
                <div className='container' >
                    <span className='openmenu' ><i className='fa fa-angle-double-left fa-5' aria-hidden='true'>목차열기</i></span>
                    <div className='box'>
                        <div className='f-m'>Delius 개인정보 취급방침</div>
                        <div className='f-s mg-top-1'>
                        DELIUS Inc.(이하 ‘당사’)가 취급하는 모든 개인정보는 ‘개인정보 보호법’등 관련 법령에 근거하거나 정보주체의 동의에 의하여 
                        수집, 보유, 처리되고있습니다. 당사는 ‘개인정보 보호법’에 따라 이용자의 개인정보 보호 및 권익 보호와 개인정보 
                        관련한 DELIUS 서비스(이하 ‘본 서비스’)를 사용하는 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원할히 처리 할 수 있도록 \
                        다음과 같이 개인정보 처리지침을 수립·공개합니다. <br />개정하는 경우 홈페이지를 비롯한 어플리케이션 내 공지사항을 통하여 알려 드리겠습니다. 또한 당사는 이용자의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                        여러분의 개인정보의 이용 목적은 당사가 이용자의 더 나은 서비스를 제공하기 위해 활용하기 위함입니다.<br />
                        더 나은 서비스를 제공해 드리기 위해 최소한의 개인정보를 수집하고 있습니다. 회원 가입시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같은 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다. 수집하는 개인정보에 대하여 여러분의 동의를 받고 서비스를 제공하게 됩니다. <br />개인정보의 처리 목적 및 보유기간, 처리하는 개인 정보의 항목은 아래와 같습니다. 
                        </div><br /><br />
                        <div className="f-m">개인정보의 수집 및 처리 목적</div>
                        <div className="f-m">1. 회원관리를 위한 정보 수집 및 활용</div>
                        <div className="f-s mg-top-1">
                        회원 가입 의사 확인, 제한적 본인 확인제 시행에 따른 본인 인증, 개인 식별, 회원 자격 유지 관리, 다른 이용자와의 매칭 서비스의 등록. 또한, 서비스 부정이용 방지에 사용됩니다.<br />
                        <strong>DELIUS 서비스(필수)</strong> - 휴대폰 번호, 스마트폰 등 단말기 주소록 내 연락처 정보, 이용자의 이름과 생년월일, 실명인증(닉네임), 위치, 성별, 프로필 사진, 사용기기의 확인
                        <strong>DELIUS 서비스(선택)</strong> - 위치, 도시 기반 위치 정보, 선호하는 음식, 직업, 출신 학교, 종교, 흡연 및 음주 여부
                        </div><br /><br />
                        <div className="f-m">2. 서비스 제공에 따른 요금정산에 활용</div>
                        <div className="f-s mg-top-1">
                        각종 고지 및 통지, 서비스의 제공, 서비스 이용과 관련된 금전적 문의나 분쟁, 유료서비스 이용 시 콘텐츠 등의 전송이나 배송 및 요금 정산, 청구서 발송, 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 결제, 요금추심<br />
                        <br /><br />
                        </div>
                        <div className="f-m">3. 마케팅, 광고 이벤트등 신규 프로모션 알림 및 신규 서비스의 개발</div>
                        <div className="f-s mg-top-1">
                        이벤트 참여 의사를 확인하고 참여자에 대한 경품 배송 및 처리. 이 외에도 신규 서비스 개발 및 맞춤형 서비스 제공 및 유효성 확인, 기능 개선, 신규 이벤트나 광고성 정보의 제공 및 참여 기회 제공, 법령 등에 규정된 의무의 이행, 법령이나 이용약관에 반하여 여러분에게 피해를 줄 수 있는 행위의 방지<br /><br />
                        
                        </div>
                        <div className="f-m">수집한 개인정보의 위탁</div>
                        <div className="f-s mg-top-1">
                        1.	 Delius는 고객님의 동의없이 고객님의 정보를 외부 업체에 위탁하지 않습니다.<br />
                        2.   향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다.<br />
                        3.	여러분의 개인정보의 수집 및 이용목적이 달성되면 법령 또는 내부방침에 의해 보존할 필요가 있는 경우를 제외하고는 개인정보가 파기됩니다. 절차 및 방법은 다음과 같습니다.
                        &nbps; 3.1 보존 항목 : 계약 또는 청약철회 등에 관한 기록<br />
                        &nbps; - 근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                        &nbps; - 보존 기간: 5년 <br/>
                        &nbps; 3.2 보존 항목 : 대금결제 및 재화 등의 공급에 관한 기록<br />
                        &nbps; - 근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                        &nbps; - 보존 기간: 5년 <br/>
                        &nbps; 3.3 보존 항목 : 소비자의 불만 또는 분쟁처리에 관한 기록 <br />
                        &nbps; - 근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                        &nbps; - 보존 기간: 3년 <br/>
                        &nbps; 3.4 보존 항목 : 표시/광고에 관한 기록<br />
                        &nbps; - 근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                        &nbps; - 보존 기간: 6개월 <br/>
                        &nbps; 3.5 보존 항목 :세법이 규정하는 모든 거래에 관한 장부 및 증빙서류 <br />
                        &nbps; - 근거 법령: 국세기본법<br/>
                        &nbps; - 보존 기간: 5년 <br/>
                        &nbps; 3.6 보존 항목 : 전자금융 거래에 관한 기록<br />
                        &nbps; - 근거 법령: 전자금융거래법<br/>
                        &nbps; - 보존 기간: 5년 <br/>
                        &nbps; 3.7 보존 항목 : 웹사이트 방문 기록<br />
                        &nbps; - 근거 법령: 통신 비밀 보호법<br/>
                        &nbps; - 보존 기간: 3개월 <br/>
                       <br /><br />
                        </div>
                        <div className="f-m">DELIUS는 이용자의 주기적으로 개인정보의 갱신을 통해 개인정보가 최신의 상태로 유지될 수 있도록 확인하는 작업을 진행합니다.</div>
                        <div className="f-s mg-top-1">
                        부정확한 개인정보의 등록으로 인하여 이용자가 준수해야할 의무 각항을 위반하거나 성실히 수행하지 않은 회원이 발생할 수 있습니다. <br /> 
                        위의 경우 본 서비스를 이용하는 타 이용자에게 사용상의 불편을 줄 수 있으므로 관리자가 판단하기에 부정확한 개인정보를 기재한 경우에는 해당 개인정보를 파기하고 서비스의 이용을 일 시 중단할 수 있습니다. 또한, 원하지 않는 방법에 의하여 회사의 서비스가 훼손을 당하는 경우에는 해당 문제가 완전히 해결될 때까지 회원의 개인정보를 이용한 서비스를 일시 중단 할 수도 있습니다. 서비스의 이용자는 어플리케이션내 설정 버튼을 통해 개인이 등록한 개인정보를 조회하거나 수정할 수 있으며 개인정보 수집∙이용에 대한 동의 철회 또는 서비스의 가입 해지도 가능합니다. 
                        만 14세 미만의 어린이는 가입하기 전에 반드시 법정대리인의 동의가 필요합니다.<br /><br />
                        </div>
                        <div className="f-m">제 8조 (분쟁의 조정 및 기타)</div>
                        <div className="f-s mg-top-1">
                        당사는 위치정보와 관련된 분쟁의 해결을 위해 이용자와 성실히 협의합니다.<br /><br />
                        </div>
                        <div className="f-m">개인정보 관련 문의 및 불만 처리를 위해 아래와 같이 개인정관리책임자를 두고 있습니다. 기타 궁금하신 사항이 있다면 개인정보관리책임자 및 담당 부서로 연락해 주시기 바랍니다. </div><br />
                        <div className="f-s mg-top-1">
                        &nbps; [DELIUS 사내 정보관리책임자]<br />
                        &nbps; 이름: 김재승<br/>
                        &nbps; 메일: delius_pjh@delius-company.com <br/><br /><br />
                        </div>
                        <div className="f-m">개인정보 침해에 대한 신고 및 상담은 하단의 국가 기관에 문의할 수 있습니다. 개인정보 침해에 대한 피해구제, 상담등을 문의하실 수 있습니다. 본사의 피해 구제 결과에 만족하지 못하거나 자세한 상담이 필요하다면 하단의 기관에 문의하길 바랍니다.</div>
                        <div className="f-s mg-top-1">
                        &nbps; [개인정보 침해 신고센터(한국인터넷진흥원 운영)]<br />
                        &nbps; - 업무내용: 개인정보 침해사실 신고 및 상담 신청<br/>
                        &nbps; - 전화번호: 국번 없이 118 <br/><br />
                        &nbps; [경찰청 사이버안전국] <br />
                        &nbps; - 전화번호: 국번없이 182 <br />
                        <br /><br />
                        </div>
                        <div className="f-m">기타</div><br />
                        <div className="f-s mg-top-1">
                        본사는 법률의 개정이나 기타 서비스의 변경사항을 반영하기 위한 목적으로 개인정보 취급방침을 수정할 수 있습니다. 본 개인정보 취급방침은 2019년 6월 ?일부터 적용되며 개인정보 취급방침은 게시한 날로부터 7일 후부터 효력이 발생합니다. 
                        처리방침에 변경이 있을 경우  DELIUS는 변경 사항을 게시하며 이후에도 서비스를 계속 이용할시 변경된 방침에 동의하는 것으로 간주됩니다. <br />

                        &nbps; 공고일:2019년 5월 22일<br/>
                        &nbps; 시행일: 2019년 5월 27일<br/><br /><br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Privacy;