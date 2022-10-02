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

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
