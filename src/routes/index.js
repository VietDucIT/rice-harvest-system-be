const billRouter = require("./bill");
const connectionRouter = require("./connection");
const farmerRouter = require("./farmer");
const notificationRouter = require("./notification");
const riceRouter = require("./rice");
const riceBuyingAreaRouter = require("./riceBuyingArea");
const riceFieldRouter = require("./riceField");
const ricePriceRouter = require("./ricePrice");
const riceSeasonRouter = require("./riceSeason");
const suggestToBuyRouter = require("./suggestToBuy");
const traderRouter = require("./trader");
const userRouter = require("./user");

function route(app) {
  app.use("/bill", billRouter);
  app.use("/connection", connectionRouter);
  app.use("/farmer", farmerRouter);
  app.use("/notification", notificationRouter);
  app.use("/rice", riceRouter);
  app.use("/rice-buying-area", riceBuyingAreaRouter);
  app.use("/rice-field", riceFieldRouter);
  app.use("/rice-price", ricePriceRouter);
  app.use("/rice-season", riceSeasonRouter);
  app.use("/suggest-to-buy", suggestToBuyRouter);
  app.use("/trader", traderRouter);
  app.use("/user", userRouter);
}

module.exports = route;
