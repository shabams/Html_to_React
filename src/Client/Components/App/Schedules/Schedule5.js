import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row, Col, Form, Button } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';

import './schedule.css';

class Schedule5 extends Component {
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
      				<h1 style={{ color: '#12261f' }}>Confirmation</h1>
      				<div className='Confirmation'>
      					<div className='confirming-date'>
						</div>
						<div className='confirming-data'>
							<div className='name-phone d-flex'>
								<div className='full-name'>
									<h6>Full Name</h6>
									<h5>Fulan Al Fulani</h5>
								</div>
								<div className='phone-number'>
									<h6>Phone Number</h6>
									<h5>+1 123 456 789</h5>
								</div>
							</div>

							<div className='state-city-address d-flex'>
								<div className='state'>
									<h6>State</h6>
									<h5>Ohio</h5>
								</div>
								<div className='city'>
									<h6>City</h6>
									<h5>Oxford</h5>
								</div>
								<div className='address'>
									<h6>123, St name, lorem ipsum.</h6>
									<h5>Oxford</h5>
								</div>
							</div>

							<div className='rooms-bathrooms d-flex'>
								<div className='rooms'>
									<h6>Number of rooms</h6>
									<h5>3</h5>
								</div>
								<div className='Number of bathrooms'>
									<h6>Number of bathrooms</h6>
									<h5>1</h5>
								</div>
							</div>
						</div>
      				</div>
      				<Button variant="primary" className='confirming-button'>
				        Confirm Booking
				    </Button>
      			</div>
      		</div>
		)
	}
}

export default withRouter(Schedule5);