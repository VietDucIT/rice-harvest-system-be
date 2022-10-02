const calculatorRouter = require("./calculator");
const farmerRouter = require("./farmer");
const mapRouter = require("./map");
const riceBuyingAreaRouter = require("./riceBuyingArea");
const riceFieldRouter = require("./riceField");
const riceRouter = require("./rice");
const riceSeasonRouter = require("./riceSeason");
const suggestToBuyRouter = require("./suggestToBuy");
const userRouter = require("./user");
const weatherRouter = require("./weather");

function route(app) {
  app.use("/calculator", calculatorRouter);
  app.use("/farmer", farmerRouter);
  app.use("/map", mapRouter);
  app.use("/riceBuyingArea", riceBuyingAreaRouter);
  app.use("/riceField", riceFieldRouter);
  app.use("/rice", riceRouter);
  app.use("/riceSeason", riceSeasonRouter);
  app.use("/suggestToBuy", suggestToBuyRouter);
  app.use("/user", userRouter);
  app.use("/weather", weatherRouter);
}

module.exports = route;
