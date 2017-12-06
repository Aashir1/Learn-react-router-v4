import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Navbar from './Navbar';
import Forms from './Form';
import Nothing from './NotFound';



const Routers = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <hr />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/form" component={Forms} />
                    
                    {/* <Route path="/:extraPath" component={getURLParam}/> */}
                    {/* <Route component={Nothing} /> */}
                </Switch>
            </div>
        </Router>
    )
}

const getURLParam = ({match, history}) =>{
    
    let execute = ()=> {
        console.log('function is executed', this.props);
        history.push('/');
        console.log('match.url', match.url);
        console.log('match.path', match.path);
        
        
    }


    return(
           <div>
               You Entered{`: ${match.params.extraPath}`}
               <button onClick = {()=>{execute();}}>Click Me</button>
           </div> 
        );
    }

export default Routers;