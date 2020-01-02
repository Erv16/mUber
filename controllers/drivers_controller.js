const Driver = require('../models/Driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // handler to find a list of drivers around the users location

  // @spherical - assume it is a spherical object being queried
  // calculate distance along the circumference
  // @maxDistance- find drivers within a particular distance
  // 200000 = 200 kms
  // parseFloat is required as the query parameters by default are string

  index(req, res, next) {
    // As GET does not have a body hence making use of query
    const { lng, lat } = req.query;
    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };

    Driver.aggregate([
      {
        $geoNear: {
          near: point,
          spherical: true,
          maxDistance: 200000,
          distanceField: 'dist.calculated'
        }
      }
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    // driverProps - contains the properties requird to create a driver
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  // handler to update an existing driver
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  // handler to delete an existing driver
  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
