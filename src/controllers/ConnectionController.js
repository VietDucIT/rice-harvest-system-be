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
    connection.farmerId = new ObjectId(connection.idFarmer);
    connection.traderId = new ObjectId(connection.idTrader);
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

  // [PUT] /connection/:id
  // modify(req, res) {
  //   // res.json(req.body);
  //   Connection.updateOne({ _id: req.params.id }, req.body)
  //     .then(() => {
  //       res.sendStatus(200).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }

  // [DELETE] /connection/:id
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

  // [GET] /connection/:idUser/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    Connection.find({ idUser: req.params.idUser })
      .then((connections) => {
        res.json(connections).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new ConnectionController();
