import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PoleName from './Home';
import AakQuestion from './Question';
import Navbar from './Navbar';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';


const Routers = () => {

    return (
        <Router>
            <div>
                <Navbar />
                <Route exact path='/' component={PoleName} />
                <Route  path='/:poleName' component={AakQuestion} />
            </div>
        </Router>
    );
}

export default Routers;