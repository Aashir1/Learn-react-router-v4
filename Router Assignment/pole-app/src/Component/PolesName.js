import React, { Component } from 'react';
import Navbar from '../Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import fire from '../firebase';
import MobileTearSheet from './MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import Divider from 'material-ui/Divider';
import EditDialog from './editDialog';
import Dialog from 'material-ui/Dialog';
import {TextField} from 'material-ui';
import Paper from 'material-ui/Paper';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

const optionStyle = {
    marginTop: '25px'
}
const styles={
    width: '30%',
    float: 'right',
    textAlign: 'right',
    position: 'relative',
    bottom: '4px'
}
const listWrapper ={
    marginLeft: '0px',
    padding: '16px 0px 16px 16px',
    position: 'relative'
}
const style = {
    marginLeft: 20,
};

class PoleName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poleNameAndKey: [],
            open: false,
            name: "",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            desireObjKey: ""
        }
        this.database = fire.database().ref('/pole-App');
    }

    componentWillMount() {
        // let database = fire.database().ref('/pole-App');
        this.database.on('child_added', snapshot => {
            console.log(snapshot.val());
            let obj = {};
            let tempArray = this.state.poleNameAndKey;
            obj['name'] = snapshot.val().poleName;
            obj['key'] = snapshot.key;
            obj['question'] = snapshot.val().question;
            obj['options'] = snapshot.val().options;
            tempArray.push(obj);
            this.setState({
                // poleNameAndKey: [...this.state.poleNameAndKey, obj]
                poleNameAndKey : tempArray
            });
            console.log('poleNameAndKey: ', this.state.poleNameAndKey);
        })
    }
    componentDidMount() {
        this.database.on('child_removed', snapshot => {
            this.state.poleNameAndKey.map(eachObj => {
                if (snapshot.key === eachObj.key) {
                    let tempArray = this.state.poleNameAndKey;
                    for (let i = 0; i < tempArray.length; i++) {
                        if (tempArray[i].key === snapshot.key) {
                            tempArray.splice(i, 1);
                        }
                    }
                    this.setState({
                        poleNameAndKey: tempArray
                    })
                }
            })
        })
    }
    deleteHandler = (datakey) => {
        console.log('i am execute', datakey, this);
        this.database.child(datakey).remove();
    }
    edit(key){
        console.log('edit is pressed and key is ' + key);
        let tempObj = this.state.poleNameAndKey;
        tempObj.map((eachObj)=>{
            console.log(eachObj);
            if(key === eachObj.key){

                console.log(eachObj.options);
                this.setState({
                    desireObjKey: eachObj.key,
                    open:true,
                    poleName: eachObj.name,
                    question: eachObj.question,
                    optionA: eachObj.options[0],
                    optionB: eachObj.options[1],
                    optionC: eachObj.options[2],
                    optionD: eachObj.options[3]//yahan sy kam start karna hai after break fast
                });
            }
        })
    }
    updateStates = (event, states)=>{
        let obj = {};
        
        obj[states] = event.target.value;
        console.log(event.target.value);
        this.setState(obj); 
    } 
    updatePole = () =>{
        let key = this.state.desireObjKey;
        let obj = {
            poleName: this.state.name,
            question: this.state.question,
            options: [this.state.optionA.trim(), this.state.optionB.trim(), this.state.optionC.trim(), this.state.optionD.trim()],
            // options: [{a:this.state.a, vote: 0}, {b:this.state.b, vote: 0}, {c:this.state.c, vote: 0}, {d:this.state.d, vote: 0}],
            optionsPercentage: 0
        }
        obj['options'].sort();
        if (obj.options.indexOf("") === -1  && obj.name.trim() !== "" && obj.question.trim() !== "") {
            fire.database().ref('/'+ key).set(obj);
        }

    }
    render() {
        return (
            <MuiThemeProvider>
                <h1>Poles Name</h1>
                <MobileTearSheet>
                    <List>
                        {
                            this.state.poleNameAndKey.map((obj) => {
                                return (
                                    <div key={obj.key} >
                                        <ListItem 
                                            key={obj.key} 
                                            rightIcon={<Icons 
                                                handleClose={()=>this.setState({open:false})} 
                                                open= {this.state.open}
                                                changeValue={(event, states)=>{this.updateStates(event, states)}}
                                                poleNameValue={this.state.poleName}
                                                questionValue={this.state.question}
                                                optionAValue={this.state.optionA}
                                                optionBValue={this.state.optionB}
                                                optionCValue={this.state.optionC}
                                                optionDValue={this.state.optionD}
                                                updatePole = {this.state.updatePole}
                                                handleOpen={this.edit.bind(this,obj.key)} 
                                                deleteonClick={() => { this.deleteHandler(obj.key) }} />} 
                                            primaryText={<Link to={`/previouspole/${obj.name}`} > {obj.name} </Link>} />
                                        {/* <ListItem button component={Divider} to='/previouspole/ll'>{obj.name}</ListItem> */}
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </List>
                    <EditDialog />
                </MobileTearSheet>
            </MuiThemeProvider>
        )
    }
}
const Icons = (props) =>{
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={props.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onClick={props.updatePole}
        />,
      ];
    return(
        <div style={{
    
    width: '30%',
    float: 'right',
    textAlign: 'right',
    position: 'relative',
    bottom: '4px'
}}>
        {/* <span>
          <EditIcon onClick = {props.editonClick} />
        </span> */}
        <span>
        <DeleteIcon onClick = {props.deleteonClick} />
        </span>
        <span>
          <EditIcon onClick={props.handleOpen} />
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={true}
            open={props.open}
          >
            <TextField
                hintText="Hint Text"
                floatingLabelText="Floating Label Text"
                value={props.poleNameValue}
                onChange={(event)=>{props.changeValue(event,'poleName')}}
            />
            <TextField
                hintText=""
                floatingLabelText="Question"
                value={props.questionValue}                
                onChange={(event)=>{props.changeValue(event,'question')}}                
                fullWidth={true}
                multiLine={true}
                rows={2}
                rowsMax={4}
            />
            <Paper zDepth={2} style={optionStyle}>
                <TextField 
                    hintText="Enter Option A"
                    value={props.optionAValue}                
                    onChange={(event)=>{props.changeValue(event,'optionA')}}                      
                    style={style} 
                    underlineShow={false} />
                <Divider />
                <TextField 
                    hintText="Enter Option B"
                    value={props.optionBValue}                     
                    onChange={(event)=>{props.changeValue(event,'optionB')}}               
                    style={style} 
                    underlineShow={false} />
                <Divider />
                <TextField
                    hintText="Enter Option C"
                    value={props.optionCValue}                                         
                    onChange={(event)=>{props.changeValue(event,'optionC')}}                                          
                    style={style}
                    underlineShow={false} />
                <Divider />
                <TextField 
                    hintText="Enter Option D"
                    value={props.optionDValue}                                          
                    onChange={(event)=>{props.changeValue(event,'optionD')}}                                          
                    style={style} 
                    underlineShow={false} />
                <Divider />
            </Paper>
          </Dialog>
        </span>
            
        </div>
    );
}

export default PoleName;