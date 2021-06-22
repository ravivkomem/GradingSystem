/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React, { useDebugValue } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class RegisterCourse extends React.Component {

    constructor(props) 
    {
      super(props);
      
        this.state = {
            coursesResponse: null,
            SelectedCourse: null,

        }
    }

    // This function is activated upon mount of the component
    // It requests a list of courses from the server, in order to display for the user
    componentDidMount = async () => {
        const setState = this.setState.bind(this);
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetCourses",
                })
        };

        await fetch('/GetCourses', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({coursesResponse: response})
                console.log(response)
            });
    };

    registerCourse = async (e) => {
        e.preventDefault();
        // Data Validation
        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        console.log("Course ID: " + userDetails);
        console.log("LecturerId: " + userDetails.UserId);
        console.log("Course Name: " + this.state.CourseName);
        console.log("Description: " + this.state.CourseDescription);
        console.log("Credit Score: " + this.state.CreditScore);

        // Create The Server 'POST' Request 
        console.log("Requesting Create New Course");
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'CreateCourse',
                    LecturerId: userDetails.UserId,
                    CourseName: this.state.CourseName,
                    Description: this.state.CourseDescription,
                    Credits: this.state.CreditScore,
                })
        };

        // Wait for server response
        const response = await fetch('/createCourse', requestMsg);
        if (!response.ok) {
            alert('Could not create new course, please try again later');
            return;
        }
        else
        {
            alert("Course added successfully!");
            this.setState({CourseName: ''});
            this.setState({CourseDescription: ''});
            this.setState({CreditScore: 2});
        }
        
    };

    render() {


        return (
            <Form className="container-fluid contact-info-container" onSubmit={this.registerCourse}>
                <h2 className="mb-3">Register to Courses</h2>
                <center>
                    {this.state.coursesResponse === null ?
                    <div>Loading Data From Server</div>
                    : null}
                    {/* Courses List  */}
                    <Form.Group controlId="coCourses">
                        <Form.Label>Courses</Form.Label>
                        <Form.Control 
                            as="select"
                            onChange={e => this.setState({SelectedCourse: JSON.parse(e.target.value)})}
                        >
                        
                        {
                            this.state.coursesResponse === null ? <option>---</option>
                            :
                            this.state.coursesResponse.map((course, key) => {
                                return(
                                    <option key={key} value={JSON.stringify(course)}>{course.CourseName}</option> 
                                );
                            })
                        }
                        </Form.Control>
                    </Form.Group>

                    {/* Lecturer Name */}
                    <Form.Group controlId="coLecturerName">
                        <Form.Label>Lecturer Name</Form.Label>
                        {this.state.SelectedCourse === null ?
                            <Form.Control type="text" value="---" readOnly />
                            :
                            <Form.Control type="text" value={this.state.SelectedCourse.LecturerName} readOnly />
                        }
                        
                    </Form.Group>
                   

                    {/* Add New Course */}
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </center>
                
            </Form>
        );
    }
    
}


export default RegisterCourse;