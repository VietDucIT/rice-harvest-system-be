const Trader = require("../models/Trader");
const User = require("../models/User");

const normalizeVietnamese = require("../services/normalizeVietnamese");

class TraderController {
  // [GET] /trader/list-by-name
  showByName(req, res) {
    // console.log("Get Trader List by Name: ", req.params);
    let searchedName = req.query.name;
    searchedName = searchedName.trim().replace(/\s+/g, " "); // remove abandoned whitespaces
    let normalizedSearchedName = normalizeVietnamese(searchedName);
    // console.log(searchedName, normalizedSearchedName);

    User.find({
      $or: [
        { normalizedName: { $regex: new RegExp(normalizedSearchedName, "i") } },
        {
          normalizedNickname: {
            $regex: new RegExp(normalizedSearchedName, "i"),
          },
        },
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
  //   // console.log("Get Trader List by Address: ", req.params);
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
