import React, { Component } from 'react';
import { FaMapMarkerAlt, FaPhone, FaAddressCard, FaFacebook } from 'react-icons/fa';

export default class Contact extends Component {

    render() {
        return (
            <div className="container" style={{ marginTop: 5 }} align="center">
                <div>
                    <img src="https://www.pim.ac.th/uploads/content/2015/10/o_1a21hj8a0g3h16gbh3kj1pqaja.png" height={400} width={400} />
                </div>
                <div>
                    <span style={{ fontSize: 40, fontWeight: 'bold' }}>Contact US</span>
                </div>
                <div>
                    <FaPhone size={30} style={{ paddingRight: 10 }} />
                    <span>02-855-0000</span>
                </div>
                <div>
                    <FaMapMarkerAlt size={30} style={{ paddingRight: 10 }} />
                    <span>85/1 หมู่ 2 ถ.แจ้งวัฒนะ ต.บางตลาด อ.ปากเกร็ด จังหวัด นนทบุรี 11120</span>
                </div>
                <div>
                    <FaAddressCard size={30} style={{ paddingRight: 10 }} />
                    <span>contactreg@pim.ac.th</span>
                </div>
                <div>
                    <FaFacebook size={30} style={{ paddingRight: 10 }} />
                    <span>www.facebook.com/pimfanpage</span>
                </div>
            </div>
        )
    }
}

// AIzaSyAbuszt8U4eD - dzHwg6GzUG8Z6c3pZGvUA