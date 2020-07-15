import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import '../../stylesheets/mainView.css';

import Home from '../Home';


function App() {
    return (
        <Home />
    )
};

export default App;