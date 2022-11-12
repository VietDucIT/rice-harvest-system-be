const { ObjectId } = require("mongodb");

const RiceBuyingArea = require("../models/RiceBuyingArea");

class RiceBuyingAreaController {
  // [GET] /rice-buying-area/find-by-name
  findByName(req, res) {
    console.log("Find Rice Buying Area by Name: ", req.query);
    RiceBuyingArea.find({
      traderId: new ObjectId(req.query.idTrader),
      name: new RegExp(req.query.name),
    })
      .then((riceBuyingAreas) => {
        console.log("From find Rice Buying Area by Name: ", riceBuyingAreas);
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
    // res.json(req.body);
    const areaData = Object.assign(req.body);
    // console.log("Request add Rice Buying Area: ", areaData);
    let riceBuyingArea = new RiceBuyingArea({
      ...areaData,
      traderId: new ObjectId(areaData.userId), // OR ???
    });
    // const riceBuyingArea = new RiceBuyingArea(req.body);
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
    // res.json(req.body);
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
    // res.json(req.body);
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
