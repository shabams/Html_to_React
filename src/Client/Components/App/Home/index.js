import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../Layouts/Header';
import Main from './Main';
import Contact from './Contact';
import ScheduleNow from './ScheduleNow';
// import Footer from '../Layouts/Footer';

class HomePage extends Component {
	render() {
    return (
      <div className="home">
        <Header />
        <Main />
        <Contact />
        <ScheduleNow />
      </div>
    );
	}
}

export default withRouter(HomePage);