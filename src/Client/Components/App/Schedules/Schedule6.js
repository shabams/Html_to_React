import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row, Col, Form, Button } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import sun from '../../../Assets/Images/sun.svg';
import { connect } from 'react-redux';

import './schedule.css';

class Schedule6 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
            console.log(this.props.addBookingInformation)
		return (
      		<div className='schedule-page'>
      			<Image src={backgroundLeft} className='schedule-background-left' />
      			<Image src={backgroundRight} className='schedule-background-right' />
      			<div className='schedule-page-body' style={{ textAlign: 'center' }}>
      				<ScheduleNavBar />
      				<div className='schedule-viola d-flex shedule-page-body-inside'>
      					<Image src={sun} style={{ width: 203, height: 225 }} />
      					<h1>Viola!</h1>
      					<p>You're all set</p>
      					<p>We'll send you a confirmation email within few minutes.</p>
      					<a href="#" onClick={() => this.props.history.push('/Booking1')}>View booking details</a>
      				</div>
      			</div>
      		</div>
		)
	}
}

const mapStateToProps = state => ({
      addBookingInformation: state.booking.addBooking
});

export default withRouter(connect(mapStateToProps, { })(Schedule6));