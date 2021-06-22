/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
                    LecturerId: userDetails.UserId,
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
            // <Form className="container-fluid contact-info-container">
            //     <h2 className="mb-3">Student Courses</h2>
            //     <center>
            //         {this.state.coursesResponse === null ?
            //         <div>Loading Data From Server</div>
            //         : null}
            //         {/* Courses List  */}
                    
            //                 this.state.coursesResponse === null ? <option>---</option>
            //                 :
            //                 this.state.coursesResponse.map((course, key) => {
            //                     return(
            //                         <Card style={{ width: '18rem' }}>
            //                         <Card.Header>this.state.</Card.Header>
            //                             <ListGroup variant="flush">
            //                                 <ListGroup.Item>Cras justo odio</ListGroup.Item>
            //                                 <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            //                                 <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            //                             </ListGroup>
            //                         </Card>
            //                     );
            //                 })
            //             }
            //     </center>                
            // </Form>
        );
    }
}

export default StudentCourses;
