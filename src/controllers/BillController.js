const { ObjectId } = require("mongodb");

const Bill = require("../models/Bill");

class BillController {
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
    const bill = new Bill(req.body);
    // bill._id = new ObjectId().toString();
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
  //   // console.log("Request: ", req.params);
  //   Bill.deleteOne({ _id: req.params.id })
  //     .then(() => {
  //       res.sendStatus(200).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }

  // [GET] /bill/:idUser/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    Bill.find({ idUser: req.params.idUser })
      .then((bills) => {
        res.json(bills).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /bill//:idRiceSeason/list-for-rice-season
  // showListForRiceSeason(req, res) {
  //   // console.log("Request: ", req.params);
  //   Bill.find({ riceSeasonId: req.params.idRiceSeason })
  //     .then((bills) => {
  //       res.json(bills).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }
}

module.exports = new BillController();
