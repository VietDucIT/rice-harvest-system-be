const { ObjectId } = require("mongodb");

const RiceSeason = require("../models/RiceSeason");

class RiceSeasonController {
  // [GET] /rice-season/find-by-name
  findByName(req, res) {
    console.log("Find Rice Season by Name: ", req.query);
    // const name = req.query.name.trim().toLowerCase();
    // RiceSeason.find({
    //   farmerId: new ObjectId(req.query.idFarmer),
    // })
    //   .then((riceSeasons) => {
    //     let response = [];
    //     for (let season of riceSeasons) {
    //       let fullName = season.name + " " + season.year;
    //       fullName = fullName.toLowerCase();
    //       if (name.includes(fullName)) {
    //         response.push(season);
    //       }
    //     }
    //     res.json(response).end();
    //   })
    //   .catch((err) => {
    //     res.status(500).end();
    //     console.log(err);
    //   });
    RiceSeason.find({
      farmerId: new ObjectId(req.query.idFarmer),
      seasonName: req.query.name,
      seasonYear: req.query.year,
    })
      .then((riceSeasons) => {
        res.json(riceSeasons).end();
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

  // [POST] /rice-season/
  add(req, res) {
    // res.json(req.body);
    // JUST A TEMPORARY SOLUTION, WILL REMOVE IF FINDING A BETTER ONE
    const riceSeasonData = Object.assign(req.body);
    console.log("Request Add Rice Season: ", riceSeasonData);
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
