const { ObjectId } = require("mongodb");

const RiceSeason = require("../models/RiceSeason");

class RiceSeasonController {
  // [GET] /rice-season/find-by-name
  findByName(req, res) {
    console.log("Find Rice Season by Name: ", req.query);

    RiceSeason.find({
      farmerId: new ObjectId(req.query.idFarmer),
    })
      .then((riceSeasons) => {
        if (req.query.name == "Tất cả" && req.query.year == "Tất cả")
          res.json(riceSeasons).end();
        else {
          let response = [];
          for (let season of riceSeasons) {
            const condition =
              (req.query.name == "Tất cả" &&
                season.seasonYear == req.query.year) ||
              (req.query.year == "Tất cả" &&
                season.seasonName == req.query.name) ||
              (season.seasonName == req.query.name &&
                season.seasonYear == req.query.year);
            if (condition) {
              response.push(season);
            }
          }
          res.json(response).end();
        }
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/farmer/:idFarmer
  showList(req, res) {
    // console.log("Get Rice Season List: ", req.params);
    RiceSeason.find({ farmerId: new ObjectId(req.params.idFarmer) })
      .then((riceSeasons) => {
        // console.log("Rice Season List: ", riceSeasons);
        res.json(riceSeasons).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/:id
  showOne(req, res) {
    RiceSeason.findById(req.params.id)
      .then((riceSeason) => {
        res.json(riceSeason).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-season/current-status/:idRiceField
  getCurrentStatus(req, res) {
    RiceSeason.find({ riceFieldId: req.params.idRiceField })
      .then(async (riceSeasons) => {
        let sortedArray = riceSeasons.sort((a, b) => b.createdAt - a.createdAt);
        // console.log("Rice Season Array sorted: \n", sortedArray);
        res.json(sortedArray[0].currentState).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /rice-season/
  add(req, res) {
    const riceSeasonData = Object.assign(req.body);
    // console.log("Request Add Rice Season: ", riceSeasonData);
    let riceSeason = new RiceSeason({
      ...riceSeasonData,
      riceFieldId: new ObjectId(riceSeasonData.riceFieldId),
      farmerId: new ObjectId(riceSeasonData.farmerId),
    });

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
    let riceSeason = Object.assign(req.body);
    RiceSeason.updateOne(
      { _id: req.params.id },
      { ...riceSeason, riceFieldId: new ObjectId(riceSeason.riceFieldId) }
    )
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
