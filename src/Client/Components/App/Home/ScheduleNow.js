import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ScheduleNow.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { connect } from 'react-redux';

class ScheduleNow extends Component {
	constructor(props) {
		super(props);
	}

	schedule = () => {
		ToastsStore.error("Please get an estimate first to Schedule your cleaning");
		window.scrollTo(0, 0);
	}
	render() {
		return(
			<div className='schedule-now d-flex justify-content-center'>
				<h1 style={{ marginBottom: 15, color: '#fff' }}>Leave the hard work on us.</h1>
				<h4 style={{ marginBottom: 30, color: '#fff' }}>Schedule your house cleaning now!</h4>
				<div>
					<Button variant='primary' className='schedule-now-button' onClick={this.schedule}>
				    	Schedule Now
				  	</Button>
			  	</div>
      			<ToastsContainer store={ToastsStore}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps, { })(ScheduleNow));
