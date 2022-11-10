const { ObjectId } = require("mongodb");

const Bill = require("../models/Bill");

class BillController {
  // [GET] /bill/user/:idUser
  showList(req, res) {
    // console.log("Get Bill list for User: ", req.params);
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
    // console.log("Get Bill list for Farmer: ", req.params);
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
    // console.log("Get Bill list for Trader: ", req.params);
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
    // console.log("Get Bill list for Rice Season: ", req.params);
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
    // res.json(req.body);
    // const BilldData = Object.assign(req.body);
    // // console.log("Request Add Bill: ", BilldData);
    // let bill = new Bill({
    //   ...BilldData,
    //   suggestToBuyId: new ObjectId(BilldData.suggestToBuyId),
    // });
    // console.log("Bill: ", bill);

    const bill = new Bill(req.body);
    // bill.suggestToBuyId = new ObjectId(bill.suggestToBuyId);
    // console.log("Bill: ", bill);

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
    // res.json(req.body);
    Bill.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /bill/:id
  // delete(req, res) {
  //   // res.json(req.body);
  //   // console.log("Request Delete Bill: ", req.params);
  //   Bill.deleteOne({ _id: req.params.id })
  //     .then(() => {
  //       res.sendStatus(200).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }
}

module.exports = new BillController();
