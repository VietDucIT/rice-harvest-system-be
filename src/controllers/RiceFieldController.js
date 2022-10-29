const { ObjectId } = require("mongodb");

const RiceField = require("../models/RiceField");

class RiceFieldController {
  // [GET] /rice-field/:id
  show(req, res) {
    RiceField.findById(req.params.id)
      .then((riceField) => {
        res.json(riceField).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /rice-field/
  add(req, res) {
    // res.json(req.body);
    const riceField = new RiceField(req.body);
    // riceField._id = new ObjectId().toString();
    // console.log("Rice Field: ", riceField);

    riceField
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /rice-field/:id
  modify(req, res) {
    // res.json(req.body);
    RiceField.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /rice-field/:id
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    RiceField.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-field/:idFarmer/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    RiceField.find({ farmerId: req.params.idFarmer })
      .then((riceFields) => {
        res.json(riceFields).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceFieldController();
