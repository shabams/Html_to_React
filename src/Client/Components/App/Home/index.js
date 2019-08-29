import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../Layouts/Header';
import Main from './Main';
import Contact from './Contact';
import ScheduleNow from './ScheduleNow';
import Footer from '../Layouts/Footer';

import  { Image } from 'react-bootstrap';

import mainbackleft from '../../../Assets/Images/mainbackleft.png';
import mainbackright from '../../../Assets/Images/mainbackright.png';
import './index.css';

class HomePage extends Component {
	render() {
    return (
      <div className="home">
        <Image src={ mainbackleft } className='main-back-left' />
        <Image src={ mainbackright } className='main-back-right' /> 
        <Header />
        <Main />
        <Contact />
        <ScheduleNow />
        <Footer />
      </div>
    );
	}
}

export default withRouter(HomePage);