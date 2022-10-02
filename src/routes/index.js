const accountRouter = require("./account");
const farmerRouter = require("./farmer");
const riceBuyingAreaRouter = require("./riceBuyingArea");
const riceFieldRouter = require("./riceField");
const riceRouter = require("./rice");
const riceSeasonRouter = require("./riceSeason");
const suggestToBuyRouter = require("./suggestToBuy");
const userRouter = require("./user");

function route(app) {
  app.use("/account", accountRouter);
  app.use("/farmer", farmerRouter);
  app.use("/rice-buying-area", riceBuyingAreaRouter);
  app.use("/rice-field", riceFieldRouter);
  app.use("/rice", riceRouter);
  app.use("/rice-season", riceSeasonRouter);
  app.use("/suggest-to-buy", suggestToBuyRouter);
  app.use("/user", userRouter);
}

module.exports = route;
