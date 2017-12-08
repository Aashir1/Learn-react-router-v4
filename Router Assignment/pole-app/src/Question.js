import React from 'react';
import fire from './firebase';
// class AakQuestion extends React.Component {
//     constructor() {
//       super();
//       this.state = {

//       }
//     }
//     render() {
//       return (
//         <div>Question component and polename is:  {this.porps.match.params.poleName}</div>
//       );
//     }
//   }

class AakQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            questin: "",
            noOfOptions: '',
            showOptions: false,
            noOfOptionsArray: [],
            radioGroup: {},
            submitFlag : false
        }
        JSON.stringify(localStorage.setItem('flag', true));
    }
    updateText = (event) => {
        this.setState({
            questin: event.target.value
        });
    }
    enterOptions = (event) => {
        this.setState({
            noOfOptions: event.target.value
        })
    }
    createOptions = () => {
        let temp = this.state.noOfOptionsArray;
        if (this.state.noOfOptions >= 2 && this.state.noOfOptions <= 4) {
            for (let i = 1; i <= this.state.noOfOptions; i++) {
                let values = prompt(`Enter option no ${i} :`);
                if (values) {
                    temp.push(values);
                }
            }
            this.setState({
                noOfOptionsArray: temp, noOfOptions: ''
            })
        } else {
            alert('Minimum 2 maximum 4 options can be created');
        }


    }
    handleRadio = (i, event) => {
        let flag = JSON.parse(localStorage.getItem('flag'));
        console.log(flag);
        console.log(i);
        console.log(event);
        let obj = {};
        this.state.noOfOptionsArray.map((item, indx) => {
            (indx === 0) ?
                obj[item] = true
                :
                obj[item] = false;
        });
        console.log(obj);
        this.setState({ radioGroup: obj });
        obj = this.state.radioGroup;
        obj[event.target.value] = event.target.checked;
        this.setState({ radioGroup: obj });
        console.log(event.target.value);
        console.log(this.state.radioGroup);

    }
    sendData = ()=>{
        let database = fire.database().ref(`/react-router-assignment/`);
        let obj = {
            question : this.state.questin,
            options: this.state.noOfOptionsArray,
            poleName: this.props.match.params.poleName
        }
        database.push(obj);
        this.setState({
            submitFlag : true
        });
    }
    render() {
        // console.log(match);

        return (
            <div>
                Ask Question {`: ${this.props.match.params.poleName}`}
                <textarea name="question" value={this.state.questin} onChange={this.updateText} />
                <br />
                {
                    (this.state.noOfOptionsArray.length >= 2 && this.state.noOfOptionsArray.length <= 4) ?
                        <div>
                            {this.state.noOfOptionsArray.map((option, i) => {
                                return (<label >
                                    <input type="radio"
                                        checked={this.state.radioGroup[i]}
                                        name="radioGroup"
                                        onChange={(event) => { this.handleRadio(i, event) }}
                                        value={option}
                                    />
                                    {option}
                                </label>)
                            })}
                            <br />
                            < button onClick= {this.sendData} disabled = {this.state.submitFlag}>
                                Submit
                            </button>



                        </div>

                        // this.state.noOfOptionsArray.map((items, indx)=>{
                        //     return(
                        //         <label>
                        //             <input type="radio"
                        //             name="radioGroup"
                        //             value= {items}
                        //             checked={this.state.radioGroup[items]}
                        //             onChange={this.handleRadio}/>
                        //             {items}
                        //         </label>
                        //     )
                        // })
                        :
                        <div>
                            <input value={this.state.noOfOptions} onChange={this.enterOptions} />
                            <button onClick={this.createOptions}>create options</button>
                        </div>
                }
            </div>
        );
    }
}

export default AakQuestion;