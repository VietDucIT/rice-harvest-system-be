const { ObjectId } = require("mongodb");
const crypto = require("crypto");

const User = require("../models/User");

const normalizeVietnamese = require("../services/normalizeVietnamese");

class UserController {
  // [GET] /user/check-existed-phone
  checkPhone(req, res) {
    User.countDocuments({ phone: req.query.phone }, function (err, count) {
      if (err) {
        res.status(500).end();
        console.log(err);
      } else if (count == 0) {
        res.send(false).end();
      } else {
        res.send(true).end();
      }
    });
  }

  // [GET] /user/:id
  show(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        res.json(user).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /user/login
  logIn(req, res) {
    // console.log("Request from: ", req.ip);
    User.findOne({
      phone: req.body.phone,
      password: req.body.password,
    })
      .then((user) => {
        res.json(user).end();
      })
      .catch((err) => {
        res.sendStatus(500).end();
        console.log(err);
      });
  }

  // [POST] /user/
  add(req, res) {
    const user = new User(req.body);
    console.log("User BE: ", user);

    user.normalizedName = normalizeVietnamese(user.name);
    user.normalizedNickname = normalizeVietnamese(user.nickname);

    user
      .save()
      .then(() => {
        res.send(user._id).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /user/:id
  modify(req, res) {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [DELETE] /user/:id
  delete(req, res) {
    // console.log("Request Delete User: ", req.params);
    User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new UserController();
