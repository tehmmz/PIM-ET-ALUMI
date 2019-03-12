import React, { Component } from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

export default class Footer extends Component {
    render() {
        return (
            <MDBFooter color="blue" className="font-small pt-4 mt-4 fixed-bottom">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.pim.ac.th"> PIM.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }
}