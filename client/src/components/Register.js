import React from 'react'
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style/Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: '',
            password: '',
            ID: '',
            userType: '',
            isLecturer: false,
            data: '',
            getData: false
        };

        this.onValueChange = this.onValueChange.bind(this);

    }


    registration = async (e) => {
        e.preventDefault();
        let ID = this.state.ID;
        let FullName = this.state.FullName;
        let password = this.state.password;

        /* FullName and password sanity check*/

        if (FullName === "" || password === "") {
            alert("You must enter FullName and password");
            return;
        }
        let english = /^[A-Za-z0-9]*$/;
        if (!english.test(FullName)) {
            alert("FullName must be in english letters.");
            return;
        }
        if (password.length <= 1) {
            alert("Password must be greater then 1");
            return;
        }

        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title: 'Register',
                    ID: this.state.ID,
                    FullName: this.state.FullName,
                    Password: this.state.password,
                    IsLecturer: this.state.isLecturer
                })
        };

        console.log("requesting");

        const response = await fetch('/register', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Registration Details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Registered! Please login.')

    };




    onValueChange() {
        this.setState({
            isLecturer: !this.state.isLecturer
        });
    }


    render() {

        return (

            <div>
                <center><h1 style={{fontFamily: 'Merriweather Sans, sans-serif'}}>Registration</h1></center>
                <div>
                    <Form onSubmit={this.registration}>
                        <Form.Group controlId="fID">
                            <Form.Label>Personal ID</Form.Label>
                            <Form.Control
                                id='regEmail'
                                placeholder="Your Personal ID Number"
                                value={this.state.ID}
                                onChange={e => this.setState({ID: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fFullName">
                            <Form.Label>FullName</Form.Label>
                            <Form.Control
                                placeholder="Your Full Name"
                                value={this.state.FullName}
                                onChange={e => this.setState({FullName: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                                required />
                        </Form.Group>
                        
                        <fieldset>
                            <Form.Group controlId="fUserType" value={this.state.userType}>
                                <Form.Label as="legend" column sm={2}>
                                </Form.Label>
                                <Form.Check
                                    id='student'
                                    type="radio"
                                    label="I am a student"
                                    checked={!this.state.isLecturer}
                                    onChange={this.onValueChange}
                                />
                                <Form.Check
                                    id='lecturer'
                                    width='10px'
                                    type="radio"
                                    label="I am a lecturer"
                                    checked={this.state.isLecturer}
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
