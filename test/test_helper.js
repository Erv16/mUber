const mongoose = require('mongoose');

// Created a seperate database for the test environment
before(done => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

// The catch() also has a done method as the first time
// the database runs, there is nothing in it and it will
// result into an error, hence to avoid this
// @ensureIndex makes sure that before any of the tests are run
// the geometry.coordinates property is set and available on the
// drivers collection
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
