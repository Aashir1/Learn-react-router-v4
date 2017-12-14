import React from 'react';
import fire from '../firebase';

class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            poleNameAndKey : []
        };
        this.database = fire.database().ref('/pole-App');
    }
    componentWillMount(parameters) {
        // let database = fire.database().ref('/pole-App');
        this.database.on('child_added', snapshot => {
            let obj = {};
            let tempArray = this.state.poleNameAndKey;
            obj['name'] = snapshot.val().poleName;
            obj['key'] = snapshot.key;
            obj['options'] = snapshot.val().options;
            tempArray.push(obj);
            this.setState({
                // poleNameAndKey: [...this.state.poleNameAndKey, obj]
                poleNameAndKey : tempArray
            });
            // let obj = {};
            // obj['name'] = snapshot.val().poleName;
            // obj['key'] = snapshot.key;
            // obj['options'] = snapshot.val().options;
            // this.setState({
            //     // poleNameAndKey: [...this.state.poleNameAndKey, obj]
            // });
            console.log('poleNameAndKey: ', this.state.poleNameAndKey);
        })
    }

    render() {
        return (
            <div>{this.props.match.params.poleName}</div>
        )
    }
}


export default Question;