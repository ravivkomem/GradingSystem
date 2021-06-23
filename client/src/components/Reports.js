/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Histogram from 'react-chart-histogram';

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class Reports extends React.Component {

    constructor(props) 
    {
      super(props);
      
        this.state = {
            coursesResponse: null,
            ParticipantsResponse: null,
            SelectedCourse: null,
            gradeAvg: 0,
            data: [0, 0, 0, 0, 0],
            labels: ['Not Graded', '0-55', '55-70', '70-85', '85-100'],
        }
    }

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

    getCourseParticipants = async (e) => {
        e.preventDefault();
        // Data Validation
        if (sessionStorage.getItem('User') === null)
        {
            alert("You have been disconnected...");
            this.props.history.push('/');
            return;
        }
        if (this.state.SelectedCourse === null)
        {
            alert("Please select a course...");
            return;
        }

        // Create The Server 'POST' Request 
        console.log("Requesting Participants In Course");
        const setState = this.setState.bind(this);
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetCourseStudents",
                    CourseName: this.state.SelectedCourse.CourseName,
                })
        };
        
        // Wait for server response
        await fetch('/GetCourseStudents', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({ParticipantsResponse: response})
                console.log(response)
            });
    };

    render() {
        // build histogram
        this.state.data = [0, 0, 0, 0, 0];
        this.state.gradeAvg = 0;
        let gradeCount = 0;

        if (this.state.ParticipantsResponse !== null) {
            this.state.ParticipantsResponse.forEach(student => {
                if (student.Grade === null) {
                    this.state.data[0]++;
                } else {
                    this.state.gradeAvg += parseInt(student.Grade);
                    gradeCount++;
                    if (parseInt(student.Grade) < 55) {
                        this.state.data[1]++;
                    } else if (parseInt(student.Grade) < 70) {
                        this.state.data[2]++;
                    } else if (parseInt(student.Grade) < 85) {
                        this.state.data[3]++;
                    } else {
                        this.state.data[4]++;
                    }
                }
            });
            this.state.gradeAvg /= gradeCount;
        }

        return (
            <center>
                <Form className="container-fluid contact-info-container">
                    <h2 className="mb-3">Course Reports</h2>
                    {/* Loading Label */}
                    {this.state.coursesResponse === null ?
                    <h1>Loading Data From Server</h1>
                    : null}
                    {/* Courses List  */}
                    <Form.Group controlId="coCourses">
                        <Form.Label>Courses</Form.Label>
                        <Form.Control 
                            as="select"
                            onChange={e => {
                                e.preventDefault();
                                this.setState({SelectedCourse: JSON.parse(e.target.value)})
                            }} >
                        <option>---</option>
                        {
                            this.state.coursesResponse === null ? null
                            :
                            this.state.coursesResponse.map((course, key) => {
                                return(
                                    <option key={key} value={JSON.stringify(course)}>{course.CourseName}</option> 
                                );
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                    
                    {/* View Histogram */}
                    <Button variant="primary" type="submit" onClick={(e) => this.getCourseParticipants(e)}>
                        Display
                    </Button>
                </Form>

                {/* Histogram */}
                <Histogram 
                    xLabels={this.state.labels}
                    yValues={this.state.data}
                    width='650'
                    height='300'
                    options={{fillColor: '#FFFFFF', strokeColor: '#0000ff'}}
                    />
                <div>
                    Average Grade = {this.state.gradeAvg}
                </div>
            </center>
        );
    }
    
}

export default Reports;
