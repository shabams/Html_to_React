import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import booking1_image from '../../../Assets/Images/booking1-image.png';

class Booking1 extends React.Component {
	render() {
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
										<Form.Control type='email' />
									</Form.Group>
								</Col>

								<Col md={4} sm={4} xm={12}>
									<Form.Group controlId='formBasicPhoneNumber'>
										<Form.Label>Phone Number*</Form.Label>
										<Form.Control type='text' />
									</Form.Group>
								</Col>

								<Col md={4} sm={4} xm={12} style={{ alignSelf: 'flex-end', paddingBottom: '15px' }}>
									<Button variant="primary" className='find'>
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

export default withRouter(Booking1);