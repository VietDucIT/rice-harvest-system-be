const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/RICE_HARVEST_SYSTEM");
    console.log("Connect Successfullly.");
  } catch (error) {
    console.log("Connect Failed.");
  }
}

module.exports = { connect };
