import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Link 
} from 'react-router-dom'
import appstore from '../../images/high_quality/appstore.png'
import googleplay from '../../images/high_quality/googleplay.png'
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div>
                <img src={appstore} className="download-logo"></img><img src={googleplay} className="download-logo"></img>
                </div>
                <hr />
                <p>저희 딜리어스는 건전함을 추구하는 다이닝 디스커버리앱이며, 앱내 부적절한 행동은 법적으로 처벌 받을 수 있습니다.</p>
                <ul className="copyright">
                    <li><Link to='/policy/terms'>서비스 이용약관</Link></li>
                    <li><Link to='/policy/privacy'>개인정보 취급 방침</Link></li>
                    <li><Link to='/policy/location'>위치서비스 이용약관</Link></li>
                    <li><Link to='/policy/QnA'>자주하는 질문</Link></li>
                </ul>
                <p>Copyright © Delius. All rights reserved.</p>

            </footer>
        )
    }
}




export default Footer;
