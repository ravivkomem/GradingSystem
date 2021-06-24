/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
// Import React Elements
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';

// Import Components
import Register from './Register';
import Login from './Login';

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
/*  This is the landing page of our web application
*   First page which load when a user enter the site.
*   Has both login and register components within it.
*/
class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    render() {
        return (
            <div>
                <Container>
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

export default withRouter(LandingPage);
