import {
	GET_ESTIMATION,
	BOOKING_INFORMATION,
	AVAILABLE_TIME
} from './Type'

import axios from 'axios'
import {ToastsContainer, ToastsStore} from 'react-toasts';
const url = 'http://127.0.0.1:8000'

export const getEstimation = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/getestimates";
	await axios.post(Url, data).then(function (respond) {
		dispatch({
			type: GET_ESTIMATION,
			payload: respond.data
		})
		dispatch({
			type: BOOKING_INFORMATION,
			payload: data
		})
	}).catch(error => {
        ToastsStore.error('Server unreachable. Please try again later.');
    });
}

export const contactUs = (data) => async dispatch => {
	console.log("===============");
	const Url = "http://127.0.0.1:8000/contact";
	await axios.post(Url, data).then(function (response) {
        ToastsStore.success('Message Sent');

	})
	.catch(error => {
		ToastsStore.error('Server unreachable. Please try again later.');
	});
}

export const fetchtime = (props) => async dispatch => {
	console.log("===============");
	const Url = "http://127.0.0.1:8000/fetchtime";
	await axios.get(Url).then(function (response) {
		// console.log(response);
        // ToastsStore.success('Message Sent');
        dispatch({
        	type: AVAILABLE_TIME,
        	payload: response.data
        });
        props.history.push("/Schedule2");
	})
	.catch(error => {
		ToastsStore.error('Server unreachable. Please try again later.');
	});
}