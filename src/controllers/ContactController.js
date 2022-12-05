const { ObjectId } = require("mongodb");

const Contact = require("../models/Contact");

const normalizeVietnamese = require("../services/normalizeVietnamese");

class ContactController {
  // [GET] /contact/user/:idUser
  showList(req, res) {
    // console.log("Get Contact List: ", req.params);
    Contact.find({ idUser: new ObjectId(req.params.idUser) }) // OR idFarmer OR idTrader
      .then((contacts) => {
        res.json(contacts).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /contact/check/:idUser
  checkIfContacted(req, res) {
    Contact.countDocuments(
      {
        userId: new ObjectId(req.params.idUser),
        userId2: new ObjectId(req.query.idUser2),
      },
      function (err, count) {
        if (err) {
          res.status(500).end();
          console.log(err);
        } else if (count == 0) {
          res.send(false).end();
        } else {
          res.send(true).end();
        }
      }
    );
  }

  // [GET] /contact/find/:idUser
  showListByName(req, res) {
    // console.log("Search Contacts: ", req.params);
    let searchedName = req.query.name;
    searchedName = searchedName.trim().replace(/\s+/g, " "); // remove abandoned whitespaces
    let normalizedSearchedName = normalizeVietnamese(searchedName);
    // console.log(searchedName, normalizedSearchedName);

    Contact.find({
      userId: new ObjectId(req.params.idUser),
      $or: [
        {
          userNormalizedName2: {
            $regex: new RegExp(normalizedSearchedName, "i"),
          },
        },
        {
          userNormalizedNickname2: {
            $regex: new RegExp(normalizedSearchedName, "i"),
          },
        },
      ],
      // normalizedName: { $regex: new RegExp(normalizedSearchedName, "i") },
    })
      .then((contacts) => {
        res.json(contacts).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /contact/:id
  show(req, res) {
    Contact.findById(req.params.id)
      .then((contact) => {
        res.json(contact).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [POST] /contact/
  add(req, res) {
    const contactData = Object.assign(req.body);
    // console.log("Request Add Contact: ", contactData);
    let contact = new Contact({
      userId: new ObjectId(contactData.userId),
      userId2: new ObjectId(contactData._id),
      userName2: contactData.name,
      userNickname2: contactData.nickname,
      userNormalizedName2: contactData.normalizedName,
      userNormalizedNickname2: contactData.normalizedNickname,
      // farmerId: new ObjectId(contactData.farmerId), // OR idFarmer
      // traderId: new ObjectId(contactData.traderId), // OR idTrader
    });
    // console.log("Contact: ", contact);

    contact
      .save()
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /contact/:id
  // modify(req, res) {
  //   // res.json(req.body);
  //   Contact.updateOne({ _id: req.params.id }, req.body)
  //     .then(() => {
  //       res.sendStatus(200).end();
  //     })
  //     .catch((err) => {
  //       res.status(500).end();
  //       console.log(err);
  //     });
  // }

  // [DELETE] /contact/:id
  delete(req, res) {
    // res.json(req.body);
    // console.log("Request Delete Contact: ", req.params);
    Contact.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }
}

module.exports = new ContactController();
