import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Alumni from './Components/Alumni/Alumni';
import Search from './Components/Search/Search';
import Worked from './Components/Worked/Worked';
import Contact from './Components/Contact/Contact';
import Administrator from './Components/Admin/Administrator';
import Signout from './Components/Admin/Signout';
import Management from './Components/Admin/Action/Management';
import EditData from './Components/Admin/Action/EditData';
import EditStd from './Components/Admin/Action/EditStd';
import EditWorkplace from './Components/Admin/Action/EditWorkplace';
import Status from './Components/Error/Status';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route path="/" component={() => <Alumni />} exact />
            <Route path="/search" component={() => <Search />} />
            <Route path="/worked" component={() => <Worked />} />
            <Route path="/contact" component={() => <Contact />} />
            <Route path="/cp_login" component={() => <Administrator />} />
            <Route path="/admin/management" component={() => <Management />} />
            <Route path="/admin/edit" component={() => <EditData />} />
            <Route path="/admin/editstd" component={() => <EditStd />} />
            <Route path="/admin/editworkplace" component={() => <EditWorkplace />} />
            <Route path="/signout" component={() => <Signout />} />
            <Route component={() => <Status />} />
          </Switch>
          {/* <Footer /> */}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

