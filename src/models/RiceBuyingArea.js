const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiceBuyingArea = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },

    traderId: { type: String },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("RiceBuyingArea", RiceBuyingArea);
