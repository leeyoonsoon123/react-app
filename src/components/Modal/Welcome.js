import React, {Component} from 'react';
import mainLogo from '../../images/high_quality/main-delius.jpg'

class Welcome extends Component{
    constructor(props) {
        super(props)
        this.clickNext = this.clickNext.bind(this);
    }

    clickNext() {
        this.props.toggleFunction();
    }

    render() {
        return (
            <div className='popup'>
                <div className='welcome'>
                    <h3>Welcome to Delius</h3>
                    <img src={mainLogo} className='delius-mainImg1' width='50%' />
                    <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                    <h3>딜리어스에 오신 것을 환영합니다</h3>
                    <br />
                    <br />
                    <br />
                </div>
                <div className='signUp-downward'>
                    <button type='button' className='button-signUp' onClick={this.clickNext}>딜리어스 시작하기</button>
                </div>
            </div>
        )
    }
}

export default Welcome;