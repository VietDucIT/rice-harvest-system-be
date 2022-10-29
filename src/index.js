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

var whitelist = ["http://192.168.0.103"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
