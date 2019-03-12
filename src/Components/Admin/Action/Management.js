import React, { Component } from 'react';

import { Button, Label, Input, Spinner } from 'reactstrap';

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

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            numberID: "",
            email: "",
            educationLevel: "",
            major: "",
            year: "",
            image: "",
            status: "",
            workplace: "",
            province: "",
            address: "",
            contact: "",
            spinner: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log('LoggedIn : Successfully..')
            } else {
                this.props.history.push("/cp_login")
            }
        })
    }

    _addStd = async () => {
        await firebase.storage().ref(this.state.image.name).put(this.state.image).then(() => {
            firebase.storage().ref(this.state.image.name).getDownloadURL().then((url) => {
                this.setState({
                    image: url
                }, () => {
                    fetch('http://localhost:7777/admin/add?fullName=' + this.state.name + "&studentID=" + this.state.numberID
                        + "&major=" + this.state.major + "&yearGraduate=" + this.state.year + "&educationLevel=" + this.state.educationLevel + "&email=" + this.state.email
                        + "&thumnail=" + url + "&status=" + this.state.status)
                        .then(() => {
                            if (this.state.status == "ยังไม่ได้ทำงาน") {
                                this.setState({
                                    spinner: true
                                }, () => {
                                    alert('เพิ่มข้อมูลสำเร็จ...')
                                    window.location.reload();
                                })
                                console.log('http://localhost:7777/admin/add?fullName=' + this.state.name + "&studentID=" + this.state.numberID
                                    + "&major=" + this.state.major + "&yearGraduate=" + this.state.year + "&educationLevel=" + this.state.educationLevel + "&email=" + this.state.email
                                    + "&thumnail=" + url + "&status=" + this.state.status)
                            } else {
                                fetch('http://localhost:7777/admin/addworkplace?status=' + this.state.status + "&workplace=" + this.state.workplace
                                    + "&address=" + this.state.address + "&province=" + this.state.province + "&contact=" + this.state.contact + "&studentID=" + this.state.numberID)
                                    .then(() => {
                                        this.setState({
                                            spinner: true
                                        }, () => {
                                            alert('เพิ่มข้อมูลสำเร็จ...');
                                            window.location.reload();
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                })
            })
        })
    }

    render() {
        return (
            <div>
                <div className="container" style={{ paddingTop: 20 }}>
                    <div align="center" className="shadow-none p-3 mb-5 bg-light rounded">
                        <Label style={{ fontWeight: 'bold', fontSize: 20 }}>เพิ่มข้อมูลนักศึกษา</Label>
                    </div>
                    <form>
                        <div className="row" style={{ marginLeft: 100, marginRight: 100 }}>
                            <div className="col-6">
                                <Label>ชื่อ :</Label> <Input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                            <div className="col-6">
                                <Label>เลขประจำตัวนักศึกษา :</Label> <Input type="number" onChange={(e) => this.setState({ numberID: e.target.value })} />
                            </div>
                            <div className="col-6" style={{ marginTop: 10 }}>
                                <Label>อีเมลล์ :</Label> <Input type="text" onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="col-3" style={{ marginTop: 10 }}>
                                <Label>ระดับการศึกษา :</Label>
                                <Input type="select" onChange={(e) => this.setState({ educationLevel: e.target.value })}>
                                    <option value="กรุณาเลือกระดับการศึกษา">กรุณาเลือกระดับการศึกษา</option>
                                    <option value="ปริญญาตรี">ปริญญาตรี</option>
                                    <option value="ปริญญาโท">ปริญญาโท</option>
                                    <option value="ปริญญาเอก">ปริญญาเอก</option>
                                </Input>
                            </div>
                            <div className="col-3" style={{ marginTop: 10 }}>
                                <Label>สาขาวิชา :</Label>
                                <Input type="select" onChange={(e) => this.setState({ major: e.target.value })}>
                                    <option value="กรุณาเลือกสาขาวิชา">กรุณาเลือกสาขาวิชา</option>
                                    <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                                    <option value="วิศวกรรมอุตสาหการ">วิศวกรรมอุตสาหการ</option>
                                    <option value="วิศวกรรมยานยนต์">วิศวกรรมยานยนต์</option>
                                    <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
                                </Input>
                            </div>
                            <div className="col-4" style={{ marginTop: 10 }}>
                                <Label>ปีการศึกษาที่จบ :</Label> <Input type="number" onChange={(e) => this.setState({ year: e.target.value })}  />
                            </div>
                            <div className="col-4" style={{ marginTop: 10 }}>
                                <Label>สถานะ :</Label>
                                <Input type="select" onChange={(e) => this.setState({ status: e.target.value })}>
                                    <option value="กรุณาเลือกสถานะ">กรุณาเลือกสถานะ</option>
                                    <option value="ยังไม่ได้ทำงาน">ยังไม่ทำงาน</option>
                                    <option value="ทำงานแล้ว">ทำงานแล้ว</option>
                                </Input>
                            </div>
                            <div className="col-4" style={{ marginTop: 10 }}>
                                <Label>รูปประจำตัวนักศึกษา :</Label> <Input type="file" onChange={(e) => this.setState({ image: e.target.files[0] })} />
                            </div>
                            {this.state.status == "ทำงานแล้ว" ?
                                <React.Fragment>
                                    <div className="col-8" style={{ marginTop: 10 }}>
                                        <Label>ชื่อสถานที่ทำงาน :</Label>
                                        <Input type="text" onChange={(e) => this.setState({ workplace: e.target.value })} />
                                    </div>
                                    <div className="col-4" style={{ marginTop: 10 }}>
                                        <Label>จังหวัด :</Label>
                                        <Input type="text" onChange={(e) => this.setState({ province: e.target.value })} />
                                    </div>
                                    <div className="col-8" style={{ marginTop: 10 }}>
                                        <Label>ที่อยู่ :</Label>
                                        <Input type="text" onChange={(e) => this.setState({ address: e.target.value })} />
                                    </div>
                                    <div className="col-4" style={{ marginTop: 10 }}>
                                        <Label>ติดต่อที่ทำงาน :</Label>
                                        <Input type="text" onChange={(e) => this.setState({ contact: e.target.value })} />
                                    </div>
                                </React.Fragment> :
                                <div>
                                </div>}
                            <div className="col-6" style={{ marginTop: 30 }} align="center">
                                <Button color="primary" style={{ width: "100%" }} onClick={() => this._addStd()}>ตกลง</Button>
                            </div>
                            <div className="col-6" style={{ marginTop: 30 }} align="center">
                                <Button color="danger" style={{ width: "100%" }} type="reset">ยกเลิก</Button>
                            </div>
                        </div>
                    </form>
                    {this.state.spinner && (
                        <div align="center" style={{ paddingTop: 30 }}>
                            <Spinner color="primary" />
                        </div>
                    )}
                </div>
            </div >
        )
    }
}


export default withRouter(Management);

