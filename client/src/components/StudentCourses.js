/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class StudentCourses extends React.Component {

    constructor(props) 
    {
      super(props);
        this.state = {
            coursesResponse: null,
        }
    }

    // This function is activated upon mount of the component
    // It requests a list of courses from the server, in order to display for the user
    componentDidMount = async () => {
        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        const setState = this.setState.bind(this);
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetStudentCourses",
                    StudentId: userDetails.UserId,
                })
        };
        await fetch('/GetStudentCourses', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({coursesResponse: response})
                console.log(response)
            });
    };

    render() {
        return (
            <center>
            <h2 className="mb-3">Student Courses</h2>
            {this.state.coursesResponse === null ?
            <div>Loading Data From Server</div>
            : null}
            {/* Courses List  */}
            {
                this.state.coursesResponse === null ? null
                :
                this.state.coursesResponse.map((course, key) => {
                    return(
                        <Card style={{ width: '18rem' }}>
                        <Card.Title>{course.CourseName}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Credits: {course.Credits}</ListGroup.Item>
                            {
                            course.Grade === null ?
                            <ListGroup.Item>Grade: Missing</ListGroup.Item>
                            :
                            <ListGroup.Item>Grade: {course.Grade}</ListGroup.Item>
                            }
                        </ListGroup>
                        </Card>
                    );
                })
            }
            </center>
        );
    }
}

export default StudentCourses;
