const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
//object that will take incoming http request and depending
//on information or routing it is going run a certain amount of code

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://loclahost/muber');

const app = express();

// To wire up the middleware to the express application
// json() - assume it is json and parse it into an object
// Should be placed above the routes call
app.use(bodyParser.json());
routes(app);

module.exports = app;
