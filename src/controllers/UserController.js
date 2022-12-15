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
      // password: req.body.password,
    })
      .then((user) => {
        const hash = crypto
          .pbkdf2Sync(req.body.password, user.salt, 1000, 64, "sha512")
          .toString("hex");
        if (user.password === hash) {
          console.log("Login: ", user);
          res.json(user).end();
        } else {
          res.sendStatus(500).end();
        }
      })
      .catch((err) => {
        res.sendStatus(500).end();
        console.log(err);
      });
  }

  // [POST] /user/
  add(req, res) {
    const userData = Object.assign(req.body);
    const salt = crypto.randomBytes(16).toString("hex");

    let user = new User({
      ...userData,
      normalizedName: normalizeVietnamese(userData.name),
      normalizedNickname: normalizeVietnamese(userData.nickname),
      salt,
      password: crypto
        .pbkdf2Sync(userData.password, salt, 1000, 64, "sha512")
        .toString("hex"),
    });
    console.log("User: ", user);

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
    const userData = Object.assign(req.body);
    let user = {
      ...userData,
      password: crypto
        .pbkdf2Sync(userData.password, userData.salt, 1000, 64, "sha512")
        .toString("hex"),
    };

    User.updateOne({ _id: req.params.id }, user)
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
