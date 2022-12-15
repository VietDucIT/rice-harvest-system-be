const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const SuggestToBuy = require("./SuggestToBuy");

const RiceSeason = new Schema(
  {
    seasonName: { type: String, required: true },
    seasonYear: { type: Number, required: true },
    currentState: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date },
    totalRice: { type: Number },
    description: { type: String },
    riceFieldName: { type: String },
    riceName: { type: String },

    // Embedded Documents
    // suggestToBuys: [SuggestToBuy],

    riceFieldId: { type: Schema.Types.ObjectId, ref: "RiceField" },
    riceId: { type: Schema.Types.ObjectId, ref: "Rice" },
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RiceSeason", RiceSeason);
