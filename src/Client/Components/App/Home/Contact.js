import React, { Component } from 'react';
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap';
import './Contact.css';
import contactform from '../../../Assets/Images/contactform.png';
import mail from '../../../Assets/Images/mail.png';
import phone from '../../../Assets/Images/phone.png';
import location from '../../../Assets/Images/location.png';

class Contact extends Component {
	render() {
		return(
			<div className='contact' id='contactUs'>
				<Container fluid>
					<h1 className='contact-us-title' style={{ textAlign: 'center', fontWeight: 'bold', color: '#374354' }}>Contact Us</h1>
					<Row className='contact-us'>
						<Col className='contact-us-left d-flex justify-content-center'>
							<div className='d-flex contact-us-left-div'>
								<div className='d-flex justify-content-center'>
									<Image src={phone} style={{width: 26, height: 26}}/>
								</div>
								<h4>+1 123 456 789</h4> 
							</div>
							<div className='d-flex contact-us-left-div'>
								<div className='d-flex justify-content-center'>
									<Image src={mail} style={{ width: 31, height: 25 }} />
								</div>
								<h4>email@ekleeltech</h4> 
							</div>
							<div className='d-flex contact-us-left-div'>
								<div className='d-flex justify-content-center'>
									<Image src={location} style={{ width: 25, height: 35}} />
								</div>
								<h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.</h4> 
							</div>
						</Col>
						<Col className='contact-us-right' style={{ maxWidth: 652 }}>
							<div className='contact-us-f'>
								<div className='contact-us-form'>
									<h4 className='contact-us-form-title'>We’d love to hear from you!</h4>
									<h6 style={{ color: '#374354' }}>Leave us a message and we’ll make sure to get back to you as soon as we can.</h6>
									<Form className='contact-us-form-inside'>
										<Row>
											<Col md={6} sm={12} xs={12}>
											  <Form.Group controlId='formBasicName'>
											    <Form.Label>Name*</Form.Label>
											    <Form.Control type='text' style={{ width: '100%' }} />
											  </Form.Group>
											</Col>
											<Col md={6} sm={12} xs={12}>
											  <Form.Group controlId='formBasicPhoneNumber'>
											    <Form.Label>PhoneNumber*</Form.Label>
											    <Form.Control type='text' style={{ width: '100%' }} />
											  </Form.Group>
											</Col>
										</Row>

										<Row>
											<Col>
											  <Form.Group controlId='formBasicEmailAddress'>
											    <Form.Label>Email Address</Form.Label>
											    <Form.Control type='email'  />
											  </Form.Group>
											</Col>
										</Row>

										<Row>
											<Col>
											  <Form.Group controlId='formBasicMessage'>
											    <Form.Label>Message</Form.Label>
											    <Form.Control as='textarea' rows='6' />
											  </Form.Group>
											</Col>
										</Row>
									 	<div className='d-flex justify-content-center'>
									  	<Button variant='primary' className='send-button'>
									    	Send
									  	</Button>
									  </div>
									</Form>
								</div>
							</div>
						</Col>
					</Row>	
				</Container>
			</div>
		)
	}
}

export default Contact