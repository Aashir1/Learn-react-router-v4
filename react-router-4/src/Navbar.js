import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Link,
    NavLink
} from 'react-router-dom';

const Navbar = () => {
    let name = "aashir"
    return (
        <ul>
            <li><NavLink exact activeClassName="selected" to='/'>Home</NavLink></li>
            <li><NavLink activeClassName="selected" to={`/${name}`}>{name}</NavLink></li>
            <li><NavLink activeClassName="selected" to='/contact'>Contact</NavLink></li>
            <li><NavLink activeClassName="selected" to='/form'>Form</NavLink></li>

        </ul>
    );
}

export default Navbar;
