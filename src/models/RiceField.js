const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const RiceSeason = require("./RiceSeason");

const RiceField = new Schema(
  {
    name: { type: String, required: true },
    normalizedName: { type: String },
    village: { type: String, required: true },
    commune: { type: String, required: true },
    town: { type: String, required: true },
    province: { type: String, required: true },
    x1: { type: Number, required: true },
    y1: { type: Number, required: true },
    x2: { type: Number, required: true },
    y2: { type: Number, required: true },
    x3: { type: Number, required: true },
    y3: { type: Number, required: true },
    x4: { type: Number, required: true },
    y4: { type: Number, required: true },
    description: { type: String },

    // Embedded Documents
    // riceSeasons: [RiceSeason],

    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RiceField", RiceField);
