const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const route = require("./routes");
const db = require("./config/db");

// Connect DB
db.connect();

const app = express();
const port = 4000;

// log
app.use(morgan("combined"));

// middleware
app.use(express.urlencoded({ extended: true }));

// var whitelist = ["http://localhost:19006"];
var whitelist = [
  "http://192.168.0.107:19000",
  "http://localhost:19006",
  "http://localhost:3000",
];
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin);
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// var corsOptions = {
//   origin: "http://localhost:19006",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
