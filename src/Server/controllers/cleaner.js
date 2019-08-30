var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("../models/user");
var bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var path = require('path');
var Estimates = require('../models/estimates');
var Bookings = require('../models/bookings');
const nodemailer = require("nodemailer");
var ObjectId = require('mongoose').Types.ObjectId;
const SALT_WORK_FACTOR = 10;

//Email sending transporter
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
  auth: {
    user: 'subcleaner2019@gmail.com',
    pass: 'SubCleaner2019'
  }
});

router.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  router.use(bodyParser.json());
router.use(express.static('public'));


//Returning bookings for the cleaner panel
router.get('/fetchbookings', (req,res)=>{
  Bookings.find({}).then(function(data){
        res.send(data);
  })
});

router.use('/removedate', (req,res)=>{
  User.findOneAndUpdate(
    { username: req.body.username}, 
    { $pull: { available_date: {_id:ObjectId(req.body.id)}}},
   function (error, success) {
         if (error) {
             res.status(500).send();
         } else {
          res.status(200).send()
        }
     });
  })

//Send current rates for cleaner panel
router.get('/getrates', (req,res)=>{
  Estimates.findOne({type:'regular'}).then((data)=>{
    res.status(200).send(
      data
    )
  })
});

//Change estimates for certain address
router.use('/estimates',(req,res)=>{
  console.log(req.body);
  Estimates.find({address:req.body.address},(err,data)=>{
    if(data.length<1 || err){
      var new_estimates = new Estimates({
        type: 'Cleaner Edited',
        room: req.body.room_price,
        bathroom: req.body.bathroom_price,
        address: req.body.address
      });
      new_estimates.save(function (err) {
        if (err) {
          res.status(500).send();
        }
        else{
          res.status(200).send();
        }
      });
    }
    else{
      console.log(data);
      Estimates.findOneAndUpdate({address:req.body.address},{room:req.body.room_price, bathroom:req.body.bathroom_price})
      .then(()=>{
        res.status(200).send();
      })
    }
  })
})

//Allows cleaner to accept a booking 
router.post('/acceptbooking', (req,res)=>{
  console.log(req.body);
  Bookings.findById(req.body.id).then((data)=>{
      if(data.cleaner_appointed == '/'){
        Bookings.findByIdAndUpdate(req.body.id, {cleaner_appointed:req.body.username, status:'Confirmed'}).then((data)=>{
          var mailOptions = {
            to: 'subcleaner2019@gmail.com',
            subject: 'A Cleaner Accepted a Booking',
            text: `Cleaners Username: ${req.body.username},\n Booking Address: ${data.address} \n Check Admin Panel for full information.`
          };
          transporter.sendMail(mailOptions);
          var mailOptions = {
            to: `${data.email}`,
            subject: 'Status Changed',
            text: `Your Booking status has changed to "Confirmed". Check more info in your Bookings Panel.
            Thank you for using our services.`
          };
          transporter.sendMail(mailOptions);
          res.status(200).send();
        })
      }
      else{
        res.status(500).send();
      }
  })
})

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

