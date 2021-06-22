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
        const labels = ['0-55', '55-70', '70-85', '85-100'];
        const data = [0, 0, 0, 0];

        if (this.state.ParticipantsResponse !== null)
        {
            this.state.ParticipantsResponse.forEach(student => {
                if (student.Grade === null)
                {
                    // Skip...
                }
                else if (parseInt(student.Grade) < 55)
                {
                    data[0]++;
                }
                else if (parseInt(student.Grade) < 70)
                {
                    data[1]++;
                }
                else if (parseInt(student.Grade) < 85)
                {
                    data[2]++;
                }
                else
                {
                    data[3]++;
                }
            });

            console.log("Data is: " + data);
        }

            // let jsonKeys = Object.keys(this.state.tableData[0]);
            // let jsonVals = Object.values(this.state.tableData[0]);
            // jsonKeys.splice(0, 2); // Delete the first two array elements
            // jsonVals.splice(0, 2); // Delete the first two array elements
    
            // let GradesToGraph = [];
            // let gradesSum = 0;
            // for (let i = 0; i < jsonKeys.length; i++) {
            //     GradesToGraph.push({label: jsonKeys[i], y: jsonVals[i]});
            //     gradesSum += jsonVals[i];
            // }
            // let GradesAvg = gradesSum / jsonKeys.length;
            // this.state1 = {
            //     GradesToGraph: GradesToGraph,
            //     GradesAverage: GradesAvg
            // };

        const options = {
            animationEnabled: true,
            theme: "light2",
            height: 300,
            axisY: {
                maximum: 100,
                stripLines: [
                    {
                        startValue: this.state1.GradesAverage,
                        endValue: this.state1.GradesAverage - 1,
                        color: "#d8d8d8",
                        label: "Average = " + this.state1.GradesAverage,
                        labelFontColor: "#a8a8a8",
                    }
                ]
            },
            data: [{
                type: "column",
                dataPoints: this.state1.GradesToGraph
            }]
        };
        
        return (
            <center>
                <Form className="container-fluid contact-info-container" onSubmit={this.getCourseParticipants}>
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
                            onChange={e => this.setState({SelectedCourse: JSON.parse(e.target.value)})}
                        >
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
                    <Button variant="primary" type="submit">
                        Display
                    </Button>
                </Form>

                {/* Histogram */}
                {this.state.ParticipantsResponse === null ? null :
                    <div>
                    {/* <CanvasJSChart options={options} /> */}
                    </div>
                }
            </center>
        );
    }
    
}

export default Reports;
