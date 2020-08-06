import React, { Component } from 'react';
import { AuthContext } from '../AuthContext'

class Myinfo_main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <div className='container'>
                    <div className='info-box'>
                        <div className='row'>
                            <div className='col-3 img-in'>
                                <img src={this.props.mainURL} className='radius-user-img-in' />
                            </div>
                            <div className="col-1"></div>
                            <div className='col-7 b-mg'>
                                <div className='info'>
                                <div className='info-nm'>{this.context.Auth.User.na},&nbsp;&nbsp;{this.context.Auth.User.age}
                                </div>
                                </div>
                                <div className='info-2'>
                                    <div className='info-T'>{this.props.st}</div>
                                </div>
                                <div className='info'>
                                    <div className='userSelc Job'>{this.props.job}</div>
                                    <div className='userSelc Some'>{this.props.info_1}</div>
                                    <div className='userSelc Some'>{this.props.info_2}</div>
                                    <div className='userSelc Some'>{this.props.info_3}</div>
                                    <div className='userSelc Some'>{this.props.info_4}</div>
                                </div>
                                
                            </div>
                            <div className="col-1"></div>
                           
                        </div>

                        <div className='row'>
                            <div className='col-3'></div>
                            <div className="col-1"></div>
                            <div className='col-8'>{this.props.ex}</div>
                        </div>
                    </div>
                    <div className='middle-line'>OPEN EVENT</div>
                </div>
            </section>
            
        )
    }
}

Myinfo_main.contextType = AuthContext;

export default Myinfo_main;