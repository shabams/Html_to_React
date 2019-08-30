var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Connecting mongodb
mongoose.connect(
    'mongodb+srv://admin:SubCleaner2019@cluster-e4rao.mongodb.net/test?retryWrites=true',{dbName:'cleaning-site'}
);

var BookingsSchema = new mongoose.Schema({
    address: String,
    city:String,
    state:String,
    rooms: Number,
    bathrooms: Number,
    email: String,
    phone_no: String,
    name: String,
    date: String,
    time: Array,
    status: String,
    price: Number,
    archived: Boolean,
    date_booked: String,
    cleaner_appointed: String
});

var Bookings = mongoose.model('bookings', BookingsSchema);

module.exports = Bookings;