import {
	BOOKING_INFORMATION,
	FIND_BOOKING,
	CONTACT
} from './Type'

import axios from 'axios'

export const bookingInformation = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/addbooking";
	const respond = await axios.post(Url, data);
	dispatch({
		type: BOOKING_INFORMATION,
		payload: data	
	})
}

export const findBookingInformation = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/customerbookings";
	const respond = await axios.post(Url, data);
	console.log(respond);
	dispatch({
		type: FIND_BOOKING,
		payload: respond.data
	})
}

export const contact = (data,props) => async dispatch => {
	dispatch({
		type: CONTACT,
		payload: data
	});
	props.history.push("/#contactUs");
}