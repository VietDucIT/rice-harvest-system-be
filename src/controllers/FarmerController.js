const Farmer = require("../models/Farmer");
const User = require("../models/User");

const normalizeVietnamese = require("../services/normalizeVietnamese");

class FarmerController {
  // [GET] /farmer/find-by-name
  findByName(req, res) {
    // console.log("Find Farmer by Name: ", req.query);
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
      role: 0,
    })
      .then((farmers) => {
        // console.log(farmers);
        res.json(farmers).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /farmer/find-by-address
  findByAddress(req, res) {
    const address = req.query;
    // console.log("Find Farmer by Address: ", address);
    let filterObject = { province: address.province, role: 0 };
    if (address.town) filterObject.town = address.town;
    if (address.commune) filterObject.commune = address.commune;
    if (address.village) filterObject.village = address.village;
    // console.log("Finding Condition: ", filterObject);

    User.find(filterObject)
      .then((farmers) => {
        // console.log(farmers);
        res.json(farmers).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new FarmerController();
