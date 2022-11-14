const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    content: { type: String },
    status: { type: String }, // Unread/Read

    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Notification", Notification);
