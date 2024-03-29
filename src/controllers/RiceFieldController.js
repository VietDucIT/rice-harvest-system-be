const { ObjectId } = require("mongodb");

const RiceField = require("../models/RiceField");
const RiceSeason = require("../models/RiceSeason");

const normalizeVietnamese = require("../services/normalizeVietnamese");

const getCurrentStatus = async (idRiceField) => {
  const riceSeasons = await RiceSeason.find({ riceFieldId: idRiceField });
  riceSeasons.sort((a, b) => b.createdAt - a.createdAt);
  if (riceSeasons.length > 0) {
    // console.log(riceSeasons[0]?.currentState);
    return riceSeasons[0]?.currentState;
  }
};

class RiceFieldController {
  // [GET] /rice-field/find-by-name
  findByName(req, res) {
    // console.log("Find Rice Field by Name: ", req.query);
    let searchedName = req.query.name;
    searchedName = searchedName.trim().replace(/\s+/g, " "); // remove abandoned whitespaces
    let normalizedSearchedName = normalizeVietnamese(searchedName);
    // console.log(searchedName, normalizedSearchedName);

    RiceField.find({
      farmerId: new ObjectId(req.query.idFarmer),
      normalizedName: { $regex: new RegExp(normalizedSearchedName, "i") },
    })
      .then((riceFields) => {
        console.log("From finding Rice Field by Name: ", riceFields);
        res.json(riceFields).end();
      })
      .catch((err) => {
        console.log("Can't find Rice Field by Name: ", err);
        res.status(500).end();
      });
  }

  // [GET] /rice-field/farmer/:idFarmer
  showList(req, res) {
    // console.log("Get Rice Field List by Farmer: ", req.params);
    RiceField.find({ farmerId: new ObjectId(req.params.idFarmer) })
      .then((riceFields) => {
        // console.log(riceFields);
        res.json(riceFields).end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
  }

  // [GET] /rice-field/:id
  showOne(req, res) {
    RiceField.findById(req.params.id)
      .then((riceField) => {
        res.json(riceField).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-field/
  showAll(req, res) {
    // console.log("Get all Rice Field: ", req.params);
    RiceField.find()
      .then(async (riceFields) => {
        // console.log("Show all Rice Fileds: ", riceFields);
        let riceFieldList = [];
        for (let field of riceFields) {
          let currentStatus = await getCurrentStatus(field._doc._id);
          riceFieldList.push({ ...field._doc, currentStatus: currentStatus });
        }
        // console.log("Show all Rice Fileds: ", riceFieldList);
        res.json(riceFieldList).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /rice-field/
  add(req, res) {
    const fieldData = Object.assign(req.body);
    // console.log("Request Add Rice Field: ", fieldData);
    let riceField = new RiceField({
      ...fieldData,
      farmerId: new ObjectId(fieldData.farmerId),
    });
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
    // console.log("Request Delete Rice Field: ", req.params);
    RiceField.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new RiceFieldController();
