var calender_array = [];
var new_bookings_array = [];
//Every half-minute a check for new bookings runs
setInterval(function(){ 
  newBooking();
}, 30 * 1000); // 30 * 1000 milsec

//Function that allows cleaner to accept a booking, changing status to Confirmed and preventing other Cleaners from accepting it
function acceptBooking(id){
  //Change bellow url from localhost to actual host for the login API
  const Url = "http://127.0.0.1:8000/cleaner/acceptbooking";
  const requestBody =
    `username=${sessionStorage.getItem('user')}` +
    `&id=${id}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
    alertify.success('Success. You are now appointed for this booking. You can view it under My Bookings panel.')
    newBooking();
    })
    .catch(error => {
      alertify.error('This Bookings is already Accepted by some of your coleagues.')
      newBooking();
    });
}

//Fuunction fethches newly arrived bookings to database and displays them in cleaners panel
function newBooking() {
  document.getElementById('spin1').className = "lds-spinner";
  const Url = "http://127.0.0.1:8000/cleaner/newbookings";
  axios.get(Url).then(function (response) {
    document.getElementById('new-bookings').innerHTML = "";
        var array = response.data;
        new_bookings_array = array;
      if (response.data.length > 0) {
        for (var i = 0; i < array.length; i++) {
          var color = 'text-primary';
          var div = document.createElement('div');
          div.className = "p-4 col-md-4 mr-3 card border-left-primary";
          div.id = `booking_${i}`;
          div.style = "border-radius: 10px; margin-bottom:2vw;word-break:break-all;";
          var color = 'text-warning';
          div.innerHTML =
            `<h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Name:</span> ${array[i].name}</h5><br>
            <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">State:</span> ${array[i].state}</h5><br>
            <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">City:</span> ${array[i].city}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Address:</span> ${array[i].address}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Phone No.</span> ${array[i].phone_no}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">E-mail</span> ${array[i].email}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Rooms:</span> ${array[i].rooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Bathrooms:</span> ${array[i].bathrooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Time:</span> ${array[i].time}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Price:</span> ${array[i].price}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Cleaner Appointed:</span> ${array[i].cleaner_appointed}</h5><br>
        <h5 class="${color}" style="display:inline;margin-right: 2vw;"><span class="text-primary">Status:</span> ${array[i].status}</h5><br>
        <button id="${array[i]._id}" onclick="acceptBooking(this.id)" class="btn btn-success" style="display:inline"><b>Accept This Booking</b></button><br><br>`

          document.getElementById('new-bookings').appendChild(div);
          document.getElementById('spin1').className = "d-none lds-spinner";
        }
      } else {
        document.getElementById('spin1').className = "d-none lds-spinner";
          var div = document.createElement('div');
          div.className = "p-4 col-md-8 mr-3";
          div.innerHTML =
            `<h4 class="text-danger">No new Bookings</h4>`

          document.getElementById('new-bookings').appendChild(div);
      }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
  }

//Change panel menus by adding d-none class or removing it
function changeMenu(menu_id) {
    switch (menu_id) {
    case 'new-bookings':
      {
        document.getElementById('change_password').classList += " d-none";
        document.getElementById('my-bookings').classList += " d-none";
        document.getElementById('schedule').classList += " d-none";
        document.getElementById('all-bookings').classList.remove;
        document.getElementById('all-bookings').classList = "container-fluid";
        document.getElementById('first_menu').className += " selected";
        document.getElementById('third_menu').classList.remove;
        document.getElementById('third_menu').classList = "fas fa-clock";
        document.getElementById('second_menu').classList.remove;
        document.getElementById('second_menu').classList = "fas fa-calendar";
        document.getElementById('fourth_menu').classList.remove;
        document.getElementById('fourth_menu').classList = "fas fa-key";
        newBooking();
        break;
      }
    case 'my-bookings':
      {
        document.getElementById('change_password').classList += " d-none";
        document.getElementById('all-bookings').classList += " d-none";
        document.getElementById('schedule').classList += " d-none";
        document.getElementById('my-bookings').classList.remove;
        document.getElementById('my-bookings').classList = "container-fluid";
        document.getElementById('second_menu').className += " selected";
        document.getElementById('third_menu').classList.remove;
        document.getElementById('third_menu').classList = "fas fa-clock";
        document.getElementById('first_menu').classList.remove;
        document.getElementById('first_menu').classList = "fas fa-calendar-alt";
        document.getElementById('fourth_menu').classList.remove;
        document.getElementById('fourth_menu').classList = "fas fa-key";
        fetchBookings();
        break;
      }
    case 'schedule':
      {
        document.getElementById('change_password').classList += " d-none";
        document.getElementById('my-bookings').classList += " d-none";
        document.getElementById('all-bookings').classList += " d-none";
        document.getElementById('schedule').classList.remove;
        document.getElementById('schedule').classList = "row";
        document.getElementById('third_menu').className += " selected";
        document.getElementById('first_menu').classList.remove;
        document.getElementById('first_menu').classList = "fas fa-calendar-alt";
        document.getElementById('second_menu').classList.remove;
        document.getElementById('second_menu').classList = "fas fa-calendar";
        document.getElementById('fourth_menu').classList.remove;
        document.getElementById('fourth_menu').classList = "fas fa-key";
        getCleanerCalendar();
        break;
      }
    case 'change_password':
      {
        document.getElementById('all-bookings').classList += " d-none";
        document.getElementById('my-bookings').classList += " d-none";
        document.getElementById('schedule').classList += " d-none";
        document.getElementById('change_password').classList.remove;
        document.getElementById('change_password').classList = "container-fluid";
        document.getElementById('fourth_menu').className += " selected";
        document.getElementById('third_menu').classList.remove;
        document.getElementById('third_menu').classList = "fas fa-clock";
        document.getElementById('second_menu').classList.remove;
        document.getElementById('second_menu').classList = "fas fa-calendar";
        document.getElementById('first_menu').classList.remove;
        document.getElementById('first_menu').classList = "fas fa-calendar-alt";
        break;
      }
  }
}

//Change clenaer account password, first checking in server if old password matches
function changePassword() {
  if (document.getElementById('new_password').value.length < 8) {
    alertify.error('Password lenght must be bigger than 8 for security purposes.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/cleaner/changepassword";
    const requestBody =
      `old_password=${document.getElementById('old_password').value}` +
      `&new_password=${document.getElementById('new_password').value}` +
      `&username=${sessionStorage.getItem('user')}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Password changed! You will be redirected to login again.');
        setTimeout(function () {
          sessionStorage.removeItem('token');
          //Change actual host here
          window.location.replace('http://127.0.0.1:8000/cleaner/');
        }, 3000);
      })
      .catch(error => {
        alertify.error('Old password incorrect!')
      });
  }
}

