const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var path = require("path");
var adminRoute = require("./src/Server/controllers/admin.js");
var Bookings = require("./src/Server/models/bookings");
var User = require("./src/Server/models/user");
var Estimates = require("./src/Server/models/estimates");
var cleanerRoute = require("./src/Server/controllers/cleaner");
const nodemailer = require("nodemailer");
var schedule = require("node-schedule");

const app = express();
let server = require("http").Server(app);

//Maps days to actual next date in terms of Tuesday to 2019-xx-xx
function nextWeekdayDate(date, day_in_week) {
  var ret = new Date(date || new Date());
  ret.setDate(ret.getDate() + ((day_in_week - 1 - ret.getDay() + 7) % 7) + 1);
  return ret;
}
//Converts date object to string
function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join("-");
}

//Email sending transporter, using the gmail already created as an admin gmail
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "subcleaner2019@gmail.com",
    pass: "SubCleaner2019"
  }
});

//Enabling CORS and body-parser url encoded for API calls from front-end
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//Setting the static folder for css, images and front-end javascript
app.use(express.static("public"));

//Schedule for checking Bookings that are due on the current day, changing status to Completed, and e-mailing admin and user
//Function will run each first minute of an hour, check all bokings data and time compared to the current and if/
// it is a match it will change the status to Completed and notify admin and user for the state
var j = schedule.scheduleJob("01 * * * *", function() {
  var datetime = new Date();
  Bookings.find({}, function(err, data) {
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].time.includes(datetime.toISOString().slice(0, 10)) &&
        data[i].status != "Completed"
      ) {
        Bookings.findByIdAndUpdate(data[i]._id, {
          status: "Completed"
        }).then(booking => {
          var mailOptions = {
            to: "subcleaner2019@gmail.com",
            subject: "A Booking is Completed",
            text: `Address: ${booking.address},\n Customer Name: ${
              booking.name
            },\n Cleaner Appointed: ${booking.cleaner_appointed}`
          };
          transporter.sendMail(mailOptions);
          var mailOptions2 = {
            to: `${booking.email}`,
            subject: "Your Booking is today",
            text: `We would like to inform you that you booking is scheduled for today, or is already complete.
            Thank you for using our services!`
          };
          transporter.sendMail(mailOptions2);
        });
      }
    }
  });
});

//Fetching all possible calendar date combinations from all users, removing duplicates for front-end displaying in the select
app.use("/fetchtime", (req, res) => {
  var date_today = new Date();
  var date_arr = [];
  User.find(
    {
      type: "user"
    },
    (err, data) => {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].available_date.length; j++) {
          date_arr.push(
            `${data[i].available_date[j].date} ${
              data[i].available_date[j].from
            } - ${data[i].available_date[j].to}`
          );
        }
      }
      for (var i = 0; i < date_arr.length; i++) {
        if (date_arr[i].includes("Monday")) {
          var toDate = nextWeekdayDate(date_today, 1);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Monday", toDate);
        }
        if (date_arr[i].includes("Tuesday")) {
          var toDate = nextWeekdayDate(date_today, 2);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Tuesday", toDate);
        }
        if (date_arr[i].includes("Wednesday")) {
          var toDate = nextWeekdayDate(date_today, 3);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Wednesday", toDate);
        }
        if (date_arr[i].includes("Thursday")) {
          var toDate = nextWeekdayDate(date_today, 4);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Thursday", toDate);
        }
        if (date_arr[i].includes("Friday")) {
          var toDate = nextWeekdayDate(date_today, 5);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Friday", toDate);
        }
        if (date_arr[i].includes("Saturday")) {
          var toDate = nextWeekdayDate(date_today, 6);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Saturday", toDate);
        }
        if (date_arr[i].includes("Sunday")) {
          var toDate = nextWeekdayDate(date_today, 7);
          toDate = convertDate(toDate);
          date_arr[i] = date_arr[i].replace("Sunday", toDate);
        }
      }
      Bookings.find({}, (err, data) => {
        var bookings_arr = [];
        for (var i = 0; i < data.length; i++) {
          var bookings_month = data[i].time.substring(5, 6);
          bookings_month = parseInt(bookings_month);
          if (bookings_month < 10) {
            bookings_month = `0${bookings_month}`;
          }
          bookings_arr.push(
            `${data[i].time.substring(0, 4)}-${bookings_month}${data[
              i
            ].time.substring(6, 18)}`
          );
        }
        for (var i = 0; i < date_arr.length; i++) {
          for (var j = 0; j < bookings_arr.length; j++) {
            if (date_arr[i].substring(0, 18).trim() == bookings_arr[j].trim()) {
              date_arr.splice(i, 1);
            }
          }
        }
        var filteredArr = date_arr.filter(function(item, index) {
          if (date_arr.indexOf(item) == index) return item;
        });
        res.status(200).send(filteredArr);
      });
    }
  );
});

