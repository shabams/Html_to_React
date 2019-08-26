import React, { Component } from 'react';
import {Navbar , Nav, Image } from 'react-bootstrap';
import logo from '../../../../Assets/Images/logo-footer.png';
import './index.css';

class ScheduleNavBar extends Component {
	render() {
		return(
			<>
				<Navbar expand='lg'>
          <Navbar.Brand href='#home'>
            <Image src={logo} alt='Logo' />
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