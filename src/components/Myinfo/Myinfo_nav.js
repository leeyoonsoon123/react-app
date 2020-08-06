import React, { Component } from 'react'
import loginIMG from '../../images/high_icon/delius-logo.png';

class Myinfo_nav extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)        
    }

    async logout() {
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/user/logout'
        const response = await fetch(url,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'text/plain'
            },
            credentials: 'include'
        }).then(res => {
            return res.text();
        })
        if(response === 'LOGOUT_SUCCESS') {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <section className='myinfo-title'>
                <div className='Main-bar'>
                    <div className="container">
                        <a className='info-icon' href="" ><img src={loginIMG} id='info-icon' /></a>
                        <div className="nav-item btn-group dropdown">
                            <button type="button" className="dropdown-toggle" id="user-info" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false"><img src={this.props.mainURL} className='radius-user-img' /></button>
                            <div className="dropdown-menu">
                                <button type='button' className="dropdown-item" onClick={this.props.handleInfoFix}>{this.props.messageText}</button>
                                <button className="dropdown-item" onClick={this.logout}>로그아웃</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}




export default Myinfo_nav;