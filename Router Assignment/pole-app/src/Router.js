import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PoleName from './App';
import AakQuestion from './Question';
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
                <PoleName />
                <Route  path='/:poleName' component={AakQuestion} />
            </div>
        </Router>
    );
}

export default Routers;