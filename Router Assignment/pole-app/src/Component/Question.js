import React from 'react';
import fire from '../firebase';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};
const style = {
    margin: 12,
};

class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            poleNameAndKey: [],
            radioGroup: [false, false, false, false],
            userSelectedOption : []
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
            obj['question'] = snapshot.val().question;
            obj['options'] = snapshot.val().options;
            obj['optionsPercentage'] = snapshot.val().optionsPercentage;
            tempArray.push(obj);
            this.setState({
                poleNameAndKey: tempArray
            });
            console.log(snapshot.val());
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
    handleRadio = (event) => {
        // let tempArray = this.state.radioGroup;
        // let tempPoleNameAndKey = this.state.poleNameAndKey; 
        // for (let i = 0; i < tempArray.length; i++) {
        //     if(event.target.value === tempPoleNameAndKey[3][i]){
        //         tempArray[i] = true;
        //     }
        //     else{
        //         tempArray[i] = false;
        //     }
        // }
        // this.setState({
        //     radioGroup: tempArray
        // })
        
        let tempArray = [];
        let tempObj = {};
        this.state.poleNameAndKey.map((obj) => {
            if (obj.name === this.props.match.params.poleName) {
                for (let i = 0; i < obj.options.length; i++) {
                    if (obj.options[i] === event.target.value) {
                        console.log(obj.options[i]);
                        tempObj[obj.options[i]] = 1;
                        
                    }
                    else {
                        tempObj[obj.options[i]] = 0;
                        
                    }
                }
            }
        })
        this.setState({
            userSelectedOption : tempObj
        });
        console.log(event.target.value);
        console.log(this.state.userSelectedOption);
        
    }
    submitScore = () =>{
        //ab mujhe data mangwa k validate karna hai and percentage calculate kar ka database m store karna hai
    }
    
    render() {
        console.log(this.state.userSelectedOption);
        // console.log(this.state.poleNameAndKey);
        return (
            <div>
                {
                    this.state.poleNameAndKey.map((obj) => {
                        return (
                            (obj.name === this.props.match.params.poleName) ?
                                <div>
                                    <h1>{obj.name}</h1>
                                    <h2>
                                        Question:
                                        <br />
                                        {obj.question}
                                    </h2>
                                    <div>
                                        <MuiThemeProvider>
                                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={(event) => { this.handleRadio(event) }}>
                                                {
                                                    obj.options.map((eachOption, i) => {
                                                        return (
                                                            <RadioButton
                                                                value={`${eachOption}`}
                                                                label={`${eachOption}`}
                                                                checked={this.state.radioGroup[i]}
                                                                //   onChange={(event) => { this.handleRadio(event, i) }}
                                                                style={styles.radioButton}
                                                            />
                                                            // <label>
                                                            //     <input type="radio"
                                                            //         name="radioGroup"
                                                            //         value={eachOption}
                                                            //         checked={this.state.radioGroup[i]}
                                                            //         onChange={(event) => { this.handleRadio(event, i) }}
                                                            //     />
                                                            //     {eachOption}
                                                            // </label>
                                                        )
                                                    })
                                                }
                                            </RadioButtonGroup>
                                            <RaisedButton label="Submit" onClick = {this.submitScore} secondary={true} style={style} />
                                        </MuiThemeProvider>

                                    </div>
                                </div> :
                                <div></div>
                        )


                    })



                }

                <div>{this.props.match.params.poleName}</div>
            </div>


        )
    }
}


export default Question;