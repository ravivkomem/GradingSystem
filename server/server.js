let mysql = require('mysql');

const express = require('express');
const app = express();
const port = 8081;
app.use(express.json());

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "VcOGOelpLZ",
    password: "KnqHhkUM58",
    database: "VcOGOelpLZ",
    insecureAuth: true
});

app.get('/Scoreboard', (req, res) => {
    console.log("Scoreboard server");
    res.header('Access-Control-Allow-Origin', '*');
    var sql = "SELECT Id, Mathematics, English, Biology, Physics FROM `Scoreboard`";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.post('/getUserGrades', (req, res) => {

    console.log("getUserGrades");
    let query = "SELECT * FROM Scoreboard WHERE `Id` = ?";
    con.query(query, req.body.ID, function (err, result) {
        if (err) throw err;
        res.send(result);
        // console.log(result)
    });


});



app.post('/Remove', (req, res) => {
    console.log("GET user");
    res.header('Access-Control-Allow-Origin', '*');
    let query = "Delete FROM Scoreboard WHERE Id = ?";
    con.query(query, req.body.ID, function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});


app.post('/login', (req, res) => {
    console.log("POST Login");
    if (req.body.title !== "Login") {
        res.status(400);
        res.send("Bad Request.");
        return;
    }

    let query = "SELECT * FROM Users WHERE Id = ? AND Password = ?";
    // console.log(query);
    con.query(query, [req.body.ID, req.body.Password],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            // console.log(result.length === 0);
            if (result.length === 0) {
                res.status(400);
                res.send("Invalid login parameters.");
            } else {
                // console.log(result[0]);
                const resMsg = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            title: 'Login',
                            loginResult: 'OK',
                            id: result[0].Id,
                            FullName: result[0].FullName,
                            IsLecturer: result[0].IsLecturer
                        })
                };
                // console.log(resMsg);
                res.type('application/json'); // =>'application/json'
                res.send(resMsg);

            }
        });


});

app.post('/register', (req, res) => {

    console.log("POST register");

    if (req.body.title !== "Register") {
        res.status(400);
        res.send("Bad Request.");
        return;
    }

    /* Check if user already exist */

    con.query("SELECT * FROM Users WHERE Id = ?", [req.body.ID],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            if (result.length !== 0) {
                res.status(400);
                res.send("User already exists");
            } else {

                /* Insert new user */
                var query = `INSERT INTO Users (Id,FullName, Password, IsLecturer) VALUES ('${req.body.ID}','${req.body.FullName}', '${req.body.Password}', '${req.body.IsLecturer ? 1 : 0}')`;
                console.log(query);
                con.query(query, [req.body.FullName, req.body.Password],
                    function (err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                            throw err;
                            return;
                        }
                        ;

                        if (result.length === 0) {
                            res.status(400);
                            res.send("Invalid login parameters.");
                        } else {
                            const resMsg = {
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(
                                    {
                                        title: 'Register',
                                        RegistrationResult: 'OK',
                                    })
                            };
                            console.log(resMsg);
                            res.type('application/json'); // =>'application/json'
                            res.send(resMsg);
                        }
                    });
            }
        });


});

app.post('/getUserType', (req, res) => {

    console.log("POST getUserType");
    console.log(req.body);

    if (FullName === "" || Password === "") {
        res.status(400);
        res.send("Invalid User parameters.");
        return;
    }

    let query = "SELECT * FROM Users WHERE FullName = ? AND Password = ?";

    con.query(query, [req.body.FullName.toLowerCase(), req.body.Password],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            ;

            console.log(result.length === 0);
            if (result.length === 0) {
                res.status(400)
                res.send("Invalid User parameters.");
                return;
            } else {
                const resMsg = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            title: 'UserDetails',
                            loginResult: 'OK',
                            IsLecturer: result[0].IsLecturer,
                        })
                };
                console.log(resMsg);
                res.type('application/json'); // =>'application/json'
                res.send(resMsg);
            }
        });

});

app.post('/updateRow', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let sql = `UPDATE Scoreboard SET Id='${req.body.Id}', FullName='${req.body.FullName}', Mathematics='${req.body.Mathematics}', English='${req.body.English}',  Biology='${req.body.Biology}', Physics='${req.body.Physics}' WHERE Id='${req.body.Id}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/addRow', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let sql = `INSERT INTO Scoreboard (Id, FullName, Mathematics, English, Biology, Physics) VALUES ('${req.body.Id}', '${req.body.FullName}', '${req.body.Mathematics}','${req.body.English}', '${req.body.Biology}', '${req.body.Physics}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.listen(port, () => {
    console.log(`GradesSystem app listening at http://localhost:${port}`);
});
