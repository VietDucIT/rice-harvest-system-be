const Farmer = require("../models/Farmer");
const User = require("../models/User");

class FarmerController {
  // INHERITED ALL CONTROLLERS OF USER ???

  // [GET] /farmer/find-by-name
  findByName(req, res) {
    // console.log("Find Farmer by Name: ", req.query);
    User.find({
      $or: [
        { name: { $regex: req.query.name } },
        { nickname: { $regex: req.query.name } },
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

  // [GET] /farmer/find-by-address
  findByAddress(req, res) {
    // console.log("Find Farmer by Address: ", req.query);
    const address = req.query.address;
    let filterObject = { province: address.province, role: 0 };
    if (address.town) filterObject.town = address.town;
    if (address.commune) filterObject.commune = address.commune;
    if (address.village) filterObject.village = address.village;
    User.find(filterObject)
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
