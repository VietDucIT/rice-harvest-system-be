const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RicePrice = new Schema(
  {
    // _id: { type: String },
    price: { type: String, required: true },
    date: { type: Date, required: true },

    riceId: { type: Schema.Types.ObjectId, ref: "Rice" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RicePrice", RicePrice);
