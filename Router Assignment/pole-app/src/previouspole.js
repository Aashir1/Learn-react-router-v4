import fire from './firebase';
import firebase from 'firebase';
import React, {Component} from 'react';
class AllPoles extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        let database = fire.database().ref('/react-router-assignment');
        database.on('child_added',(snapshot) =>{
            console.log(snapshot.val(), snapshot.key);
        })
    }
    render(){
        return(
            <div>
                i Am render now
            </div>
        );
    }
}

export default AllPoles;