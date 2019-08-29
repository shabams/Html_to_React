import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image } from 'react-bootstrap';
import './schedule.css';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import { changeDate } from '../../../Actions/Schedule';

class Schedule2 extends Component {
	constructor(props) {
		super(props);
		const date = new Date().getDate();
		const year = new Date().getFullYear();
		const month = new Date().getMonth() + 1;
		this.state = {
			showPickyDateTime: true,
			date: date,
			month: month,
			year: year,
			hour: '03',
			minute: '10',
			second: '40',
			meridiem: 'PM'
		};
	}

	onYearPicked(res) {
		const { year } = res;
		this.setState({ year: year});
	}

	onMonthPicked(res) {
		const { month, year } = res;
		this.setState({ year: year, month: month});
	}

	onDatePicked(res) {
		const { date, month, year } = res;
		this.setState({ year: year, month: month, date: date });
	}

	onResetDate(res) {
		const { date, month, year } = res;
		this.setState({ year: year, month: month, date: date });
	}

	onResetDefaultDate(res) {
		const { date, month, year } = res;
		this.setState({ year: year, month: month, date: date });
	}

	onSecondChange(res) {
		this.setState({ second: res.value });
	}

	onMinuteChange(res) {
		this.setState({ minute: res.value });
	}

	onHourChange(res) {
		this.setState({ hour: res.value });
	}

	onMeridiemChange(res) {
		this.setState({ meridiem: res });
	}

	onResetTime(res) {
		this.setState({
			second: res.clockHandSecond.value,
			minute: res.clockHandMinute.value,
			hour: res.clockHandHour.value
		});
	}

	onResetDefaultTime(res) {
		this.setState({
			second: res.clockHandSecond.value,
			minute: res.clockHandMinute.value,
			hour: res.clockHandHour.value
		});
	}

	onClearTime(res) {
		this.setState({
			second: res.clockHandSecond.value,
			minute: res.clockHandMinute.value,
			hour: res.clockHandHour.value
		});
	}

	// just toggle your outter component state to true or false to show or hide <PickyDateTime/>
	openPickyDateTime() {
		this.setState({showPickyDateTime: true});
	}

	onClose() {
		this.setState({showPickyDateTime: false});
	}

	render() {
		const {
			showPickyDateTime,
			date,
			month,
			year,
			hour,
			minute,
			second,
			meridiem
	    } = this.state;

		return (
      		<div className='schedule-page'>
      			<Image src={backgroundLeft} className='schedule-background-left' />
      			<Image src={backgroundRight} className='schedule-background-right' />
      			<div className='schedule-page-body' style={{ textAlign: 'center' }}>
      				<ScheduleNavBar />
      				<div className='shedule-page-body-inside' style={{ paddingTop: 75 }}>
	      				<h4 style={{ color: '#374354' }}>You are 2 short steps, away from booking!</h4>
	      				<h1 style={{ color: '#12261f' }}>Please select a day</h1>
	      				<div className='class-date-picker d-flex justify-content-center'>
		      				<PickyDateTime
							  size="m"
							  mode={0}
							  locale="en-us"
							  show={showPickyDateTime}
							  onClose={() => this.onClose()}
							  defaultDate={`${month}/${date}/${year}`}
							  onYearPicked={res => this.onYearPicked(res)}
							  onMonthPicked={res => this.onMonthPicked(res)}
							  onDatePicked={res => this.onDatePicked(res)}
							  onResetDate={res => this.onResetDate(res)}
							  onResetDefaultDate={res => this.onResetDefaultDate(res)}
							  onSecondChange={res => this.onSecondChange(res)}
							  onMinuteChange={res => this.onMinuteChange(res)}
							  onHourChange={res => this.onHourChange(res)}
							  onMeridiemChange={res => this.onMeridiemChange(res)}
							  onResetTime={res => this.onResetTime(res)}
							  onResetDefaultTime={res => this.onResetDefaultTime(res)}
							  onClearTime={res => this.onClearTime(res)}
							  onChange={() => console.log("ssssss")}
							/>
						</div>
					</div>
      			</div>
      		</div>
		)
	}
}

export default withRouter(Schedule2);