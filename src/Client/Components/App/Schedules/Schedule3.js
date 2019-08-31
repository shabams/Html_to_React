import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image, Table, Row } from 'react-bootstrap';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import check from '../../../Assets/Images/checkbox.svg';
import { connect } from 'react-redux';
import { selectTime } from '../../../Actions/Schedule';
import { getAvailableTimes } from '../../../Actions/Schedule';
import step1 from '../../../Assets/Images/step1.svg';
import {ToastsContainer, ToastsStore} from 'react-toasts';

import './schedule.css';

class Schedule3 extends Component {
	constructor(props) {
		super(props);
	}

	handleTime = (e, t) => {
		console.log(e.target);
		const { selectTime } = this.props
		if (e.target.classList.contains('active')) {
			selectTime(t);
			this.props.history.push('/Schedule4');
		}
		else {
			ToastsStore.error('Select Only available time!');
		}
	}

	render() {
		const time = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM']
		const availableTime = 
			<div className='available-time d-flex' >
				{time.map((t, index) => {
					return (
						index > 2 && index < 13 ? <div className='each-time active d-flex' onClick={e => this.handleTime(e, t)}>{t}</div> :
							<div className='each-time d-flex' onClick={e => this.handleTime(e, t)}>{t}</div>

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
      					<div style={{ position: 'relative' }}>
		      				<h1 style={{ color: '#12261f' }}>
		      					<a href="#" className='back' onClick={() => this.props.history.push('/schedule2')}>Back</a>
		      					Please select an available time
		      				</h1>
		      				<div className='available-time-body'>
		      					<div className='selected-date'>
		      						Thu, July 29
		      					</div>
		      					{availableTime}
		      					<div style={{ textAlign: 'right', marginTop: '20px'}}><Image src={check} style={{marginRight:'10px'}}/>Available Time</div>
		      				</div>
		      				<div className='step-1'>
								<div style={{ position: 'absolute' }}>
									<Image src={step1} />
									<h6 style={{ color: '#12261f', 'fontWeight': 'bold', position: 'absolute', top: 0, left: -45 }}>step1</h6>
									<h6 style={{ color: '#12261f', position: 'absolute', left: -45, bottom: -8 }}>step2</h6>
								</div>
							</div>
						</div>
	      			</div>
      			</div>
      			<ToastsContainer store={ToastsStore}/>
      		</div>
		)
	}
}

const mapStateToProps = state => ({
	s_date: state.schedule.selected_date
});

export default withRouter(connect(mapStateToProps, { selectTime })(Schedule3));