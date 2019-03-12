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

class EditWorkplace extends Component {

    constructor(props) {
        super(props);
        const stdID = this.props.location.state.stdID
        this.state = {
            modal: true,
            stdData: [],
            stdID: stdID,
            options1: true,
            options2: false
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
        console.log(this.state.stdID)
    }

    _getStudentData = async () => {
        await fetch('http://localhost:7777/searchID?stuID=' + this.state.stdID)
            .then((res) => res.json())
            .then((response) => {
                this.setState({
                    stdData: response.data[0]
                })
            })
    }

    _updateWorkplace = async () => {

        if (this.state.stdData.status == "ทำงานแล้ว") {
            if (this.state.stdData.WorkplaceStatus == "ทำงานแล้ว") {
                await fetch('http://localhost:7777/updatworkplace?workplace=' + this.state.stdData.Workplace + "&address=" + this.state.stdData.Address +
                    "&province=" + this.state.stdData.Province + "&contact=" + this.state.stdData.Contact + "&studentID=" + this.state.stdData.studentID)
                    .then(() => {
                        alert('แก้ไขข้อมูลสำเร็จ...')
                        this.props.history.push("/admin/edit")
                        console.log('Workplace != null', this.state.stdData.studentID)
                    }).catch((err) => {
                        console.log(err);
                        alert('มีบางอย่างผิดพลาด...')
                    })
            } else {
                await fetch('http://localhost:7777/admin/addworkplace?status=' + this.state.stdData.status + "&workplace=" + this.state.stdData.Workplace +
                    "&address=" + this.state.stdData.Address + "&province=" + this.state.stdData.Province + "&contact=" + this.state.stdData.Contact +
                    "&studentID=" + this.state.stdData.studentID)
                    .then(() => {
                        alert('แก้ไขข้อมูลสำเร็จ...')
                        this.props.history.push("/admin/edit")
                        console.log('Workplace == null', this.state.stdData.studentID)
                    }).catch((err) => {
                        console.log(err);
                        alert('มีบางอย่างผิดพลาด...')
                    })
            }

        } else if (this.state.stdData.status == "ยังไม่ได้ทำงาน") {
            await fetch('http://localhost:7777/deleteworkplace?studentID=' + this.state.stdData.studentID)
                .then(() => {
                    alert('แก้ไขข้อมูลสำเร็จ...')
                    this.props.history.push("/admin/edit")
                }).catch((err) => {
                    console.log(err);
                    alert('มีบางอย่างผิดพลาด...')
                })
        } else {
            alert('มีบางอย่างผิดพลาด...')
        }
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
                <ModalHeader toggle={this.toggle}><span style={{ fontSize: 24, fontWeight: 'bold' }}>แก้ไขข้อมูลการทำงาน</span></ModalHeader>
                <ModalBody>
                    <div align="left">
                        <Form>
                            <div className="row">
                                <div className="col-3" style={{ marginBottom: 20 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" onChange={(e) => this.setState(Object.assign(this.state.stdData, { status: e.target.value }))} value="ทำงานแล้ว" checked={this.state.stdData.status == "ทำงานแล้ว" ? true : false} />{' '}
                                            ทำงานแล้ว
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className="col-3" style={{ marginBottom: 20 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" onChange={(e) => this.setState(Object.assign(this.state.stdData, { status: e.target.value }))} value="ยังไม่ได้ทำงาน" checked={this.state.stdData.status == "ยังไม่ได้ทำงาน" ? true : false} />{' '}
                                            ยังไม่ได้ทำงาน
                                        </Label>
                                    </FormGroup>
                                </div>
                                {this.state.stdData.status == "ทำงานแล้ว" && (
                                    <React.Fragment>
                                        <div className="col-12">
                                            <FormGroup>
                                                <Label>ชื่อสถานที่ทำงาน</Label>
                                                <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { Workplace: e.target.value }))} value={this.state.stdData.Workplace} />
                                            </FormGroup>
                                        </div>
                                        <div className="col-12">
                                            <FormGroup>
                                                <Label>ที่อยู่</Label>
                                                <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { Address: e.target.value }))} value={this.state.stdData.Address} />
                                            </FormGroup>
                                        </div>
                                        <div className="col-6">
                                            <FormGroup>
                                                <Label>จังหวัด</Label>
                                                <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { Province: e.target.value }))} value={this.state.stdData.Province} />
                                            </FormGroup>
                                        </div>
                                        <div className="col-6">
                                            <FormGroup>
                                                <Label>ติดต่อ</Label>
                                                <Input type="text" onChange={(e) => this.setState(Object.assign(this.state.stdData, { Contact: e.target.value }))} value={this.state.stdData.Contact} />
                                            </FormGroup>
                                        </div>
                                    </React.Fragment>
                                )}
                            </div>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._updateWorkplace}>ตกลง</Button>
                    <Button color="danger" onClick={this.toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal >
        )
    }
}

export default withRouter(EditWorkplace);