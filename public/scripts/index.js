var value_arr_GLOBAL = [];
var options = 0;
var calls_time = -1;
var date;

function setDate(year,month,day){
  date = `${year}-${month}-${day}`;
  console.log(date);
}

//Check if e-mail is correct
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//Function sends contact info to back-end and node-mailer
function contact() {
  let name = document.getElementById("contact-name").value;
  let email = document.getElementById("contact-email").value;
  let message = document.getElementById("contact-message").value;
  if (name.length < 1 || email.length < 1 || message.length < 1 || !validateEmail(email)) {
    alertify.error('Please fill in all the fields...');
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/contact";
    const requestBody =
      `name=${name}` +
      `&email=${email}` +
      `&message=${message}`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        alertify.success('Message Sent');
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-email").value = "";
        document.getElementById("contact-message").value = "";
      })
      .catch(error => {
        alertify.error('Server unreachable. Please try again later.');
      });
  }
}

//Function adds minutes to the FROM-TIME
function addMinutes(time, minutes, flag) {
  var hours = time.substring(0, 2);
  hours = parseInt(hours);
  var minutes_from_time = time.substring(3, 5);
  minutes_from_time = parseInt(minutes_from_time) + minutes;
  while (minutes_from_time >= 60) {
    hours += 1;
    minutes_from_time -= 60;
  }
  if (minutes_from_time == 0) {
    minutes_from_time = `${minutes_from_time}0`;
  }
  var time_to_string;
  if (hours > 12) {
    hours -= 12;
    if (flag == 'AM')
      flag = 'PM';
    else if (flag == 'PM')
      flag = 'AM';
  }
  if (hours < 10) {
    time_to_string = `0${hours}:${minutes_from_time} ${flag}`;
  } else {
    time_to_string = `${hours}:${minutes_from_time} ${flag}`;
  }
  return time_to_string;
}

//Function calcualted estimated from database info
function getEstimates() {
  if (document.getElementById("estimates-address").value.length < 1 ||
    document.getElementById("estimates-rooms").value.length < 1 ||
    document.getElementById("estimates-city").value.length < 1 ||
    document.getElementById("estimates-state").value.length < 1 ||
    document.getElementById("estimates-bathrooms").value.length < 1 ||
    document.getElementById("estimates-rooms").value < 0 ||
    document.getElementById("estimates-bathrooms").value < 0) {
    alertify.error("Please fill in all the fields.")
  } 
  else if(document.getElementById('estimates-state').value != 'Ohio'){
    alertify.error('Only Ohio state is allowed.');
  }
  else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/getestimates";
    const requestBody =
      `rooms=${document.getElementById("estimates-rooms").value}` +
      `&address=${document.getElementById("estimates-address").value}` +
      `&city=${document.getElementById("estimates-city").value}` +
      `&state=${document.getElementById("estimates-state").value}` +
      `&bathrooms=${document.getElementById("estimates-bathrooms").value}`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        swal("", {
            text: `Cleaning price estimatet to ${response.data.price}$. Continue booking?`,
            buttons: {
              cancel: "Cancel",
              continue: {
                text: "Yes",
                value: "yes",
              }
            },
          })
          .then((value) => {
            if (value == 'yes') {
              var value_arr = [];
              //Change bellow url from localhost to actual host
              const Url = "http://127.0.0.1:8000/fetchtime";
              axios.get(Url).then(function (response) {
                value_arr_GLOBAL = response.data.slice(0);
              })
              document.getElementById('estimates1').className = "d-none";
              document.getElementById('estimates2').className = "";
            } else {
              return;
            }
          });
      })
      .catch(error => {
        alertify.error('Server unreachable. Please try again later.');
      });
  }
}

