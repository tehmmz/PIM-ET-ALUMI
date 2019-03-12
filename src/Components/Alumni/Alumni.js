import React, { Component } from 'react';

import axios from 'axios';

import { Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

export default class Alumni extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Alumni: [],
            workPlace: [],
            searchTxt: "",
            modal: false,
            info: false,
            imgProfile: false,
            isOpen: false,
            index: ""
        }
    }

    componentDidMount() {
        this._GetAlumniData();
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

    toggleImgProfile = () => {
        this.setState({
            imgProfile: !this.state.imgProfile
        })
    }


    _GetAlumniData = async (event = 10) => {
        await axios.get('http://localhost:7777/alumni?limit=' + event)
            .then((res) => {
                this.setState({
                    Alumni: res.data.result
                })
            })
    }

    _GetWorkplace = async (stuID) => {
        await axios.get('http://localhost:7777/checkstatus?stuID=' + stuID)
            .then((res) => {
                console.log(res.data.data[0])
                this.setState({
                    workPlace: res.data.data[0]
                }, this.toggle())
            })
    }

    _GetImgProfile = async (stuID) => {
        await axios.get('http://localhost:7777/checkstatus?stuID=' + stuID)
            .then((res) => {
                this.setState({
                    workPlace: res.data.data[0]
                }, this.toggleImgProfile())
            })
    }

    _SearchStd = async (event) => {
        await axios.get('http://localhost:7777/searchStu?stuName=' + event)
            .then((res) => {
                this.setState({
                    Alumni: res.data.data
                })
            })
    }

    _openLightBox = (res) => {
        this.setState({
            isOpen: true,
            index: this.state.Alumni[res].thumnail
        })

    }



    render() {
        return (
            <div className="container" style={{ paddingTop: 30, marginBottom: 200 }}>
                {this.state.Alumni.length >= 1 ?
                    <React.Fragment>
                        <React.Fragment>
                            <div className="row" style={{ paddingLeft: 15 }}>
                                <label style={{ paddingRight: 10, marginTop: 5 }}>Show </label>
                                <Input type="select" style={{ width: 70, marginBottom: 10 }} onChange={(e) => this._GetAlumniData(e.target.value)}>
                                    <option value="10">10</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="500">500</option>
                                </Input>
                                <label style={{ paddingLeft: 10, marginTop: 5 }}> entries</label>
                                <label style={{ marginLeft: 550, marginTop: 5 }}> Search: </label>
                                <Input type="text" style={{ width: 300, marginLeft: 25 }} onChange={(e) => this._SearchStd(e.target.value)} />
                            </div>
                            <Table bordered hover style={{ color: 'black' }}>
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th scope="col" style={{ textAlign: 'center' }}>รูปนักศึกษา</th>
                                        <th scope="col" style={{ textAlign: 'center' }} onClick={() => this._SortByName()}>ชื่อ-นามสกุล (Name)</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>รหัสนิสิต (Student ID)</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>สาขา (Major)</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>ปีการศึกษา (Year Graduate)</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>ข้อมูล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.state.Alumni).map((data, key) => (
                                        <React.Fragment>
                                            <tr style={{ textAlign: 'center' }} key={"sID" + key}>
                                                <td style={{ textAlign: 'center' }}><img src={this.state.Alumni[data].thumnail} height={55} width={55} alt="stu" onClick={() => this._openLightBox([data])} /></td>
                                                <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].fullName}</span></td>
                                                <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].studentID}</span></td>
                                                <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].major}</span></td>
                                                <td style={{ textAlign: 'center' }}><span>{this.state.Alumni[data].yearGraduate}</span></td>
                                                <td style={{ textAlign: 'center' }}><span><Button color="primary" onClick={() => this._GetWorkplace(this.state.Alumni[data].studentID)}>ดูข้อมูล</Button></span></td>
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
                        </React.Fragment>
                    </React.Fragment> :
                    <React.Fragment>
                        <div align='center' style={{ paddingTop: 20 }}>
                            <span style={{ fontWeight: 'bold', fontSize: 20 }}>ยังไม่มีนักศึกษาในระบบ...</span>
                        </div>
                    </React.Fragment>}

                {/* Modal Workpalce */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}><span style={{ fontSize: 24, fontWeight: 'bold' }}>ข้อมูลศิษย์เก่า</span></ModalHeader>
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
                        <Button color="primary" onClick={this.toggleInfo}>ข้อมูลนักศึกษา</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal Profile */}
                <Modal isOpen={this.state.info} toggle={this.toggleInfo} size="md">
                    <ModalHeader toggle={this.toggleInfo}><span style={{ fontSize: 24, fontWeight: 'bold' }}>ข้อมูลนักศึกษา</span></ModalHeader>
                    <ModalBody>
                        <div align="left">
                            <div align="center">
                                <img src={this.state.workPlace.thumnail} height={150} width={150} style={{ marginBottom: 20 }} /><br />
                            </div>
                            <span style={{ fontWeight: 'bold' }}>ชื่อ-นามสกุล: </span><span>{this.state.workPlace.fullName}</span><br />
                            <span style={{ fontWeight: 'bold' }}>สาขา: </span><span>{this.state.workPlace.major}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ปีที่จบการศึกษา: </span><span>{this.state.workPlace.yearGraduate}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ระดับปริญญา: </span><span>{this.state.workPlace.educationLevel}</span><br />
                            <span style={{ fontWeight: 'bold' }}>ช่องทางการติดต่อ: </span><span>{this.state.workPlace.email}</span><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleInfo}>ข้อมูลการทำงาน</Button>{' '}
                        <Button color="secondary" onClick={this.toggleInfo}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal Image Profile */}
                <Modal isOpen={this.state.imgProfile} toggle={this.toggleImgProfile} size="md">
                    <ModalHeader toggle={this.toggleImgProfile}><span style={{ fontSize: 24, fontWeight: 'bold' }}>รูปนักศึกษา</span></ModalHeader>
                    <ModalBody>
                        <div align="center">
                            <img src={this.state.workPlace.thumnail} height={150} width={150} /><br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="secondary" onClick={this.toggleInfo}>ข้อมูลนักศึกษา</Button> */}
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}