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

  // test for updating an existing driver

  // end - sends the req off stating no further customization left
  // to do
  it('Put to /api/drivers/id edits an existing driver', done => {
    const driver = new Driver({ email: 'updatetest@test.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'updatetest@test.com' }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  // test for deleting an existing driver
  it('DELETE to /api/drivers/id can delete a driver', done => {
    const driver = new Driver({ email: 'driver@drive.com' });

    // First check to see if the driver is present in the collection
    // If so then verify if the driver is removed/deleted
    driver.save().then(() => {
      Driver.findById(driver._id).then(driver => {
        assert(driver.email === 'driver@drive.com');
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findById(driver._id).then(driver => {
              assert(driver === null);
              done();
            });
          });
      });
    });
  });

  it('GET to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?&lng=-80&lat=25')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].email === 'miami@test.com');
          done();
        });
    });
  });
});
