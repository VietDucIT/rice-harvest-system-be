const { ObjectId } = require("mongodb");

const Connection = require("../models/Connection");

class ConnectionController {
  // [GET] /connection/user/:idUser
  showList(req, res) {
    // console.log("Get Connection List: ", req.params);
    Connection.find({ idUser: new ObjectId(req.params.idUser) }) // OR idFarmer OR idTrader
      .then((connections) => {
        res.json(connections).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /connection/find/:idUser
  showListByName(req, res) {
    // console.log("Search Connections: ", req.params);
    Connection.find({
      idUser: new ObjectId(req.params.idUser),
      farmerName: new RegExp(req.query.name),
    }) // OR idFarmer OR idTrader
      .then((connections) => {
        res.json(connections).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

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
    const connectionData = Object.assign(req.body);
    // console.log("Request Add Connection: ", connectionData);
    let connection = new Connection({
      ...connectionData,
      farmerId: new ObjectId(connectionData.farmerId), // OR idFarmer
      traderId: new ObjectId(connectionData.traderId), // OR idTrader
    });
    // const connection = new Connection(req.body);
    // connection.farmerId = new ObjectId(connection.idFarmer);
    // connection.traderId = new ObjectId(connection.idTrader);
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
    // console.log("Request Delete Connection: ", req.params);
    Connection.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new ConnectionController();
