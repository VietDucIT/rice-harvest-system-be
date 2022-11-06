const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    // _id: { type: String },
    price: { type: Number, required: true },
    totalRice: { type: Number, required: true },

    suggestToBuyId: { type: Schema.Types.ObjectId, ref: "SuggestToBuy" },
    // idUser for get list ???
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Bill", Bill);
