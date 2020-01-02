const mongoose = require('mongoose');

// Created a seperate database for the test environment
before(done => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useNewUrlParser: true
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => done())
    .catch(() => done());
});
