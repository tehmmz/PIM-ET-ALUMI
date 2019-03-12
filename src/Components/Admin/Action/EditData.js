import React, { Component } from 'react';

import { Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

import axios from 'axios';

import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css'

import { withRouter } from 'react-router-dom';

import EditStd from '../Action/EditStd';

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

class EditData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTxt: "",
            Alumni: [],
            workPlace: [],
            modal: false,
            isOpen: false,
            index: ""
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this._allStd();
            } else {
                this.props.history.push("/cp_login")
            }
        })
    }


    _openLightBox = (res) => {
        this.setState({
            isOpen: true,
            index: this.state.Alumni[res].thumnail
        })

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    _GetWorkplace = async (stuID) => {
        await axios.get('http://localhost:7777/checkstatus?stuID=' + stuID)
            .then((res) => {
                if (res.data.data.length >= 1) {
                    this.setState({
                        workPlace: res.data.data[0]
                    }, this.toggle())
                    console.log(this.state.workPlace)
                } else {
                    alert('ไม่พบข้อมูลการทำงาน...')
                }
            })
    }

    _allStd = async () => {
        await axios.get('http://localhost:7777/allstd')
            .then((res) => {
                this.setState({
                    Alumni: res.data.result
                })
            })
    }

    _SearchStd = async (searchTxt) => {
        await axios.get('http://localhost:7777/searchStu?stuName=' + searchTxt)
            .then((res) => {
                this.setState({
                    Alumni: res.data.data
                })
            })
    }

    _deleteStd = (stdID) => {
        confirmAlert({
            message: 'ต้องการลบข้อมูลใช่หรือไม่ ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch('http://localhost:7777/deletestd?studentID=' + stdID)
                            .then(() => {
                                fetch('http://localhost:7777/deleteworkplace?studentID=' + stdID)
                                    .then(() => {
                                        alert('ลบข้อมูลสำเร็จ..')
                                    })
                            })
                            .then(() => {
                                this._allStd();
                            })
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    _editChoice = (stdID, stdsID) => {
        confirmAlert({
            message: 'ท่านต้องการแก้ไขในส่วนใด ?',
            buttons: [
                {
                    label: 'ข้อมูลนักศึกษา',
                    onClick: () => {
                        this.props.history.push("/admin/editstd", { stdID: stdID, stdsID: stdsID })
                    }
                },
                {
                    label: 'ข้อมูลการทำงาน',
                    onClick: () => {
                        this.props.history.push("/admin/editworkplace", { stdID: stdsID })
                    }
                },
                {
                    label: 'ยกเลิก',
                }
            ]
        })
    }

    render() {
        return (
            <div className="container" style={{ paddingTop: 20 }}>
                <div align="center" className="shadow-none p-3 mb-5 bg-light rounded">
                    <Label style={{ fontWeight: 'bold', fontSize: 20 }}>จัดการข้อมูลนักศึกษา</Label>
                </div>
                <div align="right" style={{ marginBottom: 10 }}>
                    <Input placeholder="ค้นหาชื่อ..." onChange={(e) => this._SearchStd(e.target.value)} />
                </div>
                {this.state.Alumni.length >= 1 && (
                    <Table bordered hover style={{ color: 'black' }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col" style={{ textAlign: 'center' }}>รูปนักศึกษา</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ชื่อ-นามสกุล (Name)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>รหัสนิสิต (Student ID)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>สาขา (Major)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ปีการศึกษา (Year Graduate)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ข้อมูลการทำงาน</th>
                                <th scope="col" style={{ textAlign: 'center' }}>แก้ไข</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.Alumni).map((data, key) => (
                                <React.Fragment key={key}>
                                    <tr style={{ textAlign: 'center' }} key={"sID" + key}>
                                        <td style={{ textAlign: 'center' }}><img src={this.state.Alumni[data].thumnail} height={55} width={55} alt="stu" onClick={() => this._openLightBox([data])} /></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].fullName}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].studentID}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].major}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].yearGraduate}</span></td>
                                        <td style={{ textAlign: 'center' }}><span><Button color="primary" onClick={() => this._GetWorkplace(this.state.Alumni[data].studentID)}>X</Button></span></td>
                                        <td style={{ textAlign: 'center' }}><Button color="warning" onClick={() => this._editChoice(this.state.Alumni[data].sID, this.state.Alumni[data].studentID)}>X</Button></td>
                                        <td style={{ textAlign: 'center' }}><Button color="danger" onClick={() => this._deleteStd(this.state.Alumni[data].studentID)}>X</Button></td>
                                    </tr>
                                    {this.state.isOpen && (
                                        <Lightbox
                                            mainSrc={this.state.index}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                )}
                {/* Modal Workpalce */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}><span style={{ fontSize: 24, fontWeight: 'bold' }}>ข้อมูลการทำงาน</span></ModalHeader>
                    <ModalBody>
                        <div align="left">
                            <span style={{ fontWeight: 'bold' }}>สถานะการทำงาน: </span><span>{this.state.workPlace.Status}</span><br />
                            <span style={{ fontWeight: 'bold' }}>สถานที่ทำงาน: </span><span>{this.state.workPlace.Workplace}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ที่อยู่ที่ทำงาน: </span><span>{this.state.workPlace.Address}</span><br />
                            <span style={{ fontWeight: 'bold' }}>จังหวัดที่ทำงาน: </span><span>{this.state.workPlace.Province}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ช่องทางการติดต่อที่ทำงาน: </span><span>{this.state.workPlace.Contact}</span><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default withRouter(EditData);