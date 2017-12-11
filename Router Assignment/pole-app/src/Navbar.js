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
            
            <ul className="nav nav-tabs">
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/previouspole">Previous Poles</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/pole-page">Pole Page</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar; 