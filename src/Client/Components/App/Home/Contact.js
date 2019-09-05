import React, { Component } from 'react';
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap';
import './Contact.css';
import contactform from '../../../Assets/Images/contactform.png';
import mail from '../../../Assets/Images/mail.svg';
import phone from '../../../Assets/Images/phone.svg';
import { connect } from 'react-redux';
import location from '../../../Assets/Images/location.svg';
import { withRouter } from 'react-router-dom';
import { contactUs } from '../../../Actions/home';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			message: ''
		}
	}

	send = () => {
		const data = {
			name: this.state.name,
			email: this.state.email,
			message: this.state.message
		}

		console.log(data, "------------------");

		if (data.name.length < 1 || data.email.length < 1 || data.message.length < 1 || !this.validateEmail(data.email)) {
			ToastsStore.error('Please fill in all the fields...');
		} else {
			const { contactUs } = this.props;
			contactUs(data);
		}
	}

	componentDidMount() {
		if (this.props.contact && this.props.contact.name) {
			this.setState({name: this.props.contact.name});
			this.setState({email: this.props.contact.email});		
		}
	}

	handleName = (e) => {
		console.log(e.target);
		this.setState({name: e.target.value});
	}

	handleEmail = (e) => {
		this.setState({email: e.target.value});
	}

	handleMessage = (e) => {
		this.setState({message: e.target.value});
	}

	validateEmail = (email) => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

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
											    {this.props.contact ? 
											    											    	<Form.Control type='text' style={{ width: '100%' }} defaultValue={this.props.contact.name} onChange={(e) => this.handleName(e)}/> :
											    											    	<Form.Control type='text' style={{ width: '100%' }} onChange={(e) => this.handleName(e)}/> }
											  </Form.Group>
											</Col>
											<Col md={6} sm={12} xs={12}>
											  <Form.Group controlId='formBasicPhoneNumber'>
											    <Form.Label>PhoneNumber*</Form.Label>
											   { this.props.contact ? 
											   											    <Form.Control type='text' style={{ width: '100%' }} defaultValue={this.props.contact.phone_no}/> :
											   											    <Form.Control type='text' style={{ width: '100%' }} />}
											  </Form.Group>
											</Col>
										</Row>

										<Row>
											<Col>
											  <Form.Group controlId='formBasicEmailAddress'>
											    <Form.Label>Email Address</Form.Label>
											    {this.props.contact ? 
											    											    <Form.Control type='text' style={{ width: '100%' }} defaultValue={this.props.contact.email} onChange={(e) => this.handleEmail(e)}/> :
											    											    <Form.Control type='email' onChange={(e) => this.handleEmail(e)}/>}
											  </Form.Group>
											</Col>
										</Row>

										<Row>
											<Col>
											  <Form.Group controlId='formBasicMessage'>
											    <Form.Label>Message</Form.Label>
											    <Form.Control as='textarea' rows='6' onChange={(e) => this.handleMessage(e)} />
											  </Form.Group>
											</Col>
										</Row>
									 	<div className='d-flex justify-content-center'>
									  	<Button variant='primary' className='send-button' onClick={this.send}>
									    	Send
									  	</Button>
									  </div>
									</Form>
								</div>
							</div>
						</Col>
					</Row>	
				</Container>
                <ToastsContainer store={ToastsStore}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	contact: state.booking.contact
});

export default withRouter(connect(mapStateToProps, { contactUs })(Contact));