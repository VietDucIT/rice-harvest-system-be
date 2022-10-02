const { ObjectId } = require("mongodb");

const RiceSeason = require("../models/RiceSeason");

class RiceSeasonController {
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
    const riceSeason = new RiceSeason(req.body);
    riceSeason._id = new ObjectId().toString();
    // console.log("Rice Season: ", riceSeason);

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

  // [POST] /rice-season/:id/modify
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

  // [POST] /rice-season/:id/delete
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    RiceSeason.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/:idFarmer/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    RiceSeason.find({ idFarmer: req.params.idFarmer }) // idFarmer of idRiceField
      .then((riceSeasons) => {
        res.json(riceSeasons).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceSeasonController();
