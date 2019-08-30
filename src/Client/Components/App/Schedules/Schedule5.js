import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row, Col, Form, Button } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import { connect } from 'react-redux';

import './schedule.css';

class Schedule5 extends Component {
	constructor(props) {
		super(props);
	}

	handleConfirmBooking = () => {
		this.props.history.push('/Schedule6');
	}

	render() {
		console.log(this.props.addBookingInformation);
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		return (
      		<div className='schedule-page'>
      			<Image src={backgroundLeft} className='schedule-background-left' />
      			<Image src={backgroundRight} className='schedule-background-right' />
      			<div className='schedule-page-body' style={{ textAlign: 'center' }}>
      				<ScheduleNavBar />
      				<div className='shedule-page-body-inside'>
	      				<h1 style={{ color: '#12261f' }}>
	      					<a href="#" className='back' onClick={() => this.props.history.push('/schedule4')}>Back</a>
	      					Confirmation
	      				</h1>
	      				<div className='confirmation d-flex'>
	      					<div className='confirming-date d-flex'>
	      						<p>{days[new Date(this.props.addBookingInformation.date).getDay()-1] || ''}</p>
	      						<p>{months[new Date(this.props.addBookingInformation.date).getMonth()] || ''} {new Date(this.props.addBookingInformation.date).getDate() || ''}</p>
	      						<p>{this.props.addBookingInformation.time}</p>
							</div>
							<div className='confirming-data'>
								<div className='name-phone d-flex'>
									<div className='full-name'>
										<h6>Full Name</h6>
										<h5>{this.props.addBookingInformation.name}</h5>
									</div>
									<div className='phone-number'>
										<h6>Phone Number</h6>
										<h5>{this.props.addBookingInformation.phone_no}</h5>
									</div>
								</div>

								<div className='state-city-address d-flex'>
									<div className='state'>
										<h6>State</h6>
										<h5>{this.props.addBookingInformation.state}</h5>
									</div>
									<div className='city'>
										<h6>City</h6>
										<h5>{this.props.addBookingInformation.city}</h5>
									</div>
									<div className='address'>
										<h6>123, St name, lorem ipsum.</h6>
										<h5>{this.props.addBookingInformation.address}</h5>
									</div>
								</div>

								<div className='rooms-bathrooms d-flex'>
									<div className='rooms'>
										<h6>Number of rooms</h6>
										<h5>{this.props.addBookingInformation.rooms}</h5>
									</div>
									<div className='Number of bathrooms'>
										<h6>Number of bathrooms</h6>
										<h5>{this.props.addBookingInformation.bathrooms}</h5>
									</div>
								</div>
							</div>
	      				</div>
	      				<Button variant="primary" className='confirming-button' onClick={this.handleConfirmBooking}>
					        Confirm Booking
					    </Button>
					</div>
      			</div>
      		</div>
		)
	}
}

const mapStateToProps = state => ({
	addBookingInformation: state.booking.addBooking
});

export default withRouter(connect(mapStateToProps, { })(Schedule5));