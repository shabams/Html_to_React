import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import {Navbar , Nav, Image } from 'react-bootstrap';
// import logo from './logo.png';
import logo from '../../../../Assets/Images/logo-image.svg';
import './index.css';

class NavBar extends Component {
	render() {
		return(
			<>
				<Navbar expand='lg'>
          <Navbar.Brand href='/'>
            <Image src={logo} alt='Logo' />
            <h5 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: '0.8px'}}>ease</h5>
            <h6 style={{ color: 'white', fontSize: 24, letterSpacing: '0.8px'}}>environment</h6>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' style={{border: 'none'}}/>
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav>
              <Nav.Link href='#how-it-works'>How It Works</Nav.Link>
              <Nav.Link href='/Booking1'>My Bookings</Nav.Link>
              <Nav.Link href='#aboutUs'>About Us</Nav.Link>
              <Nav.Link href='#contactUs'>Contact Us</Nav.Link>
              <Nav.Link href='#' className='active' onClick={() => this.props.history.push('/Schedule2')}>Schedule Now</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      	</Navbar>
			</>
		)
	}
}

export default withRouter(NavBar);