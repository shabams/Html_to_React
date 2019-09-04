import {
	CLEAN_USERS,
	ROOM_RATE,
	MANAGE_CALENDAR,
	FETCH_BOOKING_CLEANER,
	GET_CLEANER_CALENDAR,
	NEW_BOOKING
} from './Type'

import axios from 'axios'
import {ToastsContainer, ToastsStore} from 'react-toasts';
import swal from 'sweetalert';

export const getUsers = () => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/fetchusers";
	const response = await axios.get(Url);
	dispatch({
		type: CLEAN_USERS,
		payload: response.data
	})
}

export const register = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/register";
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Successfully created new cleaner account!');
        document.getElementById("user_form").classList += "d-none";
        getUsers();
	}).catch(error => {
      ToastsStore.error('Username or email already registered.')
    });
}

export const changeEstimates = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/estimates";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Estimates for Address Changed!');
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const addScheduleDate = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Date added to schedule!');
	    manageCalendar(dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const addScheduleRepeat = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Date added to schedule!');
	    manageCalendar(dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const getRates = () => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/getrates";
	await axios.get(Url).then(function (response) {
		dispatch({
			type: ROOM_RATE,
			payload: response.data
		})
		fetchBookings(dispatch);
	})
	.catch(error => {
    	ToastsStore.error('Server unreachable!');
    });
}

export const getRatesAgain = (dispatch) => {
	const Url = "http://127.0.0.1:8000/admin/getrates";
	axios.get(Url).then(function (response) {
		dispatch({
			type: ROOM_RATE,
			payload: response.data
		})
		fetchBookings(dispatch);
	})
	.catch(error => {
    	ToastsStore.error('Server unreachable!');
    });
}

export const changePassword = (data) => async dispatch => {
	console.log("==========");
	const Url = "http://127.0.0.1:8000/cleaner/changepassword";
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Password changed! You will be redirected to login again.');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
        window.location.replace('http://127.0.0.1:3000/cleaner');
	}).catch(error => {
      ToastsStore.error('Server unreachable!');
    });
}

export const suspendAccount = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/suspend";
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Cleners account suspended.');
		getUsers();
	})
	.catch(error => {
		ToastsStore.error('Server unreachable!')
	});
}

export const manageCalendar = (dispatch) => {
	document.getElementById("spin2").classList.add("lds-spinner");
	const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
	const data = {
		user: localStorage.getItem('user')
	}

	axios.post(Url, data).then(function (response) {
		dispatch({
			type: GET_CLEANER_CALENDAR,
			payload: response.data
		})
	})
}

export const removeCalendarDate = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/removedate";
	await axios.post(Url, data).then(function (response) {
		manageCalendar(dispatch)
		ToastsStore.success("CalendarDate Removed");
	})
	.catch(error => {
		ToastsStore.error('Server unreachable!');
	});
}

export const acceptBooking = (id) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/acceptbooking";
	const data = {
		username: localStorage.getItem('user'),
		id: id
	}
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Success. You are now appointed for this booking. You can view it under My Bookings panel.');
		newBooking1(dispatch);
	})
	.catch(error => {
		ToastsStore.error('Server unreachable!')
	});
};

export const login = (data, props) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/login";
	await axios.post(Url, data).then(function (response) {
        localStorage.setItem('token', response.data.token);
        //Change bellow actual panel url
        localStorage.setItem('user', data.username);
        props.history.push('/cleaner/panel');
        // window.location.replace('http://127.0.0.1:8000/admin/panel');
    })
    .catch(error => {
        ToastsStore.error('Wrong username and/or password.')
    });
}

export const getCleanerCalendar = () => async dispatch => {
	document.getElementById("spin2").classList.add("lds-spinner");
	const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
	const data = {
		user: localStorage.getItem('user')
	}

	await axios.post(Url, data).then(function (response) {
		dispatch({
			type: GET_CLEANER_CALENDAR,
			payload: response.data
		})
	})
}

export const newBooking = () => async dispatch => {
	document.getElementById('spin1').className = "lds-spinner";
	const Url = "http://127.0.0.1:8000/cleaner/newbookings";
	await axios.get(Url).then(function (response) {
		if (response.data.length > 0) {
        	document.getElementById('spin1').className = "d-none lds-spinner";
		}
		else {
			document.getElementById('spin1').className = "d-none lds-spinner";
			var div = document.createElement('div');
			div.className = "p-4 col-md-8 mr-3";
			div.innerHTML = `<h4 class="text-danger">No new Bookings</h4>`

			document.getElementById('new-bookings').appendChild(div);
		}
		dispatch({
			type: NEW_BOOKING,
			payload: response.data
		})
	}).catch(error => {
        ToastsStore.error('Server unreachable!');
    });
}

export const newBooking1 = (dispatch) => {
	document.getElementById('spin1').className = "lds-spinner";
	const Url = "http://127.0.0.1:8000/cleaner/newbookings";
	axios.get(Url).then(function (response) {
		if (response.data.length > 0) {
        	document.getElementById('spin1').className = "d-none lds-spinner";
		}
		else {
			document.getElementById('spin1').className = "d-none lds-spinner";
			var div = document.createElement('div');
			div.className = "p-4 col-md-8 mr-3";
			div.innerHTML = `<h4 class="text-danger">No new Bookings</h4>`

			document.getElementById('new-bookings').appendChild(div);
		}
		dispatch({
			type: NEW_BOOKING,
			payload: response.data
		})
	}).catch(error => {
        ToastsStore.error('Server unreachable!');
    });
}

export const fetchBookings = () => async dispatch => {
	document.getElementById('spin').className = "lds-spinner";
	const Url = "http://127.0.0.1:8000/cleaner/fetchbookings";
	const data = {
		user: localStorage.getItem('user')
	}

	await axios.post(Url, data).then(function (response) {
		if (response.data.length > 0) {
			document.getElementById('spin').className = "d-none lds-spinner";
		} else {
			document.getElementById('spin').className = "d-none lds-spinner";
        	ToastsStore.error('No previous bookings found for user!');
		}
		dispatch({
			type: FETCH_BOOKING_CLEANER,
			payload: response.data
		})
	}).catch(error => {
		ToastsStore.error('Server unreachable!');
    });
}