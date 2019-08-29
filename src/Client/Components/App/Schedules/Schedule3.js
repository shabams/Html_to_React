import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';

import './schedule.css';

class Schedule3 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const time = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM']
		const availableTime = 
			<div className='available-time d-flex' >
				{time.map(t => {
					return (
						<div className='each-time d-flex'><h6>{t}</h6></div>
					);
				})}
			</div>
		return (
      		<div className='schedule-page'>
      			<Image src={backgroundLeft} className='schedule-background-left' />
      			<Image src={backgroundRight} className='schedule-background-right' />
      			<div className='schedule-page-body' style={{ textAlign: 'center' }}>
      				<ScheduleNavBar />
      				<div className='shedule-page-body-inside'>
	      				<h1 style={{ color: '#12261f' }}>
	      					<a href="/schedule2" className='back'>Back</a>
	      					Please select an available time
	      				</h1>
	      				<div className='available-time-body'>
	      					<div className='selected-date'>
	      						Thu, July 29
	      					</div>
	      					{availableTime}
	      				</div>
	      			</div>
      			</div>
      		</div>
		)
	}
}

export default withRouter(Schedule3);