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

  // [POST] /user/
  add(req, res) {
    // res.json(req.body);
    const user = new User(req.body);
    user._id = new ObjectId().toString();
    // console.log("User: ", user);

    user
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /user/:id/modify
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

  // [POST] /user/:id/delete
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
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
    // console.log("Request: ", req.body);
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