//Cleaners login and token validation
function login() {
  //Check fields
  if (document.getElementById("username").value.length < 1 || document.getElementById("password").value.length < 1) {
    alertify.error('Please fill in the required fields.');
    return;
  }

  //Change bellow url from localhost to actual host for the login API
  const Url = "http://127.0.0.1:8000/cleaner/login";
  const requestBody =
    `username=${document.getElementById("username").value}` +
    `&password=${document.getElementById("password").value}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      sessionStorage.setItem('token', `${response.data.token}`);
      sessionStorage.setItem('user', `${document.getElementById("username").value}`);
      //Change bellow actual panel url
      window.location.replace('http://127.0.0.1:8000/cleaner/panel');
    })
    .catch(error => {
      alertify.error('Wrong username and/or password.')
    });
}

//Send request to validate token if it exists to skip login process, token is valid for one day only
function onPage() {
  if (sessionStorage.getItem('token')) {
    const Url = "http://127.0.0.1:8000/cleaner/";
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    };
    axios.post(Url, {}, config).then(function (response) {
        //If token exists redirect to panel page, change localhost to actual one
        window.location.replace(`http://127.0.0.1:8000/cleaner/panel?token=${sessionStorage.getItem('token')}`);
      })
      .catch(error => {});
  }
}

//Adding correct date and time to cleaners schedule
function addScheduleDate() {
  var from_time = document.getElementById('from-time').value;
  var to_time = document.getElementById('to-time').value;
  from_time += document.getElementById('from-option').value;
  to_time += document.getElementById('to-option').value;
  if(document.getElementById('datePicker').value.length < 1) {
    alertify.error('Wrong time selected, check again.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    const requestBody =
      `date=${document.getElementById('datePicker').value}` +
      `&from=${from_time}` +
      `&to=${to_time}` +
      `&user=${sessionStorage.getItem('user')}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Date added to schedule!');
        getCleanerCalendar();

      })
      .catch(error => {
        alertify.error('Error on the server.');
      });
  }
}

//Similar to above but allows occuring date to be added
function addScheduleRepeat() {
  var from_time = document.getElementById('from-time-repeat').value;
  var to_time = document.getElementById('to-time-repeat').value;
  from_time += document.getElementById('from-repeat-option').value;
  to_time += document.getElementById('to-repeat-option').value;
  if (document.getElementById('day').value.length < 1) {
    alertify.error('Wrong time selected, check again.');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/cleaner/addschedule";
    const requestBody =
      `date=${document.getElementById('day').value}` +
      `&from=${from_time}` +
      `&to=${to_time}` +
      `&user=${sessionStorage.getItem('user')}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Date added to schedule!');
        getCleanerCalendar();
      })
      .catch(error => {
        alertify.error('Error on the server.');
      });
  }
}


