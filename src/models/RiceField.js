const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiceField = new Schema(
  {
    _id: { type: String },
    address: { type: String, required: true },
    coords: [
      {
        points: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
      },
    ],
    description: { type: String },
    seasons: [
      {
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
      },
    ],

    farmerId: { type: String },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("RiceField", RiceField);
