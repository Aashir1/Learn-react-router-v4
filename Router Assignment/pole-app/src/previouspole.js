import fire from './firebase';
import firebase from 'firebase';
import React, { Component } from 'react';

class AllPoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            forNo: 0
        }
    }

    componentWillMount() {
        let database = fire.database().ref('/react-router-assignment');
        database.on('child_added', (snapshot) => {
            let pole = {
                poleName: snapshot.val().poleName,
                question: snapshot.val().question,
                option: snapshot.val().options,
                key: snapshot.key
            }
            this.setState({ data: [...this.state.data, pole] });
            console.log(this.state.data);
            console.log(snapshot)
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.data.map((eachObject) => {
                            return (
                                <div>
                                    <h1>{eachObject.poleName}</h1>
                                    <div>
                                        {/* {this.setState({ forNo: ++this.state.forNo })} */}
                                        <b>{eachObject.question}</b>
                                        <br />
                                        {eachObject.option.map((option, indx) => {
                                    return (<label >
                                        <input key={indx} type="radio"
                                            // checked={this.state.radioGroup[i]}
                                            name="radioGroup"
                                            // onChange={(event) => { this.handleRadio(i, event) }}
                                            value={option}
                                        />
                                        {option}
                                    </label>)
                                })}
                                    </div>
                                </div>
                            )
                        })
                        // this.state.data.map((snapshot) => {
                        //     <li key={snapshot.key}>
                        //         <h2>{snapshot.val().poleName}</h2>
                        //         <b>{snapshot.val().question}</b>
                        //         {snapshot.val().options.map((option, indx) => {
                        //             return (<label >
                        //                 <input key={indx} type="radio"
                        //                     // checked={this.state.radioGroup[i]}
                        //                     name="radioGroup"
                        //                     // onChange={(event) => { this.handleRadio(i, event) }}
                        //                     value={option}
                        //                 />
                        //                 {option}
                        //             </label>)
                        //         })}
                        //     </li>
                        // })
                    }
                </ul>
            </div>
        );
    }
}

export default AllPoles;