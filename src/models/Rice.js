const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Rice = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    price: { type: Number },
    growingTime: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("Rice", Rice);
