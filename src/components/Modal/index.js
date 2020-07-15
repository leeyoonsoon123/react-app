import React, {Component} from 'react';
import Main from './Main'
import EmailLogin from './EmailLogin'
import TOS from './TOS'
import PhoneProvider from './PhoneProvider'
import EmailProvider from './EmailProvider'
import SetProfile from './SetProfile'
import Welcome from './Welcome'


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state={
            step: 'Main',
            uid: ''
        }
        this.signIn = this.signIn.bind(this)
        this.emailPasswordFind = this.emailPasswordFind.bind(this)
        this.signInFail = this.signInFail.bind(this)
        
        this.signUp_phone = this.signUp_phone.bind(this)
        this.signUp_email = this.signUp_email.bind(this)
        this.signUp_profile = this.signUp_profile.bind(this)

        this.changeStep = this.changeStep.bind(this)
        this.setUid = this.setUid.bind(this)
    }

    changeStep(step) {
        this.setState({step: step})
    }

    signUp_phone() {
        this.setState({step: 'SignUp_phone'})
    }

    signUp_email() {
        this.setState({step: 'SignUp_email'})
    }

    signUp_profile() {
        this.setState({step: 'SignUp_profile'})
    }

    signIn() {
        this.setState({step: 'SignIn'});
    }

    signInFail() {
        this.setState({step: 'SignInFail'})
    }

    emailPasswordFind() {
        this.setState({step: 'EmailPasswordFind'})
    }

    setUid(uid) {
        this.setState({uid: uid})
    }

    render() {
        const step = this.state.step;
        switch(step) {
            case 'Main':
                return (
                    <div className="mod">
                        <Main 
                        toggleFunction={this.props.toggleFunction}
                        changeStep={this.changeStep}
                        />
                    </div>
                );
            
            case 'EmailLogin':
                return (
                    <div className="mod">
                        <EmailLogin 
                        toggleFunction={this.props.toggleFunction}
                        signIn={this.signIn}
                        signInFail={this.signInFail}
                        emailPasswordFind={this.emailPasswordFind}
                        changeStep={this.changeStep}
                        />
                    </div>
                );
            
            case 'SignIn':
                return (
                    <h1 style={{color: 'black'}}>Login success!</h1>
                );
            
            case 'SignInFail':
                return (
                    <h1 style={{color: 'black'}}>Login Fail</h1>
                );

            case 'SignUp_TOS':
                return (
                    <div className='mod'>
                        <TOS 
                        toggleFunction = {this.props.toggleFunction}
                        changeStep={this.changeStep}
                        />
                    </div>
                );

            case 'PhoneProvider':
                return (
                    <div className='mod'>
                        <PhoneProvider 
                        toggleFunction={this.props.toggleFunction}
                        changeStep={this.changeStep}
                        setUid={this.setUid}
                        />
                    </div>
                );
            case 'EmailProvider':
                return (
                    <div className='mod'>
                        <EmailProvider
                        toggleFunction={this.props.toggleFunction}
                        changeStep={this.changeStep}
                        uid={this.state.uid}
                        />
                    </div>
                );
            
            case 'SetProfile':
                return (
                    <div className='mod'>
                        <SetProfile 
                        toggleFunction={this.props.toggleFunction}
                        changeStep={this.changeStep}
                        uid={this.state.uid}
                        />
                    </div>
                )

            case 'SignUp_email':
                return (
                    <h1 style={{color: 'black'}}>Email verification</h1>
                );
            

            case 'SignUp_profile' :
                return (
                    <h1 style={{color: 'black'}}>SignUp_profile</h1>
                );

            case 'Welcome' :
                return (
                    <div className='mod'>
                        <Welcome 
                        toggleFunction={this.props.toggleFunction}
                        changeStep={this.changeStep}
                        />
                    </div>
                )
        }
    }
}

export default Modal;