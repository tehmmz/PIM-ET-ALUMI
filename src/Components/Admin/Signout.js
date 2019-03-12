import React, { Component } from 'react';

import * as firebase from 'firebase';

import { withRouter } from 'react-router-dom';

const config = {
    apiKey: "AIzaSyCCQpItufE5vlMfr5CtNha98GXSssfHGL8",
    authDomain: "pim-alumi-1550786766332.firebaseapp.com",
    databaseURL: "https://pim-alumi-1550786766332.firebaseio.com",
    projectId: "pim-alumi-1550786766332",
    storageBucket: "pim-alumi-1550786766332.appspot.com",
    messagingSenderId: "708643692618"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


class Signout extends Component {


    componentDidMount() {
        firebase.auth().signOut()
            .then(() => {
                this.props.history.push("/");
            })
    }


    render() {
        return (
            <div> </div>
        )
    }
}

export default withRouter(Signout);