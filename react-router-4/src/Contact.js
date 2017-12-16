import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';

const Contact = () =>{
    return(
        <div>
            <h1>Contact Page</h1>
            <li><NavLink to = "/contact/home1">Home 1</NavLink></li>
            <li><NavLink to="/contact/home2">Home 2</NavLink></li>
            <Route path = "/contact/:pics"  component={ContentsChild}/>
        </div>
    );  
}
const ContentsChild = (props)=>{
    return(
        <div>
            {props.match.params.pics}
        </div>
    );
};
export default Contact;