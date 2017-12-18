import React from 'react';
import fire from '../firebase';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgressbar from 'react-circular-progressbar';

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
            userSelectedOption : [],
            desiredObj: {},
            optionsPercentages: [],
        };
        this.database = fire.database().ref('/pole-App');
        this.database.on('child_added', snapshot => {
            let obj = {};
            let tempArray = this.state.poleNameAndKey;
            obj['poleName'] = snapshot.val().poleName;
            obj['key'] = snapshot.key;
            obj['question'] = snapshot.val().question;
            obj['options'] = snapshot.val().options;
            obj['optionsPercentage'] = snapshot.val().optionsPercentage;
            tempArray.push(obj);
            this.setState({
                poleNameAndKey: tempArray
            });
        })
    }
    componentWillMount(parameters) {
        console.log('componentWillMount',this.state.poleNameAndKey)
        let that = this;
                
                    fire.database().ref('/pole-App/' + this.props.match.params.poleName).once('value', (snapshot)=>{
                    })
                        .then((success)=>{
                            let data = success.val().optionsPercentage, total = 0, percentageObj= [],percentage= 0;

                            for(let i in data){
                                total += data[i]; 
                            }
                            for(let i in data){
                                percentage = Math.round((data[i]/total) * 100)
                                percentageObj.push({i:percentage});
                            }
                            if(total !== 0){
                                this.setState({
                                    optionsPercentages: percentageObj
                                })
                            }
                        })
                        .catch(error=>console.log(error))
                 
            
    }
    componentDidMount(){
        fire.database().ref('/pole-App/' + this.props.match.params.poleName).on('child_changed', (snapshot)=>{
            let data = snapshot.val(),percentageObj = [], total = 0, percentage= 0;
            for(let i in data){
                total += data[i]; 
            }
            for(let i in data){
                percentage = Math.round((data[i]/total) * 100)
                percentageObj.push({i:percentage});
            }
            this.setState({
                optionsPercentages: percentageObj
            })
        })
    }
    handleRadio = (event) => {
        let tempArray = [];
        let tempObj = {};
        this.state.poleNameAndKey.map((obj) => {
            if (obj.poleName === this.props.match.params.poleName) {
                this.setState({
                    desiredObj:obj
                })
                for (let i = 0; i < obj.options.length; i++) {
                    if (obj.options[i] === event.target.value) {
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
    }
    submitScore = () =>{
        let desiredObjClone = this.state.desiredObj;
        let selected = this.state.userSelectedOption;
        if(desiredObjClone !== {}){
            for (let i in selected) {
                if(selected[i] === 1){
                    if(desiredObjClone['optionsPercentage'] === 0){
                        desiredObjClone['optionsPercentage'] = selected;
                    }
                    else{
                        try {
                            desiredObjClone['optionsPercentage'][i] += 1; 
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }           
            }
            fire.database().ref('/pole-App/' + desiredObjClone['key']).set(desiredObjClone);    
        }
    }    
    render() {
        return (
            <div>
                {
                    this.state.poleNameAndKey.map((obj) => {
                        return (
                            (obj.poleName === this.props.match.params.poleName) ?
                                <div>
                                    <h1>{obj.poleName}</h1>
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
                                                                style={styles.radioButton}/>
                                                            )
                                                        })
                                                    }
                                            </RadioButtonGroup>
                                            <RaisedButton label="Submit" onClick = {this.submitScore} secondary={true} style={style} />
                                                <LinearProgress mode="determinate" value={70} />
                                        </MuiThemeProvider>
                                        <div>
                                            {
                                                
                                                this.state.optionsPercentages !== [] ?
                                                this.state.optionsPercentages.map((obj, indx)=>{
                                                    // counter = counter+1
                                                    return(
                                                        <h2>{`${obj['i']}`} </h2>
                                                    )
                                                })
                                                :
                                                null
                                            }
                                                </div>
                                        
                                        {/* <LinearProgress mode="determinate" value={this.state.completed} /> */}

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