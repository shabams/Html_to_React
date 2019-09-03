import {
	CLEAN_USERS,
	ROOM_RATE,
	MANAGE_CALENDAR,
	FETCH_BOOKING
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

export const setRoomRate = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/roomrate";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Rate Changed!');
	    getRatesAgain(dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const setBathRoomRate = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/bathroomrate";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Rate Changed!');
	    getRatesAgain(dispatch);
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
	const Url = "http://127.0.0.1:8000/cleaner/changepassword";
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Password changed! You will be redirected to login again.');
		localStorage.removeItem('token');
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

export const manageCalendar = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
	await axios.post(Url, data).then(function (response) {
		dispatch({
			type: MANAGE_CALENDAR,
			payload: response.data
		})
    })
    .catch(error => {
      	ToastsStore.error('Server unreachable!');
    });
}

export const removeCalendarDate = (id, username) => async dispatch => {
	var number = id.substring(0,1);
	var id_finite = id.substring(1,id.length);
	const Url = "http://127.0.0.1:8000/cleaner/removedate";
	const requestBody = {
		id: id_finite,
		username: username
	};

	await axios.post(Url, requestBody).then(function (response) {
		var option = 0;
		if(document.getElementById(`schedule` + number).classList.contains("row") &&
            document.getElementById(`schedule` + number).classList.contains("text-white") && option==1){
            console.log("ssdfsdfsdfsdfsdf");
            document.getElementById(`schedule` + number).classList.add("d-none");
        }
        else {
            document.getElementById(`schedule` + number).classList.add("row");
            document.getElementById(`schedule` + number).classList.add("text-white");
            document.getElementById(`spin` + number).classList.add("lds-spinner");

            const data = {
                user: this.props.cleaners[number].username
            };

            const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
			axios.post(Url, data).then(function (response) {
				dispatch({
					type: MANAGE_CALENDAR,
					payload: response.data
				})
		    })
		    .catch(error => {
		      	ToastsStore.error('Server unreachable!');
		    });
        }
	})
	.catch(error => {
		ToastsStore.error('Server unreachable!');
	});
}

export const changeStatus = (data) => async dispatch => {
    const Url = "http://127.0.0.1:8000/admin/changestatus";
    await axios.post(Url, data).then(function (response) {
    	swal("STATUS CHANGED!");
    	getRatesAgain(dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const archiveBooking = (id) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/archive";
	await axios.post(Url, id).then(function (response) {
		ToastsStore.success('Archived!');
		getRatesAgain(dispatch);
	})
	.catch(error => {
		ToastsStore.error('Server unreachable!')
	});
};

export const login = (data, props) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/login";
	await axios.post(Url, data).then(function (response) {
        localStorage.setItem('token', response.data.token);
        //Change bellow actual panel url
        props.history.push('/admin/panel');
        // window.location.replace('http://127.0.0.1:8000/admin/panel');
    })
    .catch(error => {
        ToastsStore.error('Wrong username and/or password.')
    });
}

export const getCleanerCalendar = () => async dispatch => {
}

export const newBooking = () => async dispatch => {
}

export const fetchBookings = () => async dispatch => {
}