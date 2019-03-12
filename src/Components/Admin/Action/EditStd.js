import React, { Component } from 'react';

import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form, FormGroup } from 'reactstrap';

import { withRouter } from 'react-router-dom';

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

class EditStd extends Component {

    constructor(props) {
        super(props);
        const stdID = this.props.location.state.stdID
        const stdsID = this.props.location.state.stdsID;
        this.state = {
            modal: true,
            stdData: [],
            stdID: stdID,
            stdsID: stdsID
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log('LoggedIn : true')
                this._getStudentData();
            } else {
                this.props.history.push("/cp_login")
            }
        })
    }

    _getStudentData = async () => {
        await fetch('http://localhost:7777/searchbyid?sID=' + this.state.stdID)
            .then((res) => res.json())
            .then((response) => {
                this.setState({
                    stdData: response.data[0]
                })
            })
    }

    _updateStd = async () => {
        await fetch('http://localhost:7777/updatestd?fullName=' + this.state.stdData.fullName + '&studentID=' + this.state.stdData.studentID +
            '&major=' + this.state.stdData.major + '&yearGraduate=' + this.state.stdData.yearGraduate + '&educationLevel=' + this.state.stdData.educationLevel +
            '&email=' + this.state.stdData.email + '&sID=' + this.state.stdID)
            .then(() => {
                if (this.state.stdsID != this.state.stdData.studentID) {
                    fetch('http://localhost:7777/updatestatusworkplace?studentID=' + this.state.stdData.studentID)
                        .then(() => {
                            alert('แก้ไขข้อมูลสำเร็จ...')
                            this.props.history.push("/admin/edit")
                        })
                        .catch((err) => {
                            console.log(err);
                            alert('มีบางอย่างผิดพลาด...')
                        })
                } else {
                    alert('แก้ไขข้อมูลสำเร็จ...')
                    this.props.history.push("/admin/edit")
                }
            })
            .catch((err) => {
                console.log(err);
                alert('มีบางอย่างผิดพลาด...')
            })

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        }, () => {
            this.props.history.push("/admin/edit")
        });
    }


    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}><span style={{ fontSize: 24, fontWeight: 'bold' }}>แก้ไขข้อมูลนักศึกษา</span></ModalHeader>
                <ModalBody>
                    <div align="left">
                        <Form>
                            <div className="row">
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>ชื่อ - นามสกุล</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { fullName: e.target.value }))} value={this.state.stdData.fullName} />
                                    </FormGroup>
                                </div>
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>รหัสนิสิต</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { studentID: e.target.value }))} value={this.state.stdData.studentID} />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>สาขา</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { major: e.target.value }))} value={this.state.stdData.major} />
                                    </FormGroup>
                                </div>
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>ระดับการศึกษา</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { educationLevel: e.target.value }))} value={this.state.stdData.educationLevel} />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>ปีการศึกษา</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { yearGraduate: e.target.value }))} value={this.state.stdData.yearGraduate} />
                                    </FormGroup>
                                </div>
                                <div className="col-6">
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { email: e.target.value }))} value={this.state.stdData.email} />
                                    </FormGroup>
                                </div>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._updateStd}>ตกลง</Button>
                    <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(EditStd)