import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ScheduleNow.css';

class ScheduleNow extends Component {
	render() {
		return(
			<div className='schedule-now d-flex justify-content-center'>
				<h1 style={{ marginBottom: 15 }}>Leave the hard work on us.</h1>
				<h4 style={{ marginBottom: 30 }}>Schedule your house cleaning now!</h4>
				<div>
					<Button variant='primary' className='schedule-now-button'>
			    	Schedule Now
			  	</Button>
			  </div>
			</div>
		)
	}
}

export default withRouter(ScheduleNow);
