import React, {useContext, useState} from 'react'
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {UserContext} from "../UserContext";
import Form from "react-bootstrap/Form";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            FullName: '',
            password: '',
            data: '',
            getData: false
        }
    }

    componentDidMount = async () => {
    };


    loginUser = async () => {
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'Login',
                    ID: this.state.ID,
                    Password: this.state.password,
                })
        };
        console.log("requesting");

        const response = await fetch('/login', requestMsg);

        if (!response.ok) {
            alert('Invalid Login Details');
            return;
        }
        let responseData = await response.json();
        responseData = JSON.parse(responseData.body);
        sessionStorage.setItem(
            'User',
            JSON.stringify({
                ID: this.state.ID,
                FullName: responseData.FullName,
                IsLecturer: responseData.IsLecturer,
            }));


        return (this.props.history.push('/home'));
    };

    render() {
        return (
            <div>
                <center><h1 style={{fontFamily: 'Merriweather Sans, sans-serif'}}>Login</h1></center>
                <div>
                    <Form>
                        <Form.Group controlId="fID">
                            <Form.Label>Personal ID</Form.Label>
                            <Form.Control
                                placeholder="Your Personal ID Number"
                                value={this.state.ID}
                                onChange={e => this.setState({ID: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                                required/>
                        </Form.Group>
                        <Button onClick={this.loginUser}>Login</Button>

                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
