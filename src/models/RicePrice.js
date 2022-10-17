const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RicePrice = new Schema(
  {
    _id: { type: String },
    rice: { type: String, required: true },
    price: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("RicePrice", RicePrice);
