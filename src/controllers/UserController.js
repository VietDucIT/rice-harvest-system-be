const { ObjectId } = require("mongodb");

const User = require("../models/User");

class UserController {
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

  // [GET] /user/checkUniquePhone
  checkPhone(req, res) {
    User.findOne({ phone: req.query.phone })
      .then((user) => {
        console.log(`This user has ${phone}: `, user);
        res.send(true).end();
      })
      .catch((err) => {
        res.send(false).end();
        console.log(err);
      });
  }

  // [POST] /user/
  add(req, res) {
    // res.json(req.body);
    const user = new User(req.body);
    console.log("User BE: ", user);

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
    // res.json(req.body);
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
    // res.json(req.body);
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
}

module.exports = new UserController();
