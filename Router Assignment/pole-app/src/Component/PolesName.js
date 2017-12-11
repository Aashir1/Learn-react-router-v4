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
            obj['name'] = snapshot.val().poleName;
            obj['key'] = snapshot.key;
            this.setState({
                poleNameAndKey: [...this.state.poleNameAndKey, obj]
            });
            console.log('poleNameAndKey: ', this.state.poleNameAndKey);
        })
    }
    deleteHandler = (datakey) =>{
        console.log('i am execute', datakey,this);

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
                                    <div>
                                        <ListItem key={obj.key} rightIcon={<DeleteIcon onClick={()=>{this.deleteHandler(obj.key)}} />} primaryText={<Link to="/previouspole/anotherOne" > {obj.name} </Link>} />
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