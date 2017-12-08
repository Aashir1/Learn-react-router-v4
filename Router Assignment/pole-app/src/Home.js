import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

class PoleName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poleName: "",
      showPoleName: false
    }
  }
  updatePoleName = (event) => {
    this.setState({
      poleName: event.target.value
    });
  }
  buttonHandler = () => {
    if (this.state.poleName) {
      console.log(this.state.poleName);
      this.setState({ poleName: "", showPoleName: true });
    }
  }
  render() {
    return (
      <div>

        <br />
        {
          this.state.showPoleName ?
            <div></div>
            :
            <div>
              <label>
                Enter Pole Name:
              <input type="text" placeholder="Enter Pole name" value={this.state.poleName} onChange={this.updatePoleName} />
              </label>
              <button onClick={this.buttonHandler}>
                <NavLink to={`/${this.state.poleName}`}>Create Pole</NavLink>
              </button>
            </div>
        }
      </div>
    );
  }
}
export default PoleName;