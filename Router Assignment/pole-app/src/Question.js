import React from 'react';



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

        }
    }
    updateText = (event) =>{
        this.setState({
            questin: event.target.value
        });
    }
    updateOptions =(event) =>{
        if(event.target.value>=2 && event.target.value <=4){
            this.setState({
                updateOptions: event.target.value
            });
        }
    }
    render() {
        // console.log(match);

        return (
            <div>
                Ask Question {`: ${this.props.match.params.poleName}`}
                <textarea name="question" value={this.state.questin} onChange={this.updateText}/>
                <br />
                options should be between 2 and 4
                <input value = {this.state.noOfOptions} onChange={this.updateOptions} />
                {
                    //options p kam start karna hai
                }
            </div>
        );
    }
}

export default AakQuestion;