import React, {useContext, useState} from 'react'
import {withRouter} from 'react-router-dom';

class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        sessionStorage.clear();

        this.props.history.push('/');

    };

    render() {
    }
}

export default withRouter(Logout);
