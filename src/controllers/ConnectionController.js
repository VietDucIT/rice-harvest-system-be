const { ObjectId } = require("mongodb");

const Connection = require("../models/Connection");

class ConnectionController {
  // [GET] /connection/:id
  show(req, res) {
    Connection.findById(req.params.id)
      .then((connection) => {
        res.json(connection).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /connection/
  add(req, res) {
    // res.json(req.body);
    const connection = new Connection(req.body);
    // connection._id = new ObjectId().toString();
    // console.log("Connection: ", connection);

    connection
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /connection/:id/modify
  modify(req, res) {
    // res.json(req.body);
    Connection.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /connection/:id/delete
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    Connection.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /connection/:idFarmer/list
  // showListByFarmer(req, res) {
  //   // console.log("Request: ", req.params);
  //   Connection.find({ idFarmer: req.params.idFarmer })
  //     .then((connections) => {
  //       res.json(connections).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }

  // [GET] /connection/:idTrader/list
  // showListByTrader(req, res) {
  //   // console.log("Request: ", req.params);
  //   Connection.find({ idTrader: req.params.idTrader })
  //     .then((connections) => {
  //       res.json(connections).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }
}

module.exports = new ConnectionController();
