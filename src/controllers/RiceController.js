const Rice = require("../models/Rice");

class RiceController {
  // [GET] /rice/list
  showList(req, res) {
    Rice.find({})
      .then((item) => {
        res.json(item).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice/update
  update(req, res) {
    const riceArray = [
      {
        name: "OM 18",
        growingTime: 97, // 95 - 100 days
      },
      {
        name: "OM 5451",
        growingTime: 92, // 88 - 95 days
      },
      {
        name: "IR 504",
        growingTime: 95, // 90 - 100 days
      },
      {
        name: "Đài thơm 8",
        growingTime: 102, // 100 - 105 days
      },
      {
        name: "Nàng hoa 9",
        growingTime: 110, // 105 - 120 days
      },
      {
        name: "Nếp An Giang",
        growingTime: 110,
      },
      {
        name: "Nếp Long An",
        growingTime: 92, // 90 - 95 days
      },
    ];

    for (let item of riceArray) {
      const rice = Rice(item);
      rice.save();
    }

    res.sendStatus(200).end();
  }
}

module.exports = new RiceController();
