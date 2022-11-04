const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PredictionRicePrice = new Schema(
  {
    // _id: { type: String },
    rice: { type: String, required: true },
    min: { type: Number },
    max: { type: Number },
    average: { type: Number },
    date: { type: String },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("PredictionRicePrice", PredictionRicePrice);