//Fetch customer bookings based on the email entered from My-Bookings panel
app.use("/customerbookings", (req, res) => {
  Bookings.find(
    {
      email: req.body.email,
      phone_no: req.body.phone_no
    },
    (err, data) => {
      res.status(200).send(data);
    }
  );
});

//Contact form, contact mails are received on admin gmail
app.use("/contact", (req, res) => {
  var mailOptions = {
    to: "subcleaner2019@gmail.com",
    subject: "Page Contact Form",
    text: `From - Email: ${req.body.email},\n Name: ${
      req.body.name
    },\n Message: ${req.body.message}`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
});

//Adding a new booking for a customer
app.use("/addbooking", (req, res) => {
  var d = new Date();
  var room_int = parseInt(req.body.rooms);
  var bathroom_int = parseInt(req.body.bathrooms);
  Bookings.findOne(
    {
      address: req.body.address,
      date_booked: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    },
    (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        if (data) {
          res.status(500).send();
        } else {
          Estimates.findOne({
            type: "regular"
          }).then(data => {
            var price_db = bathroom_int * data.bathroom + data.room * room_int;
            var new_booking = new Bookings({
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              rooms: req.body.rooms,
              bathrooms: req.body.bathrooms,
              email: req.body.email,
              phone_no: req.body.phone_no,
              name: req.body.name,
              time: `${req.body.date} ${req.body.time}`,
              status: "Pending",
              price: `${price_db}`,
              archived: false,
              date_booked: `${d.getFullYear()}-${d.getMonth() +
                1}-${d.getDate()}`,
              cleaner_appointed: "/"
            });
            new_booking.save(function(err) {
              if (err) {
                res.status(500).send();
              } else {
                var mailOptions = {
                  to: `${req.body.email}`,
                  subject: "New Cleaning Booked",
                  text: `We've just received a new booking from you.
                While our employees review and accept you booking, you can check the status from the My Booking tab on our webpage.
                Date: ${req.body.date}
                Time: ${req.body.time}
                 Thank you for using our services.`
                };
                transporter.sendMail(mailOptions);
                var mailOptions = {
                  to: "subcleaner2019@gmail.com",
                  subject: "New Booking Received",
                  text: `From - Email: ${req.body.email},\n Name: ${
                    req.body.name
                  },\n Address: ${req.body.address},
                Price: ${price_db}.
                Check more info in Admin Panel.`
                };
                transporter.sendMail(mailOptions);
                res.status(200).send();
              }
            });
          });
        }
      }
    }
  );
});

//Getting estiamates for booking, if cleaner has changed estimates for certain address they are fetched,
//Else the rates that are set from admin side are fetched
app.use("/getestimates", (req, res) => {
  var address = req.body.address.toLowerCase();
  //I do not know the usage or checks of city and state so i leave them bellow as they are, but they are send from front-end
  var city = req.body.city;
  var state = req.body.state;
  var room_int = parseInt(req.body.rooms);
  var bathroom_int = parseInt(req.body.bathrooms);
  Estimates.find(
    {
      type: "Cleaner Edited"
    },
    (err, data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].address.toLowerCase() == address) {
          var price = bathroom_int * data[i].bathroom + data[i].room * room_int;
          res.send(
            JSON.stringify({
              price: `${price}`
            })
          );
        } else {
          Estimates.findOne({
            type: "regular"
          }).then(data => {
            var price = bathroom_int * data.bathroom + data.room * room_int;
            res.send(
              JSON.stringify({
                price: `${price}`
              })
            );
          });
        }
      }
    }
  );
});

//Admin panel route
app.use("/admin", adminRoute);
//Cleaner panel route
app.use("/cleaner", cleanerRoute);

//Serving the My Bookings page
app.use("/bookings", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/bookings.html"));
});

//Serving the main (index.html) page
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

const port = process.env.PORT || 8000;

server.listen(port, () => {});
