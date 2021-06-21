import React, { useMemo, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Welcome from './components/Welcome'
import Scoreboard from './components/Scoreboard'
import GradesTable from './components/GradesTable'
import AddStudent from './components/AddStudent'
import MyGrades from "./components/MyGrades";
import About from "./components/About";
import background from "./img/background.jpg"

class App extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">

                {/*<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Ranchers&display=swap" rel="stylesheet" />*/}
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Merriweather+Sans:ital,wght@1,500&display=swap" rel="stylesheet" />

                <Router>
                    <NavBar />
                    <img src={background} style={{ position: 'absolute', width: '100vw', height: '100vh', repeat: 'no-repeat', left: 0, top: 0, bottom: 0, right: 0, zIndex: -1 }} />

                    <Switch>
                        <Route exact path="/" component={Welcome} />

                        <Route path="/home">
                            <div>

                                <Home />
                            </div>
                        </Route>
                            <Route path="/Scoreboard" component={Scoreboard} />
                            <Route path="/GradesTable" component={GradesTable} />
                            <Route path="/AddStudent" component={AddStudent} />
                            <Route path="/MyGrades" component={MyGrades} />
                            <Route path="/About" component={About} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;
