const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productuid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    customeruid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
