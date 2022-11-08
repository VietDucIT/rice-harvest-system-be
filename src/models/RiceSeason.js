const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiceSeason = new Schema(
  {
    // _id: { type: String },
    seasonName: { type: String, required: true },
    seasonYear: { type: Number, required: true },
    currentState: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date },
    totalRice: { type: Number },
    description: { type: String },

    // suggestToBuys: [
    //   {
    //     traderId: { type: String, required: true },
    //     suggestedPrice: { type: Number, required: true },
    //     suggestedTimeEnd: { type: Date, required: true },
    //     description: { type: String },
    //     status: { type: String },
    //   },
    // ],

    riceFieldId: { type: Schema.Types.ObjectId, ref: "RiceField" },
    riceId: { type: Schema.Types.ObjectId, ref: "Rice" },

    // JUST A TEMPORARY SOLUTION, WILL REMOVE IF FINDING A BETTER ONE
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("RiceSeason", RiceSeason);
