var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("../models/user");
var bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var path = require('path');
var Estimates = require('../models/estimates');
var Bookings = require('../models/bookings');
const SALT_WORK_FACTOR = 10;
const nodemailer = require("nodemailer");

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


//Returning bookings for the admin panel
router.get('/fetchbookings', (req,res)=>{
  Bookings.find({archived:false}).then(function(data){
        res.send(data);
  })
})

//Send current rates for admin panel
router.get('/getrates', (req,res)=>{
  Estimates.findOne({type:'regular'}).then((data)=>{
    res.status(200).send(
      data
    )
  })
});

//Changing currect rates from admin panel for room
router.post('/roomrate', (req,res)=>{
  Estimates.findOneAndUpdate({type:'regular'},{room : req.body.room}).then(()=>{
    res.status(200).send();
  })
})

//Changind STATUS of booking from admin panel
router.post('/changestatus', (req,res)=>{
  Bookings.findByIdAndUpdate(req.body.id, {status:req.body.status}).then((data)=>{
    var mailOptions = {
      to: 'subcleaner2019@gmail.com',
      subject: 'Booking Status Changed',
      text: `Booking Address:${data.address},
      Status changed to: ${req.body.status},
      Check Admin Panel for more informations.`
    };
    transporter.sendMail(mailOptions);
    var mailOptions = {
      to: `${data.email}`,
      subject: 'Status Changed',
      text: `Your Booking status has changed to ${req.body.status}. Check more info in your Bookings Panel.
      Thank you for using our services.`
    };
    transporter.sendMail(mailOptions);
    res.status(200).send();
  })
})

//Archive a booking only for the admins
router.post('/archive', (req,res)=>{
  Bookings.findByIdAndUpdate(req.body.id, {archived:true}).then(()=>{
    res.status(200).send();
  })
})

//Changing currect rates from admin panel for bathroom
router.post('/bathroomrate', (req,res)=>{
  Estimates.findOneAndUpdate({type:'regular'},{bathroom : req.body.bathroom}).then(()=>{
    res.status(200).send();
  })
});

//Endpoint for suspending users in admin panel
router.use('/suspend', (req, res)=>{
  User.findOneAndDelete({username : req.body.username}).then(()=>{
    res.status(200).send();
  })
})
//Endpoint for fetching users in admin panel, just returns array of all users
router.get('/fetchusers', (req,res)=>{
  User.find({ type: 'user'}).then(function(data){
    res.send(data);
  })
});


//Check if token exists to allow entrance, else redirect to login page, in case admin logged in in last 24h
router.use('/panel',(req,res)=>{
    var token = req.query.token;
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.sendFile(path.join(__dirname , '../views/login.html'));
      } else {
        User.findOne({
          _id: decoded.id
        }).then(function (user) {
            res.sendFile(path.join(__dirname , '../views/admin.html'));
        })
      }
    });
  } else {
    res.sendFile(path.join(__dirname , '../views/login.html'));
  }
})


//Check in Mongo if user already exists
router.use("/check", (req, res) =>{
  User.findOne({
    email: req.body.email
  },
  function (err, user) {
    if (user) {
      res.status(500).send();
    } else {
      res.status(200).send();
      User.findOne({
       username: req.body.username
      },
      function (err, user) {
        if (user) {
          res.status(500).send();
        } else {
          res.status(200).send();
        }
      }
    );
    }
  }
);
});


//Handles admin password change request
router.use("/changepassword", (req, res) =>{
  var new_password = req.body.new_password;
  User.findOne({
    type: 'admin',
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
              User.findOneAndUpdate({type:'admin'},{password : new_password}).then(()=>{
                res.status(200).send();
              })
          });
      });
      }
    });
  }
);
});

//Handle register requests for new Cleaner account
router.use("/register", (req, res) =>{
  console.log("-===================", req.body);
  var new_user = new User({
    type: "user",
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    available_date: []
  });
  new_user.save(function (err) {
    if (err) {
      res.status(500).send();
      return false;
    }
    res.status(200).send();
  });
})

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
        res.sendFile(path.join(__dirname , '../views/login.html'));
      } else {
        User.findOne({
          _id: decoded.id
        }).then(function (user) {
            res.status(200).send();
        })
      }
    });
  } else {
    res.sendFile(path.join(__dirname , '../views/login.html'));
  }
});


module.exports = router;