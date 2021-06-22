import React, {useContext, useState} from 'react'
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {UserContext} from "../UserContext";
import Form from "react-bootstrap/Form";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserId: '',
            UserName: '',
            Password: '',
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
                    UserId: this.state.UserId,
                    Password: this.state.Password,
                })
        };
        const response = await fetch('/login', requestMsg);
        console.log(response);
        if (!response.ok) {
            alert('Invalid login details');
            return;
        }
        let responseData = await response.json();
        responseData = JSON.parse(responseData.body);
        sessionStorage.setItem(
            'User',
            JSON.stringify({
                UserId: this.state.UserId,
                UserName: responseData.UserName,
                Permission: responseData.Permission,
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
                            <Form.Label>UserId</Form.Label>
                            <Form.Control
                                placeholder="UserId"
                                value={this.state.UserId}
                                onChange={e => this.setState({UserId: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.Password}
                                onChange={e => this.setState({Password: e.target.value})}
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
