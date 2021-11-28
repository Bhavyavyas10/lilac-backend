const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productuid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    customeruid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderstatus: {
      type: String,
      enum: ["placed", "dispatched", "received"],
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
