const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Rice = new Schema(
  {
    // _id: { type: String },
    name: { type: String, required: true },
    growingTime: { type: Number },
    description: { type: String },
    // price: { type: Number },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Rice", Rice);