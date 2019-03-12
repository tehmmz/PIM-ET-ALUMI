import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Worked extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTxt: "",
            worked: [],
            workPlace: [],
            modal: false,
        }
    }

    componentDidMount() {
        this._getWorker();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    _getWorker = async () => {
        await axios.get('http://localhost:7777/worked')
            .then((res) => {
                this.setState({
                    worked: res.data.data
                })
            })
    }

    // _searchStudent = async () => {
    //     await fetch('http://localhost:7777/searchStu?stuName=' + this.state.searchTxt)
    //         .then((res) => res.json())
    //         .then((response) => {
    //             this.setState(Object.assign(this.state.student, {
    //                 stuImg: response.data[0].thumnail,
    //                 stuName: response.data[0].fullName,
    //                 stuID: response.data[0].studentID,
    //                 stuMajor: response.data[0].major,
    //                 stuYear: response.data[0].yearGraduate
    //             }
    //             ));
    //         })
    // }

    _searchStudent = async (txt) => {
        await fetch('http://localhost:7777/searchStu?stuName=' + txt)
            .then((res) => res.json())
            .then((response) => {
                if (response.data.length >= 1) {
                    this.setState({
                        worked: response.data
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

    render() {
        return (
            <div className="container" style={{ marginTop: 30 }}>
                <div align="center" style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 30, fontWeight: 'bold' }}>Student Worked</span>
                </div>
                <div align="right" style={{ paddingBottom: 10 }}>
                    <Input placeholder="ค้นหาชื่อ..." onChange={(e) => this._searchStudent(e.target.value)} />
                </div>
                {this.state.worked.length >= 1 && (
                    <Table bordered hover style={{ color: 'black' }}>
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
                            {Object.keys(this.state.worked).map((data, key) => (
                                <tr style={{ textAlign: 'center' }} key={"sID" + key}>
                                    <td style={{ textAlign: 'center' }}><img src={this.state.worked[data].thumnail} height={55} width={55} alt="stu" /></td>
                                    <td style={{ textAlign: 'center' }}><span>{this.state.worked[data].fullName}</span></td>
                                    <td style={{ textAlign: 'center' }}><span>{this.state.worked[data].studentID}</span></td>
                                    <td style={{ textAlign: 'center' }}><span>{this.state.worked[data].major}</span></td>
                                    <td style={{ textAlign: 'center' }}><span>{this.state.worked[data].yearGraduate}</span></td>
                                    <td style={{ textAlign: 'center' }}><span><Button color="primary" onClick={() => this._GetWorkplace(this.state.worked[data].studentID)}>ดูข้อมูลการทำงาน</Button></span></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Modal Workpalce */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}><span style={{ fontSize: 24, fontWeight: 'bold' }}>ข้อมูลการทำงาน</span></ModalHeader>
                    <ModalBody>
                        <div align="left">
                            <span style={{ fontWeight: 'bold' }}>สถานที่ทำงาน: </span><span>{this.state.workPlace.Workplace}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ที่อยู่ที่ทำงาน: </span><span>{this.state.workPlace.Address}</span><br />
                            <span style={{ fontWeight: 'bold' }}>จังหวัดที่ทำงาน: </span><span>{this.state.workPlace.Province}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ช่องทางการติดต่อที่ทำงาน: </span><span>{this.state.workPlace.Contact}</span><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}