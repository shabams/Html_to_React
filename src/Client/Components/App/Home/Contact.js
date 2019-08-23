import React, { Component } from 'react';
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap';
import './Contact.css';
import contactform from '../../../Assets/Images/contactform.png';

class Contact extends Component {
	render() {
		return(
			<div className='contact'>
				<Container fluid>
					<Row className='above-header'>
						<Col className='above-header-left'>
							<h1 className='above-header-title'>We handle cleaning,</h1>
							<h1 className='above-header-sub-title'>So you focus on what matters.</h1>
						</Col>
						<Col className='contact-us-right'>
							<div className='contact-us'>
								<Image src={contactform} />
								<div className='contact-us-form'>
									<h4 className='contact-us-form-title'>We’d love to hear from you!</h4>
									<h6 style={{ color: '#374354' }}>Leave us a message and we’ll make sure to get back to you as soon as we can.</h6>
									<Form className='contact-us-form-inside'>
										<Row>
											<Col>
											  <Form.Group controlId='formBasicName'>
											    <Form.Label>Name*</Form.Label>
											    <Form.Control type='text' style={{ width: '100%' }} />
											  </Form.Group>
											</Col>
											<Col>
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