import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image } from 'react-bootstrap';
import './schedule.css';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';

class Schedule2 extends Component {
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
      				<h1 style={{ color: '#12261f' }}>Please select an available time</h1>
      				<div className='available-time'>
      				</div>
      			</div>
      		</div>
		)
	}
}

export default withRouter(Schedule2);