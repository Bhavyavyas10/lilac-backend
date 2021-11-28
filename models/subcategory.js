const mongoose = require("mongoose");

const subcatSchema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mastercategories",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subcategories", subcatSchema);
