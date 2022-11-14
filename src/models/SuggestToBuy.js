const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SuggestToBuy = new Schema(
  {
    suggestedPrice: { type: Number, required: true },
    suggestedTimeEnd: { type: Date, required: true },
    description: { type: String },
    status: { type: String },
    traderId: { type: String },

    riceSeasonId: { type: Schema.Types.ObjectId, ref: "RiceSeason" },
    traderId: { type: Schema.Types.ObjectId, ref: "Trader" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("SuggestToBuy", SuggestToBuy);