//Fetched cleaners calendar as array from back-end
function getCleanerCalendar() {
  document.getElementById("spin2").classList = "lds-spinner";
  const Url = "http://127.0.0.1:8000/cleaner/getcleanercalendar";
  const requestBody =
    `user=${sessionStorage.getItem('user')}`;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      document.getElementById('cleaner-calendar').innerHTML = "";
      var array = response.data;
      calender_array = array;
      if (response.data.length > 0) {
        for (var i = 0; i < array.length; i++) {
          var div = document.createElement('div');
          div.className = "p-4 border-left-primary shadow";
          div.id = `calendar_${i}`;
          div.style = ";border-radius: 10px; margin-bottom:1vw;word-break:break-all;";
          div.innerHTML =
            `<h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Date:</span> ${array[i].date}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">From:</span> ${array[i].from}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">To:</span> ${array[i].to}</h5><br>
        <button id="${array[i]._id}" onclick="removeCalendarDate(this.id)" class="btn btn-danger" style="display:inline"><b>Remove Date</b></button><br><br>`

          document.getElementById('cleaner-calendar').appendChild(div);
          document.getElementById('spin2').className = "d-none lds-spinner";
        }
      } else {
        document.getElementById('spin2').className = "d-none lds-spinner";
        alertify.error('No schedule dates found!');
      }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Allows cleaner to remove a data being it occuring or normal
function removeCalendarDate(id) {
  const Url = "http://127.0.0.1:8000/cleaner/removedate";
  const requestBody =
    `id=${id}` +
    `&username=${sessionStorage.getItem('user')}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      getCleanerCalendar();
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Fetches all previous cleaning bookings where the appointed cleaner is the cleaner logged in
function fetchBookings() {
  document.getElementById('spin').className = "lds-spinner";
  const Url = "http://127.0.0.1:8000/cleaner/fetchbookings";
  const requestBody =
    `&user=${sessionStorage.getItem('user')}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
    document.getElementById('bookings').innerHTML = "";
        var array = response.data;
        bookings_array = array;
      if (response.data.length > 0) {
        for (var i = 0; i < array.length; i++) {
          var color = 'text-primary';
          var div = document.createElement('div');
          div.className = "p-4 col-md-4 mr-3 card border-left-success";
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
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Phone No.</span> ${array[i].phone_no}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">E-mail</span> ${array[i].email}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Rooms:</span> ${array[i].rooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Bathrooms:</span> ${array[i].bathrooms}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Time:</span> ${array[i].time}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Price:</span> ${array[i].price}</h5><br>
        <h5 class="text-primary" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Cleaner Appointed:</span> ${array[i].cleaner_appointed}</h5><br>
        <h5 class="${color}" style="display:inline;margin-right: 2vw;"><span class="text-primary">Status:</span> ${array[i].status}</h5><br>
        <div class="mt-3">
        <h5 class="text-secondary">Change Estimates For This Address</h5>
        <label for="room_price" class="text-primary"><b>Room Price</label><br>
        <input type="text" id="room_price${i}" placeholder="Room Price" class="search-input text-center mb-2" /><br>
        <label for="bathroom_price" class="text-primary"><b>Bathoom Price</label><br>
        <input type="text" id="bathroom_price${i}" placeholder="Bathroom Price" class="search-input text-center mb-2" /><br>
        </div>
        <button id="${i}" onclick="changeEstimates(this.id)" class="text-white btn btn-warning"><b>CHANGE NOW</b></button><br><br>`
          document.getElementById('bookings').appendChild(div);
          document.getElementById('spin').className = "d-none lds-spinner";
        }
      } else {
        document.getElementById('spin').className = "d-none lds-spinner";
        alertify.error('No previous bookings found for user!');
      }
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}

//Allows cleaner to change estimated for a certain addres from My-Bookings panel
function changeEstimates(id){
  if(document.getElementById(`room_price${id}`).value.length<1 ||
  document.getElementById(`bathroom_price${id}`).value.length <1){
    alertify.error('Please fill in both fields to update price.');
  }
  else{
  const Url = "http://127.0.0.1:8000/cleaner/estimates";
  const requestBody =
    `address=${bookings_array[id].address}`+
    `&room_price=${document.getElementById(`room_price${id}`).value}`+
    `&bathroom_price=${document.getElementById(`bathroom_price${id}`).value}`
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios.post(Url, requestBody, config).then(function (response) {
      alertify.success("Estimates for Address Changed!");
    })
    .catch(error => {
      alertify.error('Server unreachable!');
    });
}
}

window.onload = onPage();