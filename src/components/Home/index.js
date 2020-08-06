import React, {Component} from 'react';
import '../../stylesheets/Home/Home.css';
import Footer from './Footer'
import Title from './Title'
import Myinfo from '../Myinfo'
import { AuthContext } from '../AuthContext'

class Home extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.context.Auth.Auth_initialize().then(resObj => {
            if(resObj.uid !== '') {
                this.props.history.push(this.context.Auth.getUid())
            }
        })
    }

    render() {
        return (
            <div>
                <Title  
                history={this.props.history}
                />
                <Footer />
            </div>
        );
    }
}

Home.contextType = AuthContext


export default Home;