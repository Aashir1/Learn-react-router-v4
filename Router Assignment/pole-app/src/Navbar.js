import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';


const Navbar = () => {
    return (
        <div>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/previous-pols">Previous Poles</NavLink></li>
                <li><NavLink to="/pole-page">Pole Page</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar; 