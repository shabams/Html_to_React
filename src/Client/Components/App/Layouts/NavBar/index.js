import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import {Navbar , Nav, Image } from 'react-bootstrap';
import logo from './logo.png';
import './index.css';

class NavBar extends Component {
	render() {
		return(
			<>
				<Navbar expand='lg'>
          <Navbar.Brand href='#home'>
            <Image src={logo} alt='Logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' style={{border: 'none'}}/>
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav>
              <Nav.Link href='#how-it-works'>How It Works</Nav.Link>
              <Nav.Link href='#home'>My Bookings</Nav.Link>
              <Nav.Link href='#aboutUs'>About Us</Nav.Link>
              <Nav.Link href='#contactUs'>Contact Us</Nav.Link>
              <Nav.Link href='#' onClick={() => this.props.history.push('/Schedule2')}>Schedule Now</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      	</Navbar>
			</>
		)
	}
}

export default withRouter(NavBar);