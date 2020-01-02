const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// index is a property that tells mongodb that it is a
// special property or index that it can use for GeoJSON
// type queries
const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

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
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
