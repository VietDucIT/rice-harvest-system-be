const { ObjectId } = require("mongodb");

const Bill = require("../models/Bill");

class BillController {
  // [GET] /bill/user/:idUser
  showList(req, res) {
    // console.log("Get Bill List for User: ", req.params);
    Bill.find({ idUser: req.params.idUser })
      .then((bills) => {
        res.json(bills).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /bill/farmer/:idFarmer
  showListForFarmer(req, res) {
    // console.log("Get Bill List for Farmer: ", req.params);
    Bill.find({ idFarmer: req.params.idFarmer })
      .then((bills) => {
        res.json(bills).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /bill/trader/:idTrader
  showListForTrader(req, res) {
    // console.log("Get Bill List for Trader: ", req.params);
    Bill.find({ idTrader: req.params.idTrader })
      .then((bills) => {
        res.json(bills).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /bill/rice-season/:idRiceSeason
  showListForRiceSeason(req, res) {
    // console.log("Get Bill List for Rice Season: ", req.params);
    Bill.find({ idRiceSeason: req.params.idRiceSeason })
      .then((bills) => {
        res.json(bills).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /bill/:id
  show(req, res) {
    Bill.findById(req.params.id)
      .then((bill) => {
        res.json(bill).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /bill/
  add(req, res) {
    const billData = Object.assign(req.body);
    let bill = new Bill({
      ...billData,
      suggestToBuyId: new ObjectId(billData.suggestToBuyId),
    });

    bill
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /bill/:id
  modify(req, res) {
    Bill.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new BillController();
