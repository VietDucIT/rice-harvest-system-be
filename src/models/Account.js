const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema(
  {
    _id: { type: String },
    userName: { type: String, maxlength: 20, required: true },
    password: { type: String, maxlength: 20, required: true },
    // userInfo: [
    //   {
    //     name: { type: String, required: true },
    //     nickname: { type: String },
    //     gender: { type: Boolean, required: true },
    //     birthYear: { type: Number, required: true },
    //     address: { type: String, required: true },
    //     phone: { type: String, required: true },
    //     role: { type: Boolean, required: true },
    //   },
    // ],
  },
  {
    timestamps: true, // tu dong tao ra 2 field createdAt va updatedAt
  }
);

module.exports = mongoose.model("Account", Account);
