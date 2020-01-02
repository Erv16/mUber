const app = require('./app');

app.listen(3050, () => {
  //listen for incoming http requests on port 3050
  console.log('Listen on port 3050');
});
