const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String },
    normalizeName: { type: String },
    normalizeNickName: { type: String },
    gender: { type: Number },
    birthYear: { type: String },
    village: { type: String },
    commune: { type: String },
    town: { type: String },
    province: { type: String },
    role: { type: Number },
    phone: { type: String }, // userName
    password: { type: String },
    // avatar: { type: String, required: true },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("User", User);
