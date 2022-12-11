const { ObjectId } = require("mongodb");

const RiceBuyingArea = require("../models/RiceBuyingArea");

const normalizeVietnamese = require("../services/normalizeVietnamese");

class RiceBuyingAreaController {
  // [GET] /rice-buying-area/find-by-name
  findByName(req, res) {
    // console.log("Find Rice Buying Area by Name: ", req.query);
    let searchedName = req.query.name;
    searchedName = searchedName.trim().replace(/\s+/g, " "); // remove abandoned whitespaces
    let normalizedSearchedName = normalizeVietnamese(searchedName);
    // console.log(searchedName, normalizedSearchedName);

    RiceBuyingArea.find({
      traderId: new ObjectId(req.query.idTrader),
      normalizedName: { $regex: new RegExp(normalizedSearchedName, "i") },
    })
      .then((riceBuyingAreas) => {
        // console.log("From finding Rice Buying Area by Name: ", riceBuyingAreas);
        res.json(riceBuyingAreas).end();
      })
      .catch((err) => {
        console.log("Can't find Rice Buying Area by Name: ", err);
        res.status(500).end();
      });
  }

  // [GET] /rice-buying-area/trader/:idTrader
  showList(req, res) {
    // console.log("Get Rice Buying Area List: ", req.params);
    RiceBuyingArea.find({ traderId: new ObjectId(req.params.idTrader) })
      .then((riceBuyingAreas) => {
        // console.log(riceBuyingAreas);
        res.json(riceBuyingAreas).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-buying-area/:id
  showOne(req, res) {
    RiceBuyingArea.findById(req.params.id)
      .then((riceBuyingArea) => {
        res.json(riceBuyingArea).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /rice-buying-area/
  add(req, res) {
    const areaData = Object.assign(req.body);
    // console.log("Request add Rice Buying Area: ", areaData);
    let riceBuyingArea = new RiceBuyingArea({
      ...areaData,
      traderId: new ObjectId(areaData.traderId),
      normalizedName: normalizeVietnamese(areaData.name),
    });
    // console.log("Rice Buying Area: ", riceBuyingArea);

    riceBuyingArea
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /rice-buying-area/:id
  modify(req, res) {
    RiceBuyingArea.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /rice-buying-area/:id
  delete(req, res) {
    // console.log("Request Delete Rice Buying Area: ", req.params);
    RiceBuyingArea.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceBuyingAreaController();
