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
    const suggestData = Object.assign(req.body);
    // console.log("Request Add Suggest To Buy: ", suggestData);
    let suggestToBuy = new SuggestToBuy({
      ...suggestData,
      traderId: new ObjectId(suggestData.traderId), // OR idTrader
    });
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

  // [PUT] /suggest-to-buy/:id
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

  // [DELETE] /suggest-to-buy/:id
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request Delete Suggest To Buy: ", req.params);
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
    // console.log("Get Suggest To Buy List by Trader: ", req.params);
    SuggestToBuy.find({ traderId: new ObjectId(req.params.idTrader) })
      .then((suggestToBuys) => {
        res.json(suggestToBuys).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /suggest-to-buy/:idRiceSeason/list-for-rice-season
  showListForRiceSeason(req, res) {
    // console.log("Get Suggest To Buy List by Rice Season: ", req.params);
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
