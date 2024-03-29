const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SuggestToBuy = new Schema(
  {
    suggestedPrice: { type: Number, required: true },
    suggestedTimeEnd: { type: Date, required: true },
    description: { type: String },
    status: { type: String },

    // Field of season
    seasonId: { type: Schema.Types.ObjectId, ref: "RiceSeason" },
    seasonState: { type: String },
    seasonFarmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
    seasonFarmerName: { type: String },
    seasonFarmerNickname: { type: String },
    normalizedSeasonFarmerName: { type: String },
    normalizedSeasonFarmerNickname: { type: String },
    seasonRiceFieldName: { type: String },
    seasonRiceName: { type: String },
    seasonName: { type: String },
    seasonYear: { type: Number },
    seasonTimeEnd: { type: String },
    seasonTimeStart: { type: String },

    traderId: { type: Schema.Types.ObjectId, ref: "Trader" },
    traderName: { type: String },
    traderNickname: { type: String },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("SuggestToBuy", SuggestToBuy);