//Fetch cleaner available time from database and send it as response
router.use('/getcleanercalendar', (req,res)=>{
  User.find({ username: req.body.user}).then(function(data){
    let array = [];
    for(var i=0;i<data[0].available_date.length;i++){
      array.push(data[0].available_date[i]);
    }
    let array_sort = [];
    let length = array.length;
      for(var i=0;i<length;i++){
        if(isLetter(array[i].date.substring(0,1))){
          array_sort.push(array[i]);
        }
      }
      let new_array = [];
      for(var i=0;i<array.length;i++){
        if(!isLetter(array[i].date.substring(0,1))){
          new_array.push(array[i]);
        }
      }
      array = new_array;
      for(var i=0;i<array.length;i++){
        for(var j=i;j<array.length;j++){
          if(array[i].date>array[j].date){
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        }
      }
      for(var i=0;i<array_sort.length;i++){
        array.unshift(array_sort[i]);
      }
    res.status(200).send(array);
  })
})

//Addind non-repeating schedule to users calendar
router.post('/addschedule', (req,res)=>{
  var calendar_date = {
    date : req.body.date,
    from: req.body.from,
    to: req.body.to
  }
  User.findOneAndUpdate(
    { username: req.body.user }, 
    { $push: { available_date: calendar_date  } },
   function (error, success) {
         if (error) {
             res.status(500).send();
         } else {
             res.status(200).send();
         }
     });
})

//Endpoint for fetching user data in cleaner panel
router.use('/fetchusers', (req,res)=>{
  User.find({ type: 'user'}).then(function(data){
    res.send(data);
  })
});

//Send as response all bookings of a certain user
router.use('/fetchbookings', (req,res)=>{
  Bookings.find({cleaner_appointed:req.body.user}).then(function(data){
        res.send(data);
  })
})

//Send newly arrived bookings to cleaners panels
router.use('/newbookings', (req,res)=>{
  Bookings.find({status:"Pending"}).then(function(data){
    res.send(data);
})
})

//Check if token exists to allow entrance, else redirect to login page same as admin panel
router.use('/panel',(req,res)=>{
    var token = req.query.token;
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.sendFile(path.join(__dirname , '../views/cleaner_login.html'));
      } else {
        User.findOne({
          _id: decoded.id
        }).then(function (user) {
            res.sendFile(path.join(__dirname , '../views/cleaner.html'));
        })
      }
    });
  } else {
    res.sendFile(path.join(__dirname , '../views/cleaner_login.html'));
  }
})


//Handles cleaner password change
router.use("/changepassword", (req, res) =>{
  var new_password = req.body.new_password;
  User.findOne({
    username: req.body.username,
  },
  function (err, user) {
    if (err) return res.status((500).send("Error on the server."));
    if (!user) return res.status(500).send("No user found.");

    var pass_match;
    bcrypt.compare(req.body.old_password, user.password, function (
      err,
      match
    ) {
      if (match) {
        pass_match = true;
      } else {
        pass_match = false;
      }
      if (!pass_match) {
        res.status(500);
        res.send();
      } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) console.log(err);
          bcrypt.hash(new_password, salt, function (err, hash) {
              if (err){res.status(500);
                res.send();}
              new_password = hash;
              User.findOneAndUpdate({username:req.body.username},{password : new_password}).then(()=>{
                res.status(200).send();
              })
          });
      });
      }
    });
  }
);
});

//Login API, checks for username existance and hashed password comparison using bcrypt
router.use("/login", function (req, res) {
    User.findOne({
        username: req.body.username
      },
      function (err, user) {
        if (err) return res.status((500).send("Error on the server."));
        if (!user) return res.status(404).send("No user found.");
  
        var pass_match;
        bcrypt.compare(req.body.password, user.password, function (
          err,
          match
        ) {
          if (match) {
            pass_match = true;
          } else {
            pass_match = false;
          }
          if (!pass_match) {
            res.status(404);
            res.send({
              auth: false,
              token: null
            });
          } else {
            var token = jwt.sign({
                id: user._id
              },
              "secret", {
                expiresIn: 864000 //Token expires in one day
              }
            );
              res.send({
                auth: true,
                token: token
              });
          }
        });
      }
    );
  });

//Login page root check if token exists and try to login automatically else ask for user and password, tokens expire every 24 hours.
router.use("/", (req,res)=>{
    var token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.sendFile(path.join(__dirname , '../views/cleaner_login.html'));
      } else {
        User.findOne({
          _id: decoded.id
        }).then(function (user) {
            res.status(200).send();
        })
      }
    });
  } else {
    res.sendFile(path.join(__dirname , '../views/cleaner_login.html'));
  }
});


module.exports = router;