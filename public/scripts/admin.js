//Arrays to store fethed results from back-end for bookings and users in admin panel
var users_array = [];
var bookings_array = [];

function showForm() {
  if (document.getElementById("user_form").className.includes("d-none")) {
    document.getElementById("user_form").classList = "";
  } else {
    document.getElementById("user_form").classList += "d-none";
  }
}

//Change admin panel menus by addmin d-none class or removing it
function changeMenu(menu_id) {
  switch (menu_id) {
    case 'manage-clients':
      {
        document.getElementById('change_password').classList += " d-none";
        document.getElementById('manage-bookings').classList += " d-none";
        document.getElementById('manage-clients').classList.remove;
        document.getElementById('manage-clients').classList = "container-fluid";
        document.getElementById('first_menu').className += " selected";
        document.getElementById('third_menu').classList.remove;
        document.getElementById('third_menu').classList = "fas fa-key";
        document.getElementById('second_menu').classList.remove;
        document.getElementById('second_menu').classList = "fas fa-calendar-alt";
        break;
      }
    case 'manage-bookings':
      {
        document.getElementById('change_password').classList += " d-none";
        document.getElementById('manage-clients').classList += " d-none";
        document.getElementById('manage-bookings').classList.remove;
        document.getElementById('manage-bookings').classList = "container-fluid";
        document.getElementById('second_menu').className += " selected";
        document.getElementById('third_menu').classList.remove;
        document.getElementById('third_menu').classList = "fas fa-key";
        document.getElementById('first_menu').classList.remove;
        document.getElementById('first_menu').classList = "fas fa-users";
        getRates();
        break;
      }
    case 'change_password':
      {
        document.getElementById('manage-clients').classList += " d-none";
        document.getElementById('manage-bookings').classList += " d-none";
        document.getElementById('change_password').classList.remove;
        document.getElementById('change_password').classList = "container-fluid";
        document.getElementById('third_menu').className += " selected";
        document.getElementById('first_menu').classList.remove;
        document.getElementById('first_menu').classList = "fas fa-users";
        document.getElementById('second_menu').classList.remove;
        document.getElementById('second_menu').classList = "fas fa-calendar-alt";
        break;
      }
  }
}

//Change admin account password, first checking in server if old password matches
function changePassword() {
  if (document.getElementById('new_password').value.length < 8) {
    alertify.error('Password lenght must be bigger than 8 for security purposes.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/admin/changepassword";
    const requestBody =
      `old_password=${document.getElementById('old_password').value}` +
      `&new_password=${document.getElementById('new_password').value}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Password changed! You will be redirected to login again.');
        setTimeout(function () {
          localStorage.removeItem('token');
              //Change bellow url from localhost to actual host
          window.location.replace('http://127.0.0.1:8000/admin/');
        }, 3000);
      })
      .catch(error => {
        alertify.error('Old password incorrect!')
      });
  }
}


//Sends signup request to server first checking all required fields
function signup() {
  //First check if all fields are filled for creating new Cleaner Account
  var check = 1;
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var password_repeat = document.getElementById("password_repeat").value;
  if (!first_name || !last_name || !username || !email || !password || !password_repeat) {
    alertify.error('Please fill in the required fields.');
    check = 0;
  } else if (password.length < 8) {
    alertify.error('Please choose password with more than 8 characters');
  } else {
    if (password != password_repeat) {
      alertify.error('Passwords do not match.');
      check = 0;
    }
  }
  //Checking if username or email already exists, make sure to change host
  const Url = "http://127.0.0.1:8000/admin/check";
  const requestBody =
    `&username=${username}` +
    `&email=${email}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      //If all checks passed send request to server for creating account
      if (check == 1) {
        //Change bellow url from localhost to actual host
        const Url = "http://127.0.0.1:8000/admin/register";
        const requestBody =
          `first_name=${first_name}` +
          `&last_name=${last_name}` +
          `&username=${username}` +
          `&email=${email}` +
          `&password=${password}`;
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        axios.post(Url, requestBody, config).then(function (response) {
            alertify.success('Successfully created new cleaner account!');
            document.getElementById("user_form").classList += "d-none";
            getUsers();
          })
          .catch(error => {
            alertify.error('Server is unreachable try again later.')
          });
      }
    })
    .catch(error => {
      alertify.error('Username or email already registered.')
    });
}

