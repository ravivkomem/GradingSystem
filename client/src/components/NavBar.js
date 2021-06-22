/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from '../img/LogoLight.png';
import './style/NavBar.css'
import {isUserLecturer, isUserLoggedIn} from "../Permissions";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // sessionStorage.clear();
    }

    state = {
        reload: false
    };

    refreshPage = () => {
        this.setState(
            {reload: true},
            () => this.setState({reload: false})
        )
    };

    render() {
        return (
            <Navbar bg="dark" className='m-auto' variant="dark">

                <Navbar.Brand href="#home" className="m-auto">
                    <img
                        src={logo}
                        width="140"
                        className="d-inline-block align-top"
                        alt="MyGrades"
                    />
                </Navbar.Brand>

                {isUserLoggedIn() ?
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                        {console.log("isTch = " + isUserLecturer())}
                        {!isUserLecturer() ? <Nav.Link><Link to="/RegisterCourse">Enroll to Course</Link></Nav.Link> : null}
                        {!isUserLecturer() ? <Nav.Link><Link to="/StudentCourses">Grades</Link></Nav.Link> : null}
                        {isUserLecturer() ? <Nav.Link><Link to="/Scoreboard">Scoreboard</Link></Nav.Link> : null}
                        {isUserLecturer() ? <Nav.Link><Link to="/NewCourse">New Course</Link></Nav.Link> : null}
                        {isUserLecturer() ? <Nav.Link><Link to="/LecturerCourses">Lecturer Courses</Link></Nav.Link> : null}
                        <Nav.Link><Link to="/About">About</Link></Nav.Link>
                        <Nav.Link><Link to="/" onClick={() => this.refreshPage()}>Logout</Link></Nav.Link>
                    </Nav>
                    :
                    null
                }

            </Navbar>
        );
    }
}

export default withRouter(NavBar);

