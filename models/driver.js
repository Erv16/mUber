const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    // If the driving flag is not provided
    // when created it will start off as false
    // by default
    default: false
  }
});

const Driver = mongoose.model('driver', DriverSchema);
module.exports = Driver;
