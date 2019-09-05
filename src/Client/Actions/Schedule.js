import {
	SELECTED_DATE,
	SELECTED_TIME,
	AVAILABLE_TIME_DURATION,
	BOOKED_TIME
} from './Type'

import axios from 'axios'


export const selectDate = (selected_date, available_time, available_time_end) => async dispatch => {
	console.log(selected_date);
	dispatch({
		type: SELECTED_DATE,
		payload: selected_date
	});
	dispatch({
		type: AVAILABLE_TIME_DURATION,
		payload: {available_time_start: available_time, available_time_end: available_time_end}
	});
}

export const selectTime = (selected_time, time) => async dispatch => {
	dispatch({
		type: SELECTED_TIME,
		payload: selected_time
	});

	dispatch({
		type: BOOKED_TIME,
		payload: time
	});
}

export const getAvailableTimes = () => async dispatch => {
	const Url = "http://127.0.0.1:8000/getcleanercalendar";
	const respond = await axios.post(Url);
}