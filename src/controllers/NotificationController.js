const { ObjectId } = require("mongodb");

const Notification = require("../models/Notification");

class NotificationController {
  // [GET] /notification/:id
  show(req, res) {
    Notification.findById(req.params.id)
      .then((notification) => {
        res.json(notification).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /notification/
  add(req, res) {
    // res.json(req.body);
    const notification = new Notification(req.body);
    notification.userId = new ObjectId(notification.idUser);
    // console.log("Notification: ", notification);

    notification
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /notification/:id
  // modify(req, res) {
  //   // res.json(req.body);
  //   Notification.updateOne({ _id: req.params.id }, req.body)
  //     .then(() => {
  //       res.sendStatus(200).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }

  // [DELETE] /notification/:id
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    Notification.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /notification/:idUser/list
  showList(req, res) {
    // console.log("Request: ", req.params);
    Notification.find({ idUser: req.params.idUser })
      .then((notifications) => {
        res.json(notifications).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new NotificationController();
