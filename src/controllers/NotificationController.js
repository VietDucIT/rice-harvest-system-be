const { ObjectId } = require("mongodb");

const Notification = require("../models/Notification");

class NotificationController {
  // [GET] /notification/user/:idUser
  showList(req, res) {
    // console.log("Get Notification List: ", req.params);
    Notification.find({ userId: new ObjectId(req.params.idUser) })
      .then((notifications) => {
        res.json(notifications).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

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
    const notificationData = Object.assign(req.body);
    // console.log("Request Add Notification: ", notificationData);
    let notification = new Notification({
      ...notificationData,
      userId: new ObjectId(notificationData.idUser),
    });
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
  // just set status Read/Unread
  modify(req, res) {
    Notification.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /notification/:id
  delete(req, res) {
    // console.log("Request Delete Notification: ", req.params);
    Notification.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new NotificationController();
