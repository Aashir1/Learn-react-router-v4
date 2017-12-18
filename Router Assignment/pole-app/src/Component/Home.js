import React from 'react';
import Navbar from '../Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import fire from '../firebase';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';

const style = {
    marginLeft: 20,
};
const mainBoundry = {
    width: '60%',
    margin: '40px auto'
};
const nameStyle = {
    width: '100%'
}
const text = {
    color: '#9E9E9E',
    fontWeight: '700',
    textDecoration: 'underline'
}
const optionStyle = {
    marginTop: '25px'
}

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            poleName: '',
            question: '',
            a: '',
            b: '',
            c: '',
            d: ''
        }
    }

    poleNameHandler = (event) => {
        this.setState({ poleName: event.target.value })
        console.log(event.target.value)
    }
    questionHandler = (event) => {
        this.setState({ question: event.target.value })
        console.log(event.target.value)
    }
    aHandler = (event) => {
        this.setState({ a: event.target.value })
        console.log(event.target.value)
    }
    bHandler = (event) => {
        this.setState({ b: event.target.value })
        console.log(event.target.value)
    }
    cHandler = (event) => {
        this.setState({ c: event.target.value })
        console.log(event.target.value)
    }
    dHandler = (event) => {
        this.setState({ d: event.target.value })
        console.log(event.target.value)
    }
    submit = () => {
        let obj = {
            poleName: this.state.poleName,
            question: this.state.question,
            options: [this.state.a, this.state.b, this.state.c, this.state.d],
            // options: [{a:this.state.a, vote: 0}, {b:this.state.b, vote: 0}, {c:this.state.c, vote: 0}, {d:this.state.d, vote: 0}],            
            optionsPercentage: 0
        }
        obj['options'].sort();
        let database = fire.database().ref('/pole-App/' + this.state.poleName);
        if (obj.options.indexOf("") === -1 && obj.poleName && obj.question) {

            database.set(obj);
            console.log("data is submitted")
        }
        else {

        }
        this.setState({
            poleName: '',
            question: '',
            a: '',
            b: '',
            c: '',
            d: ''
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={mainBoundry}>
                    <span style={text}> </span>
                    <TextField
                        value={this.state.poleName}
                        onChange={this.poleNameHandler}
                        style={nameStyle}
                        hintText="Pole Name"
                        floatingLabelText="Enter Pole Name"
                    /><br />
                    <span style={text}> </span>
                    <TextField
                        hintText=""
                        value={this.state.question}
                        floatingLabelText="Question"
                        onChange={this.questionHandler}
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                    /><br />
                    <span style={text}> </span>
                    <Paper zDepth={2} style={optionStyle}>
                        <TextField value={this.state.a}
                            onChange={this.aHandler} hintText="Enter Option A" style={style} underlineShow={false} />
                        <Divider />
                        <TextField value={this.state.b}
                            onChange={this.bHandler} hintText="Enter Option B" style={style} underlineShow={false} />
                        <Divider />
                        <TextField value={this.state.c}
                            onChange={this.cHandler} hintText="Enter Option C" style={style} underlineShow={false} />
                        <Divider />
                        <TextField value={this.state.d}
                            onChange={this.dHandler} hintText="Enter Option D" style={style} underlineShow={false} />
                        <Divider />
                    </Paper>
                    <br />
                    <RaisedButton label="Submit" primary={true} fullWidth={true} onClick={this.submit} />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default Home;