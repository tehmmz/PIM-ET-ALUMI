import React, { Component } from 'react';

import { Button, Form, Label, FormGroup, Input, Card, CardBody } from 'reactstrap';

import { withRouter } from 'react-router-dom';

import axios from 'axios';

import * as firebase from 'firebase';

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

class Administrator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passWord: ""
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.props.history.push("/admin/management");
            } else {
                console.log('Login Failed : Please Login again..')
            }
        })
    }

    _Login = async () => {
        firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.passWord)
            .then(() => {
                this.props.history.push("/admin/management")
            })
            .catch((err) => {
                console.log(err);
                alert('มีบางอย่างผิดพลาด ไม่อนุญาติให้ใช้งาน...')
            })
    }

    render() {
        return (
            <div className="container">
                <div align="center" style={{ paddingTop: 50 }}>
                    <Card style={{ width: "50%" }}>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <img src="https://www.pim.ac.th/uploads/content/2015/10/o_1a21hj8a0g3h16gbh3kj1pqaja.png" height={200} width={200} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Administrator :</Label>
                                    <Input type="text" style={{ width: "50%" }} onChange={(e) => this.setState({ userName: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password :</Label>
                                    <Input type="password" style={{ width: "50%" }} onChange={(e) => this.setState({ passWord: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="success" onClick={() => this._Login()}>Login</Button>
                                    <Button color="warning" type="reset">Cancel</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(Administrator);