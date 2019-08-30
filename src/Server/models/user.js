var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Connecting mongodb
mongoose.connect(
    'mongodb+srv://admin:SubCleaner2019@cluster-e4rao.mongodb.net/test?retryWrites=true',{dbName:'cleaning-site'}
);

var UserSchema = new mongoose.Schema({
    //Account type is either admin or user for cleaners
    type : String,
    first_name : String,
    last_name: String,
    username : String,
    password : String,
    email : String,
    available_date: [{
        date:{type: String},
        from:{type: String},
        to:{type: String}
    }]
});

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('users', UserSchema);

module.exports = User;