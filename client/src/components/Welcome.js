import React, {Component as Navbar} from 'react'
import {withRouter} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/Card"
import './style/Welcome.css'
import background from "../img/bg_welcome.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
    }
componentDidMount() {
    // sessionStorage.clear();

}

    render() {
    return (
        <div >
            <Container >
                <Container style={{marginTop: '1rem', textAlign: 'left'}}>
                    <Row>
                        <Col>
                            <Card style={{flex: 1, background: 'rgba(252, 252, 252, 0.6)', borderRadius: 20}}>
                                <Card.Body>
                                    <Login/>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{background: 'rgba(252, 252, 252, 0.6)', borderRadius: 20}}>
                                <Card.Body>
                                    <Register style={{height: 600}}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </Container>
        </div>
    );
}
}
export default withRouter(Welcome);

