const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    userId2: { type: Schema.Types.ObjectId, ref: "User" },
    userName2: { type: String },
    userNickname2: { type: String },
    userNormalizedName2: { type: String },
    userNormalizedNickname2: { type: String },

    status: { type: String },
    // farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
    // traderId: { type: Schema.Types.ObjectId, ref: "Trader" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Contact", Contact);
