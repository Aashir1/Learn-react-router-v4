import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import PoleName from './Home';
// import AakQuestion from './Question';
import Home from './Home';
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
                {/* <Navbar /> */}
                {/* <Route exact path='/' component={Home} /> */}
                {/* <Route exact path='/and/:poleName' component={AakQuestion} />
                <Route exact path='/previouspole' component={AllPoles} /> */}
            </div>
        </Router>
    );
}

export default Routers;