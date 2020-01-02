const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

// .send() - send along the information to the server
describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {
        done();
      });
  });
});
