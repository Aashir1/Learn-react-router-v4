import React, { Component } from 'react';
import Navbar from '../Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import fire from '../firebase';
import MobileTearSheet from './MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
class PoleName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poleNameAndKey: []
        }
        this.database = fire.database().ref('/pole-App');
    }

    componentWillMount() {
        // let database = fire.database().ref('/pole-App');
        this.database.on('child_added', snapshot => {
            let obj = {};
            let tempArray = this.state.poleNameAndKey;
            obj['name'] = snapshot.val().poleName;
            obj['key'] = snapshot.key;
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
    render() {
        return (
            <MuiThemeProvider>
                <h1>Poles Name</h1>
                <MobileTearSheet>
                    <List>
                        {
                            this.state.poleNameAndKey.map((obj) => {
                                return (
                                    <div key={obj.key}>
                                        <ListItem key={obj.key} rightIcon={<DeleteIcon onClick={() => { this.deleteHandler(obj.key) }} />} primaryText={<Link to={`/previouspole/${obj.name}`} > {obj.name} </Link>} />
                                        {/* <ListItem button component={Divider} to='/previouspole/ll'>{obj.name}</ListItem> */}
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </List>
                </MobileTearSheet>
            </MuiThemeProvider>
        )
    }
}

export default PoleName;