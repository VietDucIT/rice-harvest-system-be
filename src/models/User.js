const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    nickname: { type: String },
    gender: { type: Boolean, required: true },
    birthYear: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: Boolean, required: true },
    // avatar: { type: String, required: true },
    // userName: { type: String, required: true },
    // password: { type: String, required: true },
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("User", User);
