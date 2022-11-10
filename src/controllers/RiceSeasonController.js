const { ObjectId } = require("mongodb");

const RiceSeason = require("../models/RiceSeason");

class RiceSeasonController {
  // [GET] /rice-season/farmer/:idFarmer
  showList(req, res) {
    // console.log("Get Rice Season List: ", req.params);
    RiceSeason.find({ farmerId: new ObjectId(req.params.idFarmer) })
      .then((riceSeasons) => {
        res.json(riceSeasons).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/find/:idFarmer
  showListByName(req, res) {
    // console.log("Get Rice Season List by Name: ", req.params);
    RiceSeason.find({
      farmerId: new ObjectId(req.params.idFarmer),
      name: req.params.name, // ????
    })
      .then((riceSeasons) => {
        res.json(riceSeasons).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/:id
  show(req, res) {
    RiceSeason.findById(req.params.id)
      .then((riceSeason) => {
        res.json(riceSeason).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /rice-season/
  add(req, res) {
    // res.json(req.body);
    // JUST A TEMPORARY SOLUTION, WILL REMOVE IF FINDING A BETTER ONE
    const riceSeasonData = Object.assign(req.body);
    // console.log("Request Add Rice Season: ", riceSeasonData);
    let riceSeason = new RiceSeason({
      ...riceSeasonData,
      farmerId: new ObjectId(riceSeasonData.farmerId),
    });
    // RIGHT SOLUTION, BUT DIFFICULT TO GET DATA FROM OTHER COLLECTIONS
    // const riceSeason = new RiceSeason(req.body);
    console.log("Rice Season: ", riceSeason);

    riceSeason
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /rice-season/:id
  modify(req, res) {
    // res.json(req.body);
    RiceSeason.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /rice-season/:id
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request Delete Rice Season: ", req.params);
    RiceSeason.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceSeasonController();
