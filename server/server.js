let mysql = require('mysql');

const express = require('express');
const app = express();
const port = 8081;
app.use(express.json());

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "xRRgDKYU12",
    password: "6Fm51qF6UV",
    database: "xRRgDKYU12",
    insecureAuth: true
});

app.listen(port, () => {
    console.log(`GradesSystem app listening at http://localhost:${port}`);
});

/* ------------------------ database functions ------------------------ */

/* ----- Scoreboard ----- */

// app.get('/Scoreboard', (req, res) => {
//     console.log("Scoreboard server");
//     res.header('Access-Control-Allow-Origin', '*');
//     var sql = "SELECT Id, Mathematics, English, Biology, Physics FROM `Scoreboard`";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.send(result)
//     });
// });

// app.post('/getUserGrades', (req, res) => {
//     console.log("getUserGrades");
//     let query = "SELECT * FROM Scoreboard WHERE `Id` = ?";
//     con.query(query, req.body.ID, function (err, result) {
//         if (err) throw err;
//         res.send(result);
//         // console.log(result)
//     });
// });

// app.post('/Remove', (req, res) => {
//     console.log("GET user");
//     res.header('Access-Control-Allow-Origin', '*');
//     let query = "Delete FROM Scoreboard WHERE Id = ?";
//     con.query(query, req.body.ID, function (err, result) {
//         if (err) throw err;
//         res.send(result);
//         console.log(result);
//     });
// });

// app.post('/updateRow', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     let sql = `UPDATE Scoreboard SET Id='${req.body.Id}', FullName='${req.body.FullName}', Mathematics='${req.body.Mathematics}', English='${req.body.English}',  Biology='${req.body.Biology}', Physics='${req.body.Physics}' WHERE Id='${req.body.Id}'`;
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// })

// app.post('/addRow', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     let sql = `INSERT INTO Scoreboard (Id, FullName, Mathematics, English, Biology, Physics) VALUES ('${req.body.Id}', '${req.body.FullName}', '${req.body.Mathematics}','${req.body.English}', '${req.body.Biology}', '${req.body.Physics}')`;
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// })

/* ----- Users Table ----- */

app.post('/login', (req, res) => {
    console.log("POST Login");
    console.log(req.body);
    if (req.body.title !== "Login") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    let query = "SELECT * FROM Users WHERE UserId = ? AND Password = ?";
    con.query(query, [req.body.UserId, req.body.Password],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            if (result.length === 0) { /* query returned nothing */
                res.status(400);
                res.send("UserId or Password incorrect");
            }
            else { /* send login details to client */
                const resMsg = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            title: 'Login',
                            loginResult: 'OK',
                            UserId: result[0].UserId,
                            UserName: result[0].UserName,
                            Permission: result[0].Permission
                        })
                };
                res.type('application/json');
                res.send(resMsg);
            }
        });
});

app.post('/register', (req, res) => {
    console.log("POST register");
    console.log(req.body);
    if (req.body.title !== "Register") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }
    
    con.query("SELECT * FROM Users WHERE UserId = ?", [req.body.UserId],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            if (result.length !== 0) { /* query returned something */
                res.status(400);
                res.send("UserId already exists");
            }
            else { /* add new user */
                var query = `INSERT INTO Users (UserId, UserName, Password, Permission) VALUES ('${req.body.UserId}','${req.body.UserName}', '${req.body.Password}', '${req.body.Permission ? 1 : 0}')`;
                con.query(query, [req.body.UserName, req.body.Password],
                    function (err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                            return;
                        }
                        if (result.length === 0) { /* query returned nothing */
                            res.status(400);
                            res.send("Registration not complete");
                        }
                        else { /* send registration details to client */
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
                            res.type('application/json');
                            res.send(resMsg);
                        }
                    });
            }
        });
});

// app.post('/getUserType', (req, res) => {
//     console.log("POST getUserType");
//     console.log(req.body);
//     if (UserName === "" || Password === "") {
//         res.status(400);
//         res.send("UserName or Password missing");
//         return;
//     }

//     let query = "SELECT * FROM Users WHERE UserName = ? AND Password = ?";
//     con.query(query, [req.body.UserName.toLowerCase(), req.body.Password],
//         function (err, result) {
//             if (err) {
//                 res.status(500);
//                 res.send(err);
//                 return;
//             }
//             if (result.length === 0) { /* query returned nothing */
//                 res.status(400);
//                 res.send("UserName not found");
//                 return;
//             }
//             else {
//                 const resMsg = {
//                     method: 'GET',
//                     headers: {'Content-Type': 'application/json'},
//                     body: JSON.stringify(
//                         {
//                             title: 'UserDetails',
//                             loginResult: 'OK',
//                             Permission: result[0].Permission,
//                         })
//                 };
//                 console.log(resMsg);
//                 res.type('application/json');
//                 res.send(resMsg);
//             }
//         });
// });

/* ----- Courses Table ----- */

app.post('/createCourse', (req, res) => {
    console.log("POST createCourse");
    console.log(req.body);
    if (req.body.title !== "createCourse") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }
    
    con.query("SELECT * FROM Courses WHERE CourseName = ?", [req.body.CourseName],
        function (err, result) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            if (result.length !== 0) { /* query returned something */
                res.status(400);
                res.send("CourseName already exists");
            }
            else { /* add new course */
                var query = `INSERT INTO Courses (CourseName, LecturerId, Credits, Description) VALUES ('${req.body.CourseName}','${req.body.LecturerId}', '${req.body.Credits}', '${req.body.Description}')`;
                con.query(query, [req.body.CourseName, req.body.LecturerId],
                    function (err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                            return;
                        }
                        if (result.length === 0) { /* query returned nothing */
                            res.status(400);
                            res.send("Create Course not complete");
                        }
                        else { /* send course details to client */
                            const resMsg = {
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(
                                    {
                                        title: 'CreateCourse',
                                        CreateCourseResult: 'OK',
                                    })
                            };
                            console.log(resMsg);
                            res.type('application/json');
                            res.send(resMsg);
                        }
                    });
            }
        });
});
