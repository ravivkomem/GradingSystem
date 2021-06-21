import React from "react";
import Card from "react-bootstrap/Card";

import {isUserLecturer} from "../Permissions";


export default function Home() {
    return (
        <div>
            <center>
                {/* {/{console.log("User = " + sessionStorage.getItem('User'))}/} */}
                <Card style={{width: '40rem' , marginTop: '3rem',background: 'rgba(252, 252, 252, 0.6)'}} >
                    <Card.Body>
                        <Card.Text >
                           <h1><b>Welcome {JSON.parse(sessionStorage.getItem('User')).FullName}!</b></h1>
                        </Card.Text>
                        {/* {/<Card.Link href="#">Card Link</Card.Link>/} */}
                        {/* {/<Card.Link href="#">Another Link</Card.Link>/} */}
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}