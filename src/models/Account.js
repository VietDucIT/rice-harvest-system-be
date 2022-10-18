const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema(
  {
    // _id: { type: String },
    phone: { type: String, required: true },
    password: { type: String, maxlength: 20, required: true },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Account", Account);
