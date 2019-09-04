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

export const setRoomTime = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/roomtime";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Rate Changed!');
	    getRatesAgain(dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const setBathRoomTime = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/bathroomtime";
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

export const fetchBookings = dispatch => {
	document.getElementById('spin').className = "lds-spinner";
	const Url = "http://127.0.0.1:8000/admin/fetchbookings";
	axios.get(Url).then(function (response) {
		dispatch({
			type: FETCH_BOOKING,
			payload: response.data
		})
	}).catch(error => {
		console.log('@@: ', error)
		ToastsStore.error('Server unreachable!', error);
    });
}

export const changePassword = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/admin/changepassword";
	await axios.post(Url, data).then(function (response) {
		ToastsStore.success('Password changed! You will be redirected to login again.');
		localStorage.removeItem('token');
        window.location.replace('http://127.0.0.1:3000/admin/');
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

function clickevent() {
	console.log('clickevent');
}

export const manageCalendar = (id, data, option) => async dispatch => {
	if(document.getElementById(`schedule${id}`).className == "row text-white" && option==1){
    	document.getElementById(`schedule${id}`).className = "row d-none text-white"
	}
	else{
	    document.getElementById(`schedule${id}`).className = "row text-white";
	    document.getElementById(`spin${id}`).classList.add("lds-spinner");
		const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
		await axios.post(Url, data).then(function (response) {
			document.getElementById(`cleaner-calendar${id}`).innerHTML = "";
			if (response.data.length > 0) {
				for (let i = 0; i < response.data.length; i++) {
					let div = document.createElement('div');
			        div.className = "border-bottom-primary p-4 card";
			        div.id = `calendar_${id}`;
			        div.style.borderRadius = '10px';
			        div.style.marginBottom = '1vw';
			        div.style.wordBreak = 'break-all';
					div.innerHTML = 
	                    `<h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">Date:</span> ${response.data[i].date}</h5><br />
	                    <h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">From:</span> ${response.data[i].from}</h5><br />
	                    <h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">To:</span> ${response.data[i].to}</h5><br />`
	    			let button = document.createElement('button');
	    			button.id='${response.data[i]._id}';
	    			button.className='btn btn-danger';
	    			button.style.display = 'inline';
	    			button.onclick = function() {
	    				removeCalendarDate(id, response.data[i]._id, data.user, dispatch);
	    			};
	    			button.innerHTML = 'Remove Date'
	    			div.appendChild(button);
	                document.getElementById(`cleaner-calendar${id}`).appendChild(div);
	          		document.getElementById(`spin` + id).className = "d-none lds-spinner";
				}
			} else {
				document.getElementById(`spin${id}`).className = "d-none lds-spinner";
	        	ToastsStore.error('No schedule dates found!');
			}
			dispatch({
				type: MANAGE_CALENDAR,
				payload: response.data
			})
	    })
	    .catch(error => {
	      	ToastsStore.error('Server ****************unreachable!');
	    });
	}
}

export const manageCalendar1 = (id, data, option, dispatch) => {

	const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
	axios.post(Url, data).then(function (response) {
		console.log("=================");
		document.getElementById(`cleaner-calendar${id}`).innerHTML = "";
		if (response.data.length > 0) {
			for (let i = 0; i < response.data.length; i++) {
				let div = document.createElement('div');
		        div.className = "border-bottom-primary p-4 card";
		        div.id = `calendar_${id}`;
		        div.style.borderRadius = '10px';
		        div.style.marginBottom = '1vw';
		        div.style.wordBreak = 'break-all';
				div.innerHTML = 
                    `<h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">Date:</span> ${response.data[i].date}</h5><br />
                    <h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">From:</span> ${response.data[i].from}</h5><br />
                    <h5 class="text-primary" style={{display:'inline', marginRight: '2vw'}}><span class="text-secondary">To:</span> ${response.data[i].to}</h5><br />`
    			let button = document.createElement('button');
    			button.id='${response.data[i]._id}';
    			button.className='btn btn-danger';
    			button.style.display = 'inline';
    			button.onclick = function() {
    				removeCalendarDate(id, response.data[i]._id, data.user, dispatch);
    			};
    			button.innerHTML = 'Remove Date'
    			div.appendChild(button);
                document.getElementById(`cleaner-calendar${id}`).appendChild(div);
          		document.getElementById(`spin` + id).className = "d-none lds-spinner";
			}
		} else {
			document.getElementById(`spin${id}`).className = "d-none lds-spinner";
        	ToastsStore.error('No schedule dates found!');
		}
    })
    .catch(error => {
      	ToastsStore.error('Server ****************unreachable!');
    });
}

export const removeCalendarDate = (index, id, username, dispatch) => {
	const Url = "http://127.0.0.1:8000/cleaner/removedate";
	const requestBody = {
		id: id,
		username: username
	};

	axios.post(Url, requestBody).then(function (response) {
		manageCalendar1(index, {user: username}, 0, dispatch);
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

export const addScheduleDate = (i, data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Date added to schedule!');
	    manageCalendar1(i, {user: data.user}, 0, dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server unreachable!')
    });
}

export const addScheduleRepeat = (i, data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    await axios.post(Url, data).then(function (response) {
	    ToastsStore.success('Date added to schedule!');
	    manageCalendar1(i, {user: data.user}, 0, dispatch);
    })
    .catch(error => {
    	ToastsStore.error('Server ===============unreachable!')
    });
}