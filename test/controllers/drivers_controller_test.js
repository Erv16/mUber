const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
// Getting direct access to the model via mongoose
const Driver = mongoose.model('driver');

// .send() - send along the information to the server
describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    // Checks to see the initial count before the request is sent
    Driver.countDocuments().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          // Checks the count after the request is made
          // If the user is created successfully, the new
          // count will be one more than the original count
          // Had to increase the mocha timeout to 10000ms
          // to avoid the test from failing for the default
          // 2000ms timeout
          Driver.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
