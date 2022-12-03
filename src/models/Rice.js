const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Rice = new Schema(
  {
    name: { type: String, required: true },
    normalizedName: { type: String },
    growingTime: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Rice", Rice);
