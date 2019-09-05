import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScheduleNavBar from '../Layouts/NavBar/ScheduleNavBar';
import PickyDateTime from 'react-picky-date-time';
import { Image } from 'react-bootstrap';
import './schedule.css';
import backgroundLeft from '../../../Assets/Images/background-left-147-252.png';
import backgroundRight from '../../../Assets/Images/background-right-133-380.png';
import step1 from '../../../Assets/Images/step1.svg';
import { selectDate } from '../../../Actions/Schedule';
import { connect } from 'react-redux';
import {ToastsContainer, ToastsStore} from 'react-toasts';

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
		const {selectDate} = this.props;
		this.setState({ year: year, month: month, date: date });
		console.log(this.props.available);
		let available_date = ''
		for (let i = 0; i < this.props.available.length; i++) {
			let day = this.props.available[i].split(" ")[0];
			console.log(new Date(day));
			console.log(new Date(year,month-1, date));
			if (new Date(day).getFullYear() == new Date(year,month-1, date-1).getFullYear() &&
				new Date(day).getMonth() == new Date(year,month-1, date-1).getMonth() &&
				new Date(day).getDate() == new Date(year,month-1, date-1).getDate()) {
				available_date = new Date(day);
				let available_time = this.props.available[i].split(" - ")[0].split(" ")[1];
				let available_time_end = this.props.available[i].split(" - ")[1];
				selectDate(new Date(year, month-1, date), available_time, available_time_end);
				this.props.history.push('/Schedule3');
			}
		}
		if (available_date == '') {
			ToastsStore.error("Sorry the chosen date is unavailable, but don't worry contact us directly and we will schedule you");
		}
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
      				<div className='shedule-page-body-inside'>
      					<div style={{ position: 'relative'}}>
		      				<h4 style={{ color: '#374354' }}>You are <span style={{fontWeight: 'bold'}}>2 short steps</span>, away from booking!</h4>
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
								/>
							</div>
							<div className='step'>
								<div style={{ position: 'absolute' }}>
									<Image src={step1} />
									<h6 style={{ color: '#12261f', 'font-weight': 'bold', position: 'absolute', top: 0, left: -45 }}>step1</h6>
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
	s_date: state.schedule.selected_date,
	available: state.home.available
});

export default withRouter(connect(mapStateToProps, { selectDate })(Schedule2));