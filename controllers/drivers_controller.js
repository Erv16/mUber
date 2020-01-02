module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res) {
    console.log(req.body);
    res.send({ hi: 'there' });
    //   const driverProps = req.body; // represents the properties to be used for creating a new driver

    //   Driver.create(driverProps)
    //     .then(driver => res.send(driver));
  }
};
