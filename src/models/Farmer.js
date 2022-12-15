const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const RiceField = require("./RiceField");

const Farmer = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String },
    normalizedName: { type: String },
    normalizedNickname: { type: String },
    gender: { type: Number, required: true },
    birthYear: { type: Number, required: true },
    village: { type: String, required: true },
    commune: { type: String, required: true },
    town: { type: String, required: true },
    province: { type: String, required: true },
    role: { type: Number, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    // Referenced Documents
    // riceFields: [{ type: Schema.Types.ObjectId, ref: "RiceField" }],

    // Embedded Documents
    // riceFields: [RiceField],
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Farmer", Farmer);
