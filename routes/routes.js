const DriversController = require('../controllers/drivers_controller');

module.exports = app => {
  //any incoming req, assume it is json and parse it into an object

  //Watch for incoming requests of method GET
  // to the route http://localhost:3050/api

  app.get('/api', DriversController.greeting);
  // Route for creating a driver
  app.post('/api/drivers', DriversController.create);

  // Route for updating an existing driver
  app.put('/api/drivers/:id', DriversController.edit);

  // Route for deleting an existing driver
  app.delete('/api/drivers/:id', DriversController.delete);

  //
  app.get('/api/drivers', DriversController.index);
};
