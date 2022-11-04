var timeseries = require("timeseries-analysis");

const RicePrice = require("../models/RicePrice");
console.log("h2h2");
RicePrice.find()
  .then((rice) => {
    console.log(rice);
  })
  .catch((err) => {
    console.log(err);
  });
