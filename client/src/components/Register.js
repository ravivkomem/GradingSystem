import React from 'react'
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style/Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
            UserId: '',
            userType: '',
            Permission: false,
            data: '',
            getData: false
        };

        this.onValueChange = this.onValueChange.bind(this);
    }

    registration = async (e) => {
        e.preventDefault();
        let UserId = this.state.UserId;
        let UserName = this.state.UserName;
        let Password = this.state.Password;

        /* UserName and Password Sanity check*/
        if (UserName === "" || Password === "") {
            alert("UserName or Password missing");
            return;
        }
        let english = /^[A-Za-z0-9]*$/;
        if (!english.test(UserName)) {
            alert("UserName must be in english letters");
            return;
        }
        if (Password.length <= 1) {
            alert("Password must be longer than 1 character");
            return;
        }

        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title: 'Register',
                    UserId: this.state.UserId,
                    UserName: this.state.UserName,
                    Password: this.state.Password,
                    Permission: this.state.Permission
                })
        };

        const response = await fetch('/Register', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid registration details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Registration complete')
    };

    onValueChange() {
        this.setState({
            Permission: !this.state.Permission
        });
    }

    render() {
        return (
            <div>
                <center><h1 style={{fontFamily: 'Merriweather Sans, sans-serif'}}>Registration</h1></center>
                <div>
                    <Form onSubmit={this.registration}>
                        <Form.Group controlId="fID">
                            <Form.Label>UserId</Form.Label>
                            <Form.Control
                                id='regEmail'
                                placeholder="UserId"
                                value={this.state.UserId}
                                onChange={e => this.setState({UserId: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fFullName">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                placeholder="UserName"
                                value={this.state.UserName}
                                onChange={e => this.setState({UserName: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.Password}
                                onChange={e => this.setState({Password: e.target.value})}
                                required />
                        </Form.Group>
                        
                        <fieldset>
                            <Form.Group controlId="fUserType" value={this.state.userType}>
                                <Form.Label as="legend" column sm={2}>
                                </Form.Label>
                                <Form.Check
                                    id='student'
                                    type="radio"
                                    label="Student"
                                    checked={!this.state.Permission}
                                    onChange={this.onValueChange}
                                />
                                <Form.Check
                                    id='lecturer'
                                    width='10px'
                                    type="radio"
                                    label="Lecturer"
                                    checked={this.state.Permission}
                                    onChange={this.onValueChange}
                                />
                            </Form.Group>
                        </fieldset>
                        <Button type="submit" id='registerBtn'> Register </Button>

                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
