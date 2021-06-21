import React from "react";
import Card from "react-bootstrap/Card";


export default function About() {
    return (
        <div>
            <center>
                {/*{console.log("User = " + sessionStorage.getItem('User'))}*/}
                <Card style={{width: '40rem' , marginTop: '3rem'}} >
                    <Card.Body>
                        <Card.Text >
                            <h4><b>Ort Braude - Web Technologies Course</b></h4>
                            Submited by:
                            Adi Oren and Idan Abergel
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}
