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

  // [GET] /trader/find-by-address
  findByAddress(req, res) {
    const address = req.query;
    // console.log("Find Trader by Address: ", address);
    let filterObject = { province: address.province, role: 0 };
    if (address.town) filterObject.town = address.town;
    if (address.commune) filterObject.commune = address.commune;
    if (address.village) filterObject.village = address.village;
    // console.log("Finding Condition: ", filterObject);

    User.find(filterObject)
      .then((traders) => {
        // console.log(traders);
        res.json(traders).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new TraderController();
