import React, { Component } from 'react';

import Auth from '../AuthContext'
import Structure from '../Structure'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth: new Auth(),
            setAuth: (newAuth) => {this.setState({Auth: newAuth})}
        }
    }

    render() {
        return (
            <Structure 
            state={this.state}
            />
        )
    }
};

export default App;