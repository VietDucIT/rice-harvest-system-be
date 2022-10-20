const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    // _id: { type: String },
    name: { type: String },
    nickname: { type: String },
    gender: { type: Number },
    birthYear: { type: Number },
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
