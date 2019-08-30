var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Connecting mongodb
mongoose.connect(
    'mongodb+srv://admin:SubCleaner2019@cluster-e4rao.mongodb.net/test?retryWrites=true',{dbName:'cleaning-site'}
);

//Type is 'regular' for admin set rate, and 'Cleaner Edited' for cleaner set rates
var EstimatesSchema = new mongoose.Schema({
    type: String,
    room: Number,
    bathroom: Number,
    address: String
});

var Estimates = mongoose.model('estimates', EstimatesSchema);

module.exports = Estimates;