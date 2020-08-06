import React, {Component} from 'react';
import '../../stylesheets/Modal/TOS.css'

class TOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check_all: false,
            check_1: false,
            check_2: false,
            check_3: false,
        }
        this.check_all = this.check_all.bind(this)
        this.check_1 = this.check_1.bind(this)
        this.check_2 = this.check_2.bind(this)
        this.check_3 = this.check_3.bind(this)
        this.isAllChecked = this.isAllChecked.bind(this)
    }

    check_all() {
        let check_all = !this.state.check_all;
        let check_1, check_2, check_3;
        if (check_all) {
            check_all = true;
            check_1 = true;
            check_2 = true;
            check_3 = true;
        }

        else {
            check_all = false;
            check_1 = false;
            check_2 = false;
            check_3 = false;
        }

        this.setState({
            check_all: check_all,
            check_1: check_1,
            check_2: check_2,
            check_3: check_3
        })
    }

    check_1() {
        const check_1 = !this.state.check_1;
        const check_2 = this.state.check_2;
        const check_3 = this.state.check_3;
        let check_all;
        if(check_1 && check_2 && check_3) {
            check_all = true;
        }
        else {
            check_all = false;
        }
        this.setState({
            check_all: check_all,
            check_1: check_1
        })
    }

    check_2() {
        const check_1 = this.state.check_1;
        const check_2 = !this.state.check_2;
        const check_3 = this.state.check_3;
        let check_all;
        if(check_1 && check_2 && check_3) {
            check_all = true;
        }
        else {
            check_all = false;
        }
        this.setState({
            check_all: check_all,
            check_2: check_2
        })
    }

    check_3() {
        const check_1 = this.state.check_1;
        const check_2 = this.state.check_2;
        const check_3 = !this.state.check_3;
        let check_all;
        if(check_1 && check_2 && check_3) {
            check_all = true;
        }
        else {
            check_all = false;
        }
        this.setState({
            check_all: check_all,
            check_3: check_3
        })
    }

    isAllChecked() {
        if(this.state.check_1 && this.state.check_2 && this.state.check_3) {
            this.props.changeStep('PhoneProvider')
        }
        else {
            console.log('Please check all the boxes')
        }
    }
    
    render() {
        return(
            <div className='popup'>
                <button className="close" onClick={this.props.toggleFunction}>&times;</button>
                <div className='content'>
                    <div className='box-all'>
                        <p>가입전 약관동의가 필요합니다.</p>
                        <div className='bbb'>
                            <div className='agree-box'>전체동의</div>
                            <input type='checkbox' id='box-all' checked={this.state.check_all} onChange={this.check_all}/>
                            <label htmlFor='box-all'></label>
                        </div>
                    </div>
                    <hr className='signUp-hr'/>
                    <div className='boxes'>
                        <div className='No1'>
                            <p className="pp">약관 1번항목</p>
                            <div className='aaa'>
                                <div className='agree-box'>동의</div>
                                <input type='checkbox' id='box-1' checked={this.state.check_1} onChange={this.check_1}/>
                                <label htmlFor='box-1'></label>                                
                            </div>
                        </div>
                        <div className='No1'>
                            <p className="pp">약관 2번항목</p>
                            <div className='aaa'>
                                <div className='agree-box'>동의</div>
                                
                                <input type='checkbox' id='box-2' checked={this.state.check_2} onChange={this.check_2}/>
                                <label htmlFor='box-2'></label>
                            </div>
                        </div>
                        <div className='No1'>
                            <p className="pp">약관 3번항목</p>
                            <div className='aaa'>
                                <div className='agree-box'>동의</div>
            
                                <input type='checkbox' id='box-3' checked={this.state.check_3} onChange={this.check_3}/>
                                <label htmlFor='box-3'></label>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className='signUp_downward'>
                        <button type='button' className='next' onClick={this.isAllChecked}>다음</button>
                        <br />
                        <h6>1/5</h6>
                    </div>
            </div>
        );
    }
}

export default TOS;