function populateSelect(month_outside, date) {
  calls_time++;
  for(var i=options-1; i>=0;i--){
    document.getElementById('time-select').options[i] = null;
  }
  options = 0;
  var value_arr = value_arr_GLOBAL.slice(0);
  var rooms_number = parseInt(document.getElementById('estimates-rooms').value);
  var bathrooms_number = parseInt(document.getElementById('estimates-bathrooms').value);
  var time_rooms = 0;
  var time_bathrooms = 0;
  var total = rooms_number + bathrooms_number;
  if (total > 3) {
    var change = 3;
    if (rooms_number > 0) {
      rooms_number--;
      change--;
    }
    if (bathrooms_number > 0) {
      bathrooms_number--;
      change--;
    }
    if (rooms_number > 0) {
      rooms_number--;
      change--;
    }

    if (bathrooms_number > 0 && change > 0) {
      bathrooms_number--;
      change--;
    }
    if (rooms_number > 0 && change > 0) {
      rooms_number--;
      change--;
    }
    if (bathrooms_number > 0 && change > 0) {
      bathrooms_number--;
      change--;
    }
    time_bathrooms = bathrooms_number * 30;
    time_rooms = rooms_number * 45;
  }
  var k = 0;
  var added_time = 90 + time_bathrooms + time_rooms;
  for (let i = 0; i < value_arr.length; i++) {
    value_arr[i] = value_arr[i].substring(5, value_arr[i].length);
    var day = value_arr[i].substring(3,5);
    day = parseInt(day);
    var month = value_arr[i].substring(0, 2);
    month = parseInt(month);
    if(month==month_outside && day==date){
    value_arr[i] = `${value_arr[i].substring(5,13).trim()} - ${addMinutes(value_arr[i].substring(5,11).trim(),
    added_time,
    value_arr[i].substring(11,13).trim())}`;
    var select = document.getElementById('time-select');
    select.options[k] = new Option(`${value_arr[i]}`, `${value_arr[i]}`);
    k++;
    options++;
    }
  }
  if(options==0 && calls_time != 0){
swal({
  title: "No Available Time slot on Choosen date!",
  icon: "error",
  text: "Please choose dates marked with a bubble number."
})
}
}

function validate(email) {
  var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

  if (!emailFilter.test(email)) {
    return false;
  }

  return true;
}

//Send all booking info entered to back-end, user is immediatelly contacted via e-mail as well admin
function bookNow() {
  console.log(document.getElementById("booking-phone").value.length)
  if (document.getElementById("booking-name").value < 1 ||
    document.getElementById("booking-email").value < 1 ||
    !validate(document.getElementById('booking-email').value) ||
    document.getElementById('time-select').value.length<1) {
    alertify.error("Please check all the fields and try again.");
  } 
  else if(document.getElementById("booking-phone").value.length != 10){
      alertify.error('Please enter a valid phone number');
    }  else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/addbooking";
    const requestBody =
      `address=${document.getElementById('estimates-address').value}` +
      `&rooms=${document.getElementById('estimates-rooms').value}` +
      `&city=${document.getElementById('estimates-city').value}` +
      `&state=${document.getElementById('estimates-state').value}` +
      `&bathrooms=${document.getElementById('estimates-bathrooms').value}` +
      `&email=${document.getElementById('booking-email').value}` +
      `&date=${date}` +
      `&phone_no=${document.getElementById('booking-phone').value}` +
      `&name=${document.getElementById('booking-name').value}` +
      `&time=${document.getElementById('time-select').value}`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        //Change bellow address with actual code for redirecting after a successfull booking
        sessionStorage.setItem('email', document.getElementById('booking-email').value);
        sessionStorage.setItem('message', true);
        window.location.replace('/bookings');
      })
      .catch(error => {
        console.log(error);
        alertify.error('A booking for the same address was made today or our server is qurrently down.');
      });
  }
}

//Fetch customers bookings and displays them based on e-mail entered from My-Bookings panel
function customerBookings() {
  if (document.getElementById('customer-email').value.length < 5) {
    alertify.error("Please fill in the email field correctly.");
  } else {
    //Change bellow url from localhost to actual host
    const Url = "http://127.0.0.1:8000/customerbookings";
    const requestBody =
      `&email=${document.getElementById('customer-email').value}`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        if (response.data.length > 0) {
          document.getElementById('customers-bookings').innerHTML = "";
          var array = response.data;
          if (response.data.length > 0) {
            for (var i = 0; i < array.length; i++) {
              var color = 'text-primary';
              var div = document.createElement('div');
              div.className = "p-4 col-md-4 mr-3 bg-info";
              div.id = `booking_${i}`;
              div.style = "border-radius: 10px;margin-left:1vw; marign-right:1vw; margin-bottom:2vw;word-break:break-all;";
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
                `<h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Name:</span> ${array[i].name}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Address:</span> ${array[i].address}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Phone No.</span> ${array[i].phone_no}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Rooms:</span> ${array[i].rooms}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Bathrooms:</span> ${array[i].bathrooms}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Time:</span> ${array[i].time}</h5><br>
        <h5 class="text-white" style="display:inline;margin-right: 2vw;"><span class="text-secondary">Price:</span> ${array[i].price}</h5><br>
        <h5 class="${color}" style="display:inline;margin-right: 2vw;"><span class="text-white">Status:</span> ${array[i].status}</h5><br>`
              document.getElementById('customers-bookings').appendChild(div);
            }
          }
        } else {
          alertify.error("No current bookings on this email address.");
          document.getElementById('customers-bookings').innerHTML = "";
        }
      })
      .catch(error => {
        alertify.error('Server unreachable. Please try again later.');
        document.getElementById('customers-bookings').innerHTML = "";
      });
  }
}
