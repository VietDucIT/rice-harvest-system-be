const Farmer = require("../models/Farmer");
const User = require("../models/User");

class FarmerController {
  // ALL CONTROLLERS OF USER ???

  // [GET] /farmer/list-by-name
  showByName(req, res) {
    // console.log("Get Farmer List by Name: ", req.params);
    User.find({
      $or: [
        { name: { $regex: req.params.name } },
        { nickname: { $regex: req.params.name } },
      ],
      role: 0,
    })
      .then((farmers) => {
        res.json(farmers).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /farmer/list-by-address
  // village, commune, town, province
  // showByAddress(req, res) {
  //   // console.log("Get Farmer List by Address: ", req.params);
  //   Farmer.find({ address: req.params.address })
  //     .then((farmers) => {
  //       res.json(farmers).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }
}

module.exports = new FarmerController();
