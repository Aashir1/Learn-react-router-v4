import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PoleName from './Home';
import AakQuestion from './Question';
import AllPoles from './previouspole';
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
                <Route exact path='/and/:poleName' component={AakQuestion} />
                <Route exact path='/previouspole' component={AllPoles} />
            </div>
        </Router>
    );
}

export default Routers;