import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

import Home from '../Home';
import Terms from '../Policy/Terms'
import Privacy from '../Policy/Privacy'
import Location from '../Policy/Location'
import QnA from '../Policy/QnA'
import Myinfo from '../Myinfo'


import { AuthContext } from '../AuthContext'

class Structure extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <AuthContext.Provider value={this.props.state}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/:uid' component={Myinfo} />
                        <Route exact path='/policy/terms' component={Terms} />
                        <Route exact path='/policy/privacy'>
                            <Privacy />
                        </Route>
                        <Route path='/policy/location'>
                            <Location />
                        </Route>
                        <Route path='/policy/QnA'>
                            <QnA />
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default Structure;
