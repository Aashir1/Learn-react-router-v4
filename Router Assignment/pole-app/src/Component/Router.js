import React from 'react';
import Navbar from '../Navbar';
import Home from './Home';
import PoleName from './PolesName';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';


const PoleApp = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/previouspole" component={PoleName} />
            </div>
        </Router>
    );
}

export default PoleApp; 