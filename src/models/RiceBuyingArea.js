const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiceBuyingArea = new Schema(
  {
    // _id: { type: String },
    name: { type: String, required: true },
    village: { type: String, required: true },
    commune: { type: String, required: true },
    town: { type: String, required: true },
    province: { type: String, required: true },
    description: { type: String },

    traderIds: [{ type: Schema.Types.ObjectId, ref: "Trader" }],
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RiceBuyingArea", RiceBuyingArea);
