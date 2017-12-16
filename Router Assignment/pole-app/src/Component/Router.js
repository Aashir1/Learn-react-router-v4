import React from 'react';
import Navbar from '../Navbar';
import Home from './Home';
import PoleName from './PolesName';
import Question from './Question';
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
                <Route exact path="/previouspole" component={PoleName} />
                <Route exact path="/previouspole/:poleName" component={Question} />
            </div>
        </Router>
    );
}

export default PoleApp; 