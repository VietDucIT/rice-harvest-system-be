const { ObjectId } = require("mongodb");

const SuggestToBuy = require("../models/SuggestToBuy");

class SuggestToBuyController {
  // [GET] /suggest-to-buy/:id
  show(req, res) {
    SuggestToBuy.findById(req.params.id)
      .then((suggestToBuy) => {
        res.json(suggestToBuy).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /suggest-to-buy/
  add(req, res) {
    // res.json(req.body);
    const suggestToBuy = new SuggestToBuy(req.body);
    // suggestToBuy._id = new ObjectId().toString();
    // console.log("Suggest To Buy: ", suggestToBuy);

    suggestToBuy
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /suggest-to-buy/:id/modify
  modify(req, res) {
    // res.json(req.body);
    SuggestToBuy.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /suggest-to-buy/:id/delete
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    SuggestToBuy.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /suggest-to-buy/:idTrader/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    SuggestToBuy.find({ idTrader: req.params.idTrader })
      .then((suggestToBuys) => {
        res.json(suggestToBuys).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /suggest-to-buy//:idRiceSeason/list-for-rice-season
  showListForRiceSeason(req, res) {
    // console.log("Request: ", req.params);
    SuggestToBuy.find({ riceSeasonId: req.params.idRiceSeason })
      .then((suggestToBuys) => {
        res.json(suggestToBuys).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new SuggestToBuyController();
