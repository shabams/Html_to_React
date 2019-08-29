import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row, Col, Form } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';

import './schedule.css';

class Schedule4 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      		<div className='schedule-page'>
      			<Image src={backgroundLeft} className='schedule-background-left' />
      			<Image src={backgroundRight} className='schedule-background-right' />
      			<div className='schedule-page-body' style={{ textAlign: 'center' }}>
      				<ScheduleNavBar />
      				<div className='shedule-page-body-inside'>
	      				<h1 style={{ color: '#12261f' }}>
	      					<a href="/schedule3" className='back'>Back</a>
	      					Booking Information
	      				</h1>
	      				<div className='booking-information'>
	      					<Form className='booking-information-form'>
	      						<Row>
	      							<Col md={3} sm={3} xm={12} />
	      							<Col md={6} sm={6} xm={12}>
				      					<Row>
				      						<Col md={6} sm={6} xm={12}>
				      							<Form.Group controlId='formBasicFullName'>
													<Form.Label>Full Name</Form.Label>
													<Form.Control type='text' />
												</Form.Group>
				      						</Col>
				      						<Col md={6} sm={6} xm={12}>
				      							<Form.Group controlId='formBasicPhoneNumber'>
													<Form.Label>PhoneNumber</Form.Label>
													<Form.Control type='text' />
												</Form.Group>
				      						</Col>
				      					</Row>
				      				</Col>
			      					<Col md={3} sm={3} xm={12} />
			      				</Row>

		      					<Row>
		      						<Col md={5} sm={5} xm={12}>
		      							<Row>
		      								<Col>
				      							<Form.Group controlId='formBasicState'>
													<Form.Label>State</Form.Label>
													<Form.Control type='text' />
												</Form.Group>
				      						</Col>
				      						<Col>
				      							<Form.Group controlId='formBasicCity'>
													<Form.Label>City</Form.Label>
													<Form.Control type='text' />
												</Form.Group>
				      						</Col>
		      							</Row>
		      						</Col>
		      						<Col md={7} sm={7} xm={12}>
		      							<Form.Group controlId='formBasicAddress'>
											<Form.Label>Address</Form.Label>
											<Form.Control type='text' />
										</Form.Group>
		      						</Col>
		      					</Row>

		      					<Row>
		      						<Col md={3} sm={3} xm={12} />
	      							<Col md={6} sm={6} xm={12}>
				      					<Row>
				      						<Col>
				      							<Form.Group controlId='formBasicNumberOfRooms'>
													<Form.Label>Number Of Rooms</Form.Label>
													<Form.Control as='select'>
														<option>1</option>
														<option>2</option>
													</Form.Control>
												</Form.Group>
				      						</Col>
				      						<Col>
				      							<Form.Group controlId='formBasicNumberOfBathrooms'>
													<Form.Label>Number Of Bathrooms</Form.Label>
													<Form.Control as='select'>
														<option>1</option>
														<option>2</option>
													</Form.Control>
												</Form.Group>
				      						</Col>
				      					</Row>
				      				</Col>
			      					<Col md={3} sm={3} xm={12} />
		      					</Row>
		      				</Form>
	      				</div>
	      			</div>
      			</div>
      		</div>
		)
	}
}

export default withRouter(Schedule4);