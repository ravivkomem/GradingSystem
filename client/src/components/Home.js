import React from "react";
import Card from "react-bootstrap/Card";

export default function Home() {
    return (
        <div>
            <center>
                <Card style={{width: '40rem' , marginTop: '3rem',background: 'rgba(252, 252, 252, 0.6)'}} >
                    <Card.Body>
                        <Card.Text >
                           <h1><b>Welcome {JSON.parse(sessionStorage.getItem('User')).UserName}!</b></h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}
