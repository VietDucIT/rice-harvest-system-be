const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SuggestToBuy = new Schema(
  {
    _id: { type: String },
    suggestedPrice: { type: Number, required: true },
    suggestedTimeEnd: { type: DataTransfer, required: true },
    description: { type: String },
    traderId: { type: String },

    riceSeasonId: { type: String },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("SuggestToBuy", SuggestToBuy);
