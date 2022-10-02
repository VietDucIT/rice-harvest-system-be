const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiceSeason = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    rice: { type: String, required: true },
    currentState: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date },
    totalRice: { type: Date },
    suggestToBuys: [
      {
        traderId: { type: String, required: true },
        suggestedPrice: { type: Number, required: true },
        suggestedTimeEnd: { type: DataTransfer, required: true },
        description: { type: String },
      },
    ],

    riceFieldId: { type: String },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("RiceSeason", RiceSeason);
