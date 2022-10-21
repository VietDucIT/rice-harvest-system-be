const { ObjectId } = require("mongodb");

const RicePrice = require("../models/RicePrice");

class RiceController {
  // [GET] /rice/list
  showList(req, res) {
    RicePrice.find({ isDeleted: false })
      .then((item) => {
        res.json(item).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceController();
