const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String },
    normalizedName: { type: String },
    normalizedNickname: { type: String },
    gender: { type: Number, required: true },
    birthYear: { type: String },
    village: { type: String, required: true },
    commune: { type: String, required: true },
    town: { type: String, required: true },
    province: { type: String, required: true },
    role: { type: Number, required: true },
    phone: { type: String, required: true }, // userName
    password: { type: String, required: true },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("User", User);
