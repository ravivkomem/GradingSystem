import React from "react";
import Card from "react-bootstrap/Card";

export default function About() {
    return (
        <div>
            <center>
                <Card style={{width: '40rem' , marginTop: '3rem'}} >
                    <Card.Body>
                        <Card.Text >
                            <h4><b>Ort Braude - Web Technologies</b></h4>
                            Submitted by:
                            Raviv Komem and Lior Wunsch
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}
