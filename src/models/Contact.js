const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    status: { type: String },

    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
    traderId: { type: Schema.Types.ObjectId, ref: "Trader" },
    // id User ??
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Contact", Contact);
