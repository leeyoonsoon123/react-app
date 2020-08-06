import React, { Component } from 'react';
import IMG1 from '../../images/high_quality/mainP-1 (1).jpg'
import IMG2 from '../../images/high_quality/mainP-1 (2).jpg'
import IMG3 from '../../images/high_quality/mainP-1 (3).jpg'
import IMG4 from '../../images/high_quality/mainP-1 (4).jpg'

class Myinfo_common extends Component {
    render() {
        return (
            <section className='pic-sec'>
                <div className='container'>
                    <div className='pic-col'>
                        <div className='pic r-mg'>
                            <img src={IMG1} />
                        </div>
                        <div className='pic B'>
                            <img src={IMG2} />
                        </div>
                        <div className='pic r-mg'>
                            <img src={IMG3} />
                        </div>
                        <div className='pic D'>
                            <img src={IMG4} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Myinfo_common;