const { ObjectId } = require("mongodb");

const Account = require("../models/Account");

class AccountController {
  // [GET] /account/:id
  show(req, res) {
    Account.findById(req.params.id)
      .then((account) => {
        res.json(account).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /account/
  add(req, res) {
    // res.json(req.body);
    const account = new Account(req.body);
    // account._id = new ObjectId().toString();
    // console.log("Account: ", account);

    account
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /account/:id/modify
  modify(req, res) {
    // res.json(req.body);
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /account/:id/delete
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request: ", req.params);
    Account.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /account/login
  logIn(req, res) {
    // console.log("Request: ", req.body);
    Account.findOne({
      accountName: req.body.accountName,
      password: req.body.password,
    })
      .then((account) => {
        res.json(account).end();
      })
      .catch((err) => {
        res.sendStatus(500).end();
        console.log(err);
      });
  }
}

module.exports = new AccountController();