//Function to fetch all Users data and display it in proper <div> element in admin panel
function getUsers() {
      //Change bellow url from localhost to actual host
  const Url = "http://127.0.0.1:8000/admin/fetchusers";
  axios.get(Url).then(function (response) {
      document.getElementById('users').innerHTML = "";
      var array = response.data;
      users_array = array;
      for (var i = 0; i < array.length; i++) {
        var div = document.createElement('div');
        div.className = "p-2 mb-3 shadow border-left-primary";
        div.id = `${i}`;
        div.style = "border-radius: 10px";

        div.innerHTML =
          `<h4 class="text-info" style="display:inline;margin-right: 2vw;">
          <span class="text-primary">First Name: </span>${array[i].first_name}</h4>
        <h4 class="text-info" style="display:inline;margin-right: 2vw;">
        <span class="text-primary">Last Name: </span>${array[i].last_name}</h4>
        <h4 class="text-info" style="display:inline;margin-right: 2vw;">
        <span class="text-primary">Username: </span>${array[i].username}</h4>
        <button class="btn btn-success" onclick=manageCalendar(this.parentNode.id,1) style="display:inline"><b>MANAGE CALENDAR AVAILABILITY</b></button>
        <button class="btn btn-danger" onclick=suspendAccount(this.parentNode.id) style="display:inline"><b>SUSPEND ACCOUNT</b></button>
        <br>
        <div id="schedule${i}" class="row d-none text-info">
        <div id="spin${i}" class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div id="cleaner-calendar${i}" class="col-md-4 mt-5">
        </div>
        <div class="col-md-7">
            <h3 class="text-primary mt-2">Add new date to schedule</h3>
            <h2 class="text-info">Choose available date:</h2>
            <input type="date" id="datePicker${i}" style="width:10vw;margin-bottom: 1.5vw;">
            <h2 class="text-info">Choose available time:</h2>
            <h4 class="text-info">From</h4>
            <select id='from-time${i}'>
                <option value='01:00'>01:00</option>
                <option value='01:30'>01:30</option>
                <option value='02:00'>02:00</option>
                <option value='02:30'>02:30</option>
                <option value='03:00'>03:00</option>
                <option value='03:30'>03:30</option>
                <option value='04:00'>04:00</option>
                <option value='04:30'>04:30</option>
                <option value='05:00'>05:00</option>
                <option value='05:30'>05:30</option>
                <option value='06:00'>06:00</option>
                <option value='06:30'>06:30</option>
                <option value='07:00'>07:00</option>
                <option value='07:30'>07:30</option>
                <option value='08:00'>08:00</option>
                <option value='08:30'>08:30</option>
                <option value='09:00'>09:00</option>
                <option value='09:30'>09:30</option>
                <option value='10:00'>10:00</option>
                <option value='10:30'>10:30</option>
                <option value='11:00'>11:00</option>
                <option value='11:30'>11:30</option>
                <option value='12:00'>12:00</option>
                <option value='12:30'>12:30</option>
            </select>
            <select name="am-pm" id='from-option${i}'>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>                    
            </select>
            <h4 class="text-info mt-3">To</h4>
            <select id='to-time${i}'>
                <option value='01:00'>01:00</option>
                <option value='01:30'>01:30</option>
                <option value='02:00'>02:00</option>
                <option value='02:30'>02:30</option>
                <option value='03:00'>03:00</option>
                <option value='03:30'>03:30</option>
                <option value='04:00'>04:00</option>
                <option value='04:30'>04:30</option>
                <option value='05:00'>05:00</option>
                <option value='05:30'>05:30</option>
                <option value='06:00'>06:00</option>
                <option value='06:30'>06:30</option>
                <option value='07:00'>07:00</option>
                <option value='07:30'>07:30</option>
                <option value='08:00'>08:00</option>
                <option value='08:30'>08:30</option>
                <option value='09:00'>09:00</option>
                <option value='09:30'>09:30</option>
                <option value='10:00'>10:00</option>
                <option value='10:30'>10:30</option>
                <option value='11:00'>11:00</option>
                <option value='11:30'>11:30</option>
                <option value='12:00'>12:00</option>
                <option value='12:30'>12:30</option>
            </select>
            <select name="am-pm" id='to-option${i}'>
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>                    
          </select>
            <br>
            <button onclick="addScheduleDate(${i})" class="btn btn-success mb-3 mt-3">Add Now</button>
            <h3 class="text-primary">Add new repeating schedule date</h3>
            <h2 class="text-info">Choose available day:</h2>
            <select id="day${i}" name="day" multiple>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <h2 class="text-info">Choose available time:</h2>
            <h4 class="text-info">From</h4>
            <select id='from-time-repeat${i}'>
                <option value='01:00'>01:00</option>
                <option value='01:30'>01:30</option>
                <option value='02:00'>02:00</option>
                <option value='02:30'>02:30</option>
                <option value='03:00'>03:00</option>
                <option value='03:30'>03:30</option>
                <option value='04:00'>04:00</option>
                <option value='04:30'>04:30</option>
                <option value='05:00'>05:00</option>
                <option value='05:30'>05:30</option>
                <option value='06:00'>06:00</option>
                <option value='06:30'>06:30</option>
                <option value='07:00'>07:00</option>
                <option value='07:30'>07:30</option>
                <option value='08:00'>08:00</option>
                <option value='08:30'>08:30</option>
                <option value='09:00'>09:00</option>
                <option value='09:30'>09:30</option>
                <option value='10:00'>10:00</option>
                <option value='10:30'>10:30</option>
                <option value='11:00'>11:00</option>
                <option value='11:30'>11:30</option>
                <option value='12:00'>12:00</option>
                <option value='12:30'>12:30</option>
            </select>
            <select name="am-pm" id='from-repeat-option${i}'>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>                    
            </select>
            <h4 class="mt-3 text-info">To</h4>
            <select id='to-time-repeat${i}'>
                <option value='01:00'>01:00</option>
                <option value='01:30'>01:30</option>
                <option value='02:00'>02:00</option>
                <option value='02:30'>02:30</option>
                <option value='03:00'>03:00</option>
                <option value='03:30'>03:30</option>
                <option value='04:00'>04:00</option>
                <option value='04:30'>04:30</option>
                <option value='05:00'>05:00</option>
                <option value='05:30'>05:30</option>
                <option value='06:00'>06:00</option>
                <option value='06:30'>06:30</option>
                <option value='07:00'>07:00</option>
                <option value='07:30'>07:30</option>
                <option value='08:00'>08:00</option>
                <option value='08:30'>08:30</option>
                <option value='09:00'>09:00</option>
                <option value='09:30'>09:30</option>
                <option value='10:00'>10:00</option>
                <option value='10:30'>10:30</option>
                <option value='11:00'>11:00</option>
                <option value='11:30'>11:30</option>
                <option value='12:00'>12:00</option>
                <option value='12:30'>12:30</option>
            </select>
            <select name="am-pm" id='to-repeat-option${i}'>
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>                    
            </select>
            <br>
            <button onclick="addScheduleRepeat(${i})" class="btn btn-success mb-3">Add Now</button>
        </div>
    </div>`
        document.getElementById('users').appendChild(div);
      }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Function very similar to cleaners panel that allows admin to also medify their calendar dates
function manageCalendar(id,option){
  if(document.getElementById(`schedule${id}`).className == "row text-white" && option==1){
    document.getElementById(`schedule${id}`).className = "row d-none text-white"
  }
  else{
    document.getElementById(`schedule${id}`).className = "row text-white";
    document.getElementById(`spin${id}`).classList = "lds-spinner";
        //Change bellow url from localhost to actual host
  const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
  const requestBody =
    `user=${users_array[id].username}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      document.getElementById(`cleaner-calendar${id}`).innerHTML = "";
      var array = response.data;
      if (response.data.length > 0) {
        for (var i = 0; i < array.length; i++) {
          var color = 'text-primary';
          var div = document.createElement('div');
          div.className = "border-bottom-primary p-4 card";
          div.id = `calendar_${id}`;
          div.style = "border-radius: 10px; margin-bottom:1vw;word-break:break-all;";
          div.innerHTML =
            `<h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Date:</span> ${array[i].date}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">From:</span> ${array[i].from}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">To:</span> ${array[i].to}</h5><br>
        <button id="${id}${array[i]._id}" onclick="removeCalendarDate(this.id)" class="btn btn-danger" style="display:inline"><b>Remove Date</b></button><br><br>`

          document.getElementById(`cleaner-calendar${id}`).appendChild(div);
          document.getElementById(`spin${id}`).className = "d-none lds-spinner";
        }
      } else {
        document.getElementById(`spin${id}`).className = "d-none lds-spinner";
        alertify.error('No schedule dates found!');
      }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
  }
}

//Adding schedule besed on correct date and time
function addScheduleDate(id) {
  var from_time = document.getElementById(`from-time${id}`).value;
  var to_time = document.getElementById(`to-time${id}`).value;
  from_time += document.getElementById(`from-option${id}`).value;
  to_time += document.getElementById(`to-option${id}`).value;
  if (parseInt(from_time) > parseInt(to_time) ||
    document.getElementById(`datePicker${id}`).value.length < 1) {
    alertify.error('Wrong time selected, check again.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    const requestBody =
      `date=${document.getElementById(`datePicker${id}`).value}` +
      `&from=${from_time}` +
      `&to=${to_time}` +
      `&user=${users_array[id].username}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Date added to schedule!');
        manageCalendar(id,0);
      })
      .catch(error => {
        alertify.error('Error on the server.');
      });
  }
}

//Addmin occuring schedule
function addScheduleRepeat(id){
  var from_time = document.getElementById(`from-time-repeat${id}`).value;
  var to_time = document.getElementById(`to-time-repeat${id}`).value;
  from_time += document.getElementById(`from-repeat-option${id}`).value;
  to_time += document.getElementById(`to-repeat-option${id}`).value;
  if (parseInt(from_time) > parseInt(to_time) ||
    document.getElementById(`day${id}`).value.length < 1) {
    alertify.error('Wrong time selected, check again.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    const requestBody =
      `date=${document.getElementById(`day${id}`).value}` +
      `&from=${from_time}` +
      `&to=${to_time}` +
      `&user=${users_array[id].username}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Date added to schedule!');
        manageCalendar(id,0);
      })
      .catch(error => {
        alertify.error('Error on the server.');
      });
  }
}

//Remove date from cleaners calendar
function removeCalendarDate(id) {
  var number = id.substring(0,1);
  var id_finite = id.substring(1,id.length);
      //Change bellow url from localhost to actual host
  const Url = "http://127.0.0.1:8000/cleaner/removedate";
  const requestBody =
    `id=${id_finite}` +
    `&username=${users_array[number].username}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      manageCalendar(number,0);
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Suspend cleaner account, process inreversible
function suspendAccount(id) {
  var r = confirm("Are you sure? Account cannot be recovered later.");
  if (r == true) {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/admin/suspend";
    const requestBody =
      `username=${users_array[id].username}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Cleners account suspended.');
        getUsers();
      })
      .catch(error => {
        alertify.error('Server unreachable!')
      });
  }
}

//Gets current rates from server
function getRates() {
  const Url = "http://127.0.0.1:8000/admin/getrates";
  axios.get(Url).then(function (response) {
      //Change currencly bellow its dollar
      document.getElementById('room-rate').innerHTML = `${response.data.room}$`;
      document.getElementById('bathroom-rate').innerHTML = `${response.data.bathroom}$`;
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
  fetchBookings();
}

//Allows admin to set the current rate for rooms
function setRoomRate() {
  var value = document.getElementById('room_rate').value;
  if (value < 0 ||!isNum(value)) {
    alertify.error('Incorrect value!!');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/admin/roomrate";
    const requestBody =
      `room=${document.getElementById('room_rate').value}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Rate Changed!');
        getRates();
      })
      .catch(error => {
        alertify.error('Server unreachable!')
      });
  }
}

//Function to check is input is number
function isNum(str) {
  var n = Number(str);
  return n !== Infinity && String(n) === str && n >= 0;
}


//Function allows admin to change bathroom rate in DB
function setBathRoomRate() {
  var value = document.getElementById('bathroom_rate').value;
  if (value < 0 ||!isNum(value) ) {
    alertify.error('Incorrect value!!');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/admin/bathroomrate";
    const requestBody =
      `bathroom=${document.getElementById('bathroom_rate').value}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Rate Changed!');
        getRates();
      })
      .catch(error => {
        alertify.error('Server unreachable!')
      });
  }
}

//Fething all bookings and info as an array from server
function fetchBookings() {
  document.getElementById('spin').className = "lds-spinner";
      //Change bellow url from localhost to actual host
  const Url = "http://127.0.0.1:8000/admin/fetchbookings";
  axios.get(Url).then(function (response) {
      document.getElementById('bookings').innerHTML = "";
      var array = response.data;
      bookings_array = array;
      if(response.data.length>0){
      for (var i = 0; i < array.length; i++) {
        var color = 'text-primary';
        var div = document.createElement('div');
        div.className = "p-4 col-md-4 mr-3 shadow card border-left-primary";
        div.id = `booking_${i}`;
        div.style = "border-radius: 10px; margin-bottom:2vw;word-break:break-all;";
        if (array[i].status == 'Pending') {
          var color = 'text-warning';
        } else if (array[i].status == 'Confirmed') {
          var color = 'text-primary';
        } else if (array[i].status == 'Canceled') {
          var color = 'text-danger';
        } else if (array[i].status == 'Completed') {
          var color = 'text-success';
        }
        div.innerHTML =
          `<h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Name:</span> ${array[i].name}</h5><br>
          <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">State:</span> ${array[i].state}</h5><br>
          <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">City:</span> ${array[i].city}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Address:</span> ${array[i].address}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">E-mail</span> ${array[i].email}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Phone No.</span> ${array[i].phone_no}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Rooms:</span> ${array[i].rooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Bathrooms:</span> ${array[i].bathrooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Time:</span> ${array[i].time}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Price:</span> ${array[i].price}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Cleaner Appointed:</span> ${array[i].cleaner_appointed}</h5><br>
        <h5 class="${color}" style="display:inline;margin-right: 2vw;"><span class="text-primary">Status:</span> ${array[i].status}</h5><br>
        <button id="${array[i]._id}" onclick="changeStatus(this.id)" class="btn btn-success" style="display:inline"><b>Change Status</b></button><br><br>
        <button id="${array[i]._id}archive" onclick="archiveBooking(this.id)" class="btn btn-primary" style="display:inline"><b>Archive Booking</b></button><br><br>`


        document.getElementById('bookings').appendChild(div);
        document.getElementById('spin').className = "d-none lds-spinner";
      }
    }
    else{
      document.getElementById('spin').className = "d-none lds-spinner";
      alertify.error('No Bookings found.');
    }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Change status of a booking, in server side email is also sent to user and admin
function changeStatus(id) {
  swal("", {
      buttons: {
        pending: {
          text: "Pending",
          value: "Pending",
        },
        completed: {
          text: "Completed",
          value: "Completed",
        },
        canceled: {
          text: "Canceled",
          value: "Canceled",
        },
        confirmed: {
          text: "Confirmed",
          value: "Confirmed",
        },
      },
    })
    .then((value) => {
      //Change bellow url from localhost to actual host
      const Url = "http://127.0.0.1:8000/admin/changestatus";
      const requestBody =
        `id=${id}` +
        `&status=${value}`;
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      axios.post(Url, requestBody, config).then(function (response) {
          swal("STATUS CHANGED!");
          getRates();
        })
        .catch(error => {
          alertify.error('Server unreachable!')
        });
      });
  }

//Functionality to allow archiving of bookings to prevent too many displaying in Admin Panel, they are still in database 
//and visible for user and cleaners
function archiveBooking(id){
  var r = confirm("Are you sure? This will only hide booking for admin, user and cleaner can still see it.");
  if (r == true) {
  var item_id = id.substring(0,id.length-7);
  //Change bellow url from localhost to actual host
  const Url = "http://127.0.0.1:8000/admin/archive";
  const requestBody =
    `id=${item_id}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      alertify.success('Archived!');
      getRates();
    })
    .catch(error => {
      alertify.error('Server unreachable!')
    });
  }
};
