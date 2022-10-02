const Farmer = require("../models/Farmer");

class FarmerController {
  // [GET] /farmer/list-by-name
  showByName(req, res) {
    // console.log("Request: ", req.params);
    Farmer.find({ name: req.params.name })
      .then((farmers) => {
        res.json(farmers).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /farmer/list-by-address
  showByAddress(req, res) {
    // console.log("Request: ", req.params);
    Farmer.find({ address: req.params.address })
      .then((farmers) => {
        res.json(farmers).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new FarmerController();
