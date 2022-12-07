const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    phone: { type: String, required: true }, // userName
    password: { type: String, required: true },

    // Embedded Documents
    // riceFields: [{ type: Schema.Types.ObjectId, ref: "RiceField" }],

    // riceFields: [
    //   {
    //     village: { type: String, required: true },
    //     commune: { type: String, required: true },
    //     town: { type: String, required: true },
    //     province: { type: String, required: true },
    //     coords: [
    //       {
    //         points: {
    //           x: { type: Number, required: true },
    //           y: { type: Number, required: true },
    //         },
    //       },
    //     ],
    //     description: { type: String },
    //     seasons: [
    //       {
    //         name: { type: String, required: true },
    //         rice: { type: String, required: true },
    //         currentState: { type: String, required: true },
    //         timeStart: { type: Date, required: true },
    //         timeEnd: { type: Date },
    //         totalRice: { type: Date },
    //         suggestToBuys: [
    //           {
    //             traderId: { type: String, required: true },
    //             suggestedPrice: { type: Number, required: true },
    //             suggestedTimeEnd: { type: Date, required: true },
    //             description: { type: String },
    //             status: { type: String },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
  {
    timestamps: true, // create 2 fields "createdAt" and "updatedAt" automatically
  }
);

module.exports = mongoose.model("Farmer", Farmer);
