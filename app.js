const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//object that will take incoming http request and depending
//on information or routing it is going run a certain amount of code

const app = express();

// Fix deprecation warning
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber', {
    useNewUrlParser: true
  });
}

// To wire up the middleware to the express application
// json() - assume it is json and parse it into an object
// Should be placed above the routes call
app.use(bodyParser.json());
// Setup all the routes of the application
routes(app);

// Error handler middleware
// @err - will be populated if the prev middleware threw an error
// @req - incoming req obj
// @res - outgoing res obj
// @next - function to execute the next middleware in the chain
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
