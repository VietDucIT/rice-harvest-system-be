const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RicePrice = new Schema(
  {
    rice: { type: String, required: true },
    price: { type: String },
    average: { type: Number },
    date: { type: String },
    // isDeleted: { type: Boolean },

    // riceId: { type: Schema.Types.ObjectId, ref: "Rice" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RicePrice", RicePrice);
