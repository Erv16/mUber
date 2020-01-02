const assert = require('assert');
const request = require('supertest'); // named as request because of convention
const app = require('../app');

describe('The express app', () => {
  it('Handles a GET request to /api', done => {
    // done is required as the requests will be asynchronous in nature
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});
