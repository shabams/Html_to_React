import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import booking1_image from '../../../Assets/Images/booking1-image.png';
import { connect } from 'react-redux'
import { findBookingInformation } from '../../../Actions/booking';

class Booking1 extends React.Component {
	constructor(props) {
		super(props)
	}

	findBooking = () => {
		const { findBookingInformation } = this.props;
		const data = {
			email: this.email.value,
			phone_no: this.phone_no.value
		}
		findBookingInformation(data);
		this.props.history.push('/Booking2');
	}

	render() {
		console.log(this.props.addBookingInformation);
		return(
			<>
				<div className="booking1" style={{ maxWidth: 1280 }}>
					<div className='booking1-body d-flex'>
						<div className='booking1-image d-flex' style={{ padding: 0 }}>
							<div>
								<Image src={booking1_image} style={{ maxWidth: 522, maxHeight: 503, width: '100%' }} />
							</div>
						</div>

						<div className='booking1-context d-flex justify-content-center' style={{ flexDirection: 'column' }}>
							<h1 className='booking1-context-title' style={{ color: '#12261f' }}>Find Your Booking</h1>
							<h4 style={{ color: '#12261f' }}>Use your email and phone number to find your bookings.</h4>

							<Row className='booking1-row'>
								<Col md={4} sm={4} xm={12}>
									<Form.Group controlId='formBasicEmailAddress'>
										<Form.Label>Email Address*</Form.Label>
										<Form.Control type='email' ref={input => this.email = input} defaultValue={this.props.addBookingInformation.email} />
									</Form.Group>
								</Col>

								<Col md={4} sm={4} xm={12}>
									<Form.Group controlId='formBasicPhoneNumber'>
										<Form.Label>Phone Number*</Form.Label>
										<Form.Control type='text' ref={input => this.phone_no = input} defaultValue={this.props.addBookingInformation.phone_no} />
									</Form.Group>
								</Col>

								<Col md={4} sm={4} xm={12} style={{ alignSelf: 'flex-end', paddingBottom: '15px' }}>
									<Button variant="primary" className='find' onClick={this.findBooking}>
								        Find
								    </Button>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => ({
	addBookingInformation: state.booking.addBooking
});

export default withRouter(connect(mapStateToProps, { findBookingInformation })(Booking1));