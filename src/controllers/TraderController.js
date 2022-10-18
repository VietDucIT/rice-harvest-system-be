const Trader = require("../models/Trader");

class TraderController {
  // ALL CONTROLLERS OF USER ???

  // [GET] /trader/list-by-name
  showByName(req, res) {
    // console.log("Request: ", req.params);
    Trader.find({
      $or: [
        { name: { $regex: req.params.name } },
        { nickname: { $regex: req.params.name } },
      ],
    })
      .then((traders) => {
        res.json(traders).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /trader/list-by-address
  // village, commune, town, province
  // showByAddress(req, res) {
  //   // console.log("Request: ", req.params);
  //   Trader.find({ address: req.params.address })
  //     .then((traders) => {
  //       res.json(traders).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }
}

module.exports = new TraderController();
