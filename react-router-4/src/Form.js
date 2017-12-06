import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Prompt
} from 'react-router-dom';

class Forms extends React.Component {
    state = {
        isChanged: false
    }

changeHandler = () => {
    this.setState({
        isChanged: true
    });
}
    render(){

        return (
            <div>
                <Prompt when={this.state.isChanged} message="are you sure you want to leave?"/>
                <input type="text" onChange={this.changeHandler} />
            </div>
        );
    }
}


export default Forms;