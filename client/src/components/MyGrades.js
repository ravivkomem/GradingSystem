import React from 'react';
import {withRouter} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import GradeTableForStudent from "./GradeTableForStudent";
import GradesGraph from "./GradesGraph";
import {redirectIfNotStudent} from "../Permissions";


class MyGrades extends React.Component {
    constructor(props) {
        super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
        redirectIfNotStudent(props);
        this.state = {
            responseData: null
        }
    }

    componentDidMount = async () => {
        const setState = this.setState.bind(this);
        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        console.log(JSON.parse(sessionStorage.getItem('User')));
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    ID: userDetails.ID,
                    Password: userDetails.Password
                })
        };

        // let userData = JSON.parse(sessionStorage.getItem('User'));
        await fetch('/getUserGrades', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({responseData: response})
            });
    };


    render() {
        return (
            <div className="MyGrades"  style={{ backgroundColor: '#FFFFFF'}}>
                <center>
                    <Card style={{width: '50rem'}}>
                        <Card.Body>
                            <Card.Title><h2>My Bagrut Grades</h2></Card.Title>
                            {this.state.responseData === null ?
                                <div>Loading</div>
                                :
                                Object.keys(this.state.responseData).length === 0 ?
                                    <div>No Availabljhe Grades</div>
                                    :
                                    <div>
                                        <div>{<GradeTableForStudent tableData={this.state.responseData}/>}</div>
                                        <div>{<GradesGraph tableData={this.state.responseData}/>}</div>
                                    </div>
                            }
                        </Card.Body>
                    </Card>
                </center>
            </div>
        )
    }
}


export default withRouter(MyGrades);
