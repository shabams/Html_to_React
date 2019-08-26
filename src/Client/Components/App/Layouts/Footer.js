import React, { Component } from 'react';
import { Image, Container } from 'react-bootstrap';
import './Footer.css';
import footerlogo from '../../../Assets/Images/logo-footer.png';
import facebook from '../../../Assets/Images/facebook.png';
import twitter from '../../../Assets/Images/twitter.png';
import instagram from '../../../Assets/Images/instagram.png';

class Footer extends Component {
	render() {
		return(
			<Container fluid className='footer'>
				<div className='pre-footer d-flex'>
					<div className='footer-logo'>
						<a href='#home'><Image src={footerlogo} style={{ width: 150, height: 89 }} /> </a>
					</div>
					<div className='footer-quick-access'>
						<h4>Quick Access</h4>
						<div className='d-flex' style={{ flexWrap: 'wrap' }}>
							<div className='access-left'>
								<a href="#"><p>Home</p></a>
								<a href="#"><p>Schedule Now</p></a>
								<a href="#"><p>My Bookings</p></a>
							</div>
							<div className='access-right'>
								<a href="#"><p>Privacy Policy</p></a>
								<a href="#"><p>Contact Us</p></a>
							</div>
						</div>
					</div>
					<div className='footer-social'>
						<h4>Connect With Us</h4>
						<div className='social'>
							<a href='#home'><Image src={facebook} /></a>
							<a href='#home'><Image src={twitter} /></a>
							<a href='#home'><Image src={instagram} /></a>
						</div>
					</div>
				</div>
				<p style={{ textAlign: 'center', color: '#9a9a9a', marginBottom: 20 }}>Ⓒ Ease Environment 2019. All rights reserved.</p>
			</Container>
		)
	}
}

export default Footer;