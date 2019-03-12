import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: [],
            workPlace: [],
            searchTxt: "",
            searchErr: "",
            modal: false,
            info: false,

        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleInfo = () => {
        this.setState({
            info: !this.state.info
        })
    }

    _searchStudent = async (txt) => {
        await fetch('http://localhost:7777/searchStu?stuName=' + txt)
            .then((res) => res.json())
            .then((response) => {
                if (response.data.length >= 1) {
                    this.setState({
                        student: response.data
                    })
                } else {
                    this.setState({
                        searchTxt: "ไม่พบข้อมูลในระบบ..."
                    })
                }
            })
    }

    _GetWorkplace = async (stuID) => {
        await axios.get('http://localhost:7777/checkstatus?stuID=' + stuID)
            .then((res) => {
                if (res.data.data.length == 0) {
                    alert('ไม่พบข้อมูลการทำงาน')
                } else {
                    this.setState({
                        workPlace: res.data.data[0]
                    }, this.toggle())
                }
            })
    }

    _openLightBox = (res) => {
        this.setState({
            isOpen: true,
            index: this.state.student[res].thumnail
        })

    }

    render() {
        return (
            <div className="container" style={{ marginTop: 30 }}>
                <div align="center" style={{ paddingBottom: 10 }}>
                    <h3 style={{ fontWeight: 'bold' }}>ค้นหาข้อมูลนักศึกษา</h3>
                </div>
                <div align="right">
                    <Input placeholder="ค้นหาชื่อ..." onChange={(e) => this._searchStudent(e.target.value)} />
                </div>
                {this.state.student.length >= 1 ? <div>
                    <Table bordered hover style={{ color: 'black', marginTop: 20 }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col" style={{ textAlign: 'center' }}>รูปนักศึกษา</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ชื่อ-นามสกุล (Name)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>รหัสนิสิต (Student ID)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>สาขา (Major)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ปีการศึกษา (Year Graduate)</th>
                                <th scope="col" style={{ textAlign: 'center' }}>ข้อมูลการทำงาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.student).map((data, key) => (
                                <React.Fragment>
                                    <tr style={{ textAlign: 'center' }} key={"sID" + key}>
                                        <td style={{ textAlign: 'center' }}><img src={this.state.student[data].thumnail} height={55} width={55} alt="stu" onClick={() => this._openLightBox([data])} /></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.student[data].fullName}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.student[data].studentID}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.student[data].major}</span></td>
                                        <td style={{ textAlign: 'center' }}><span>{this.state.student[data].yearGraduate}</span></td>
                                        <td style={{ textAlign: 'center' }}><span><Button color="primary" onClick={() => this._GetWorkplace(this.state.student[data].studentID)}>ดูข้อมูลการทำงาน</Button></span></td>
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
                </div> : <div><span style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.searchErr}</span></div>}

                {/* Modal Workpalce */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}>ข้อมูลศิษย์เก่า</ModalHeader>
                    <ModalBody>
                        <div align="left">
                            <h4>ข้อมูลการทำงาน</h4>
                            <span style={{ fontWeight: 'bold' }}>สถานะการทำงาน: </span><span>{this.state.workPlace.Status}</span><br />
                            <span style={{ fontWeight: 'bold' }}>สถานที่ทำงาน: </span><span>{this.state.workPlace.Workplace}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ที่อยู่ที่ทำงาน: </span><span>{this.state.workPlace.Address}</span><br />
                            <span style={{ fontWeight: 'bold' }}>จังหวัดที่ทำงาน: </span><span>{this.state.workPlace.Province}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ช่องทางการติดต่อที่ทำงาน: </span><span>{this.state.workPlace.Contact}</span><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleInfo}>ข้อมูลนักศึกษา</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.info} toggle={this.toggleInfo} size="lg">
                    <ModalHeader toggle={this.toggleInfo}>ข้อมูลศิษย์เก่า</ModalHeader>
                    <ModalBody>
                        <div align="center">
                            <h4>ข้อมูลนักศึกษา</h4>
                            <img src={this.state.workPlace.thumnail} height={150} width={150} /><br />
                            <span style={{ fontWeight: 'bold' }}>ชื่อ-นามสกุล: </span><span>{this.state.workPlace.fullName}</span><br />
                            <span style={{ fontWeight: 'bold' }}>สาขา: </span><span>{this.state.workPlace.major}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ปีที่จบการศึกษา: </span><span>{this.state.workPlace.yearGraduate}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ระดับปริญญา: </span><span>{this.state.workPlace.educationLevel}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ช่องทางการติดต่อ: </span><span>{this.state.workPlace.email}</span><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleInfo}>ข้อมูลการทำงาน</Button>{' '}
                        <Button color="secondary" onClick={this.toggleInfo}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
