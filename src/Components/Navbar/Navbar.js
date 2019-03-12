import React, { Component } from "react";

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon,
} from "mdbreact";


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

class NavbarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticationStatus: "",
            directLink: ""
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({
                    authenticationStatus: "ออกจากระบบ",
                    directLink: "/signout"
                })
            } else {
                this.setState({
                    authenticationStatus: "เข้าสู่ระบบ",
                    directLink: "/cp_login"
                })
            }
        })
    }

    render() {
        return (
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    <MDBNavLink to="/">
                        <strong className="white-text">PIM-ALUMI</strong>
                    </MDBNavLink>
                </MDBNavbarBrand>
                <MDBNavbarToggler />
                <MDBCollapse id="navbarCollapse3" navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/search">Search</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/worked">Worked</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/contact">Contact</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {this.state.authenticationStatus == "ออกจากระบบ" ?
                            <React.Fragment>
                                <MDBNavItem>
                                    <MDBNavLink className="waves-effect waves-light" to="/admin/management">
                                        <span onClick={() => console.log('login')}>เพิ่มข้อมูลเข้าระบบ</span>
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink className="waves-effect waves-light" to="/admin/edit">
                                        <span onClick={() => console.log('login')}>แก้ไขข้อมูล</span>
                                    </MDBNavLink>
                                </MDBNavItem>
                            </React.Fragment>
                            : <React.Fragment></React.Fragment>}
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to={this.state.directLink}>
                                <span onClick={() => console.log('login')}>{this.state.authenticationStatus}</span>
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default NavbarPage;