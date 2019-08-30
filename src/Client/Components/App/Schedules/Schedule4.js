import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row, Col, Form, Button } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import { connect } from 'react-redux';
import { bookingInformation } from '../../../Actions/booking';
import {ToastsContainer, ToastsStore} from 'react-toasts';

import './schedule.css';

class Schedule4 extends Component {
	constructor(props) {
		super(props);
	}

	handleBooking = () => {
		if (this.fullname.value && this.address.value && this.phonenumber.value && this.nor.value && this.nobr.value && this.state.value && this.city.value) {
			const regExp = new RegExp(`^-?[0-9]*$`);
		    if (!regExp.test(this.phonenumber.value) || this.phonenumber.value.length !== 10) {
		    	ToastsStore.error('Please validate phone number and try again');
		    }
		    else {
				const data = {
					name: this.fullname.value,
					address: this.address.value,
					rooms: this.nor.value,
					bathrooms: this.nobr.value,
					phone_no: this.phonenumber.value,
					time: this.props.s_time,
					date: this.props.s_date,
					state: this.state.value,
					city: this.city.value,
					email: 'fancykingstar2019@gmail.com'
				};

				const {bookingInformation} = this.props;
				console.log(data);
				bookingInformation(data);
				this.props.history.push('/Schedule5');
			}
		} else {
			ToastsStore.error('Please check all fields and try again!');
		}
	}

	render() {
		console.log(this.props.addBookingInformation)
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
													<Form.Control type='text' ref={input => this.fullname = input} />
												</Form.Group>
				      						</Col>
				      						<Col md={6} sm={6} xm={12}>
				      							<Form.Group controlId='formBasicPhoneNumber'>
													<Form.Label>PhoneNumber</Form.Label>
													<Form.Control type='text' ref={input => this.phonenumber = input} />
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
													<Form.Control type='text' ref={input => this.state = input} />
												</Form.Group>
				      						</Col>
				      						<Col>
				      							<Form.Group controlId='formBasicCity'>
													<Form.Label>City</Form.Label>
													<Form.Control type='text' ref={input => this.city = input} />
												</Form.Group>
				      						</Col>
		      							</Row>
		      						</Col>
		      						<Col md={7} sm={7} xm={12}>
		      							<Form.Group controlId='formBasicAddress'>
											<Form.Label>Address</Form.Label>
											<Form.Control type='text' ref={input => this.address = input} />
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
													<Form.Control as='select' ref={input => this.nor = input}>
														<option>1</option>
														<option>2</option>
													</Form.Control>
												</Form.Group>
				      						</Col>
				      						<Col>
				      							<Form.Group controlId='formBasicNumberOfBathrooms'>
													<Form.Label>Number Of Bathrooms</Form.Label>
													<Form.Control as='select' ref={input => this.nobr = input}>
														<option>1</option>
														<option>2</option>
													</Form.Control>
												</Form.Group>
				      						</Col>
				      					</Row>
				      				</Col>
			      					<Col md={3} sm={3} xm={12} />
		      					</Row>
		      					<div>
									<Button variant="primary" className='next' onClick={this.handleBooking}>
								        Next
								    </Button>
								</div>
		      				</Form>
	      				</div>
	      			</div>
      			</div>
      			<ToastsContainer store={ToastsStore}/>
      		</div>
		)
	}
}

const mapStateToProps = state => ({
	s_date: state.schedule.selected_date,
	s_time: state.schedule.selected_time,
	addBookingInformation: state.booking.addBooking
});

export default withRouter(connect(mapStateToProps, { bookingInformation })(Schedule4));