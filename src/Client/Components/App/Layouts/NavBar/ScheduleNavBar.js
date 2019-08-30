import React, { Component } from 'react';
import {Navbar , Nav, Image } from 'react-bootstrap';
import logo from '../../../../Assets/Images/logo-image.svg';
import './index.css';

class ScheduleNavBar extends Component {
	render() {
		return(
			<>
				<Navbar expand='lg'>
          <Navbar.Brand href='/' style={{ textAlign: 'left' }}>
            <Image src={logo} alt='Logo' />
            <h5 style={{ color: '#374354', fontSize: 24, fontWeight: 'bold', letterSpacing: '0.8px'}}>ease</h5>
            <h6 style={{ color: '#374354', fontSize: 24, letterSpacing: '0.8px'}}>environment</h6>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' style={{border: 'none',}}/>
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav>
              <Nav.Link href='#how-it-works'>How It Works</Nav.Link>
              <Nav.Link href='#home'>My Bookings</Nav.Link>
              <Nav.Link href='#about-us'>About Us</Nav.Link>
              <Nav.Link href='#contact-us'>Contact Us</Nav.Link>
              <Nav.Link href='#link'>Schedule Now</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      	</Navbar>
			</>
		)
	}
}

export default ScheduleNavBar